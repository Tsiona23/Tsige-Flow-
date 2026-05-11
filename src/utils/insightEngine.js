import { predictNextCycle } from "./smartCycle";
import { getSymptomRecommendations } from "./recommendations";

/**
 * Generates comprehensive insights and recommendations based on user's cycle history.
 * @param {Array<Object>} history - Array of cycle entries. Each entry: { startDate, endDate, mood, symptoms[] }
 * @returns {Object} - { cyclePhase, cycleHealthScore, insights, recommendations }
 */
export function generateInsights(history) {
  const insights = [];
  const recommendations = [];

  // --- 1. Basic Cycle Stats & Phase Detection ---
  const cyclePrediction = predictNextCycle(history);

  if (!cyclePrediction || history.length < 2) {
    return {
      cyclePhase: "Not enough data",
      cycleHealthScore: 50, // Default score for no data
      insights: ["Log at least 2-3 cycles to unlock personalized insights."],
      recommendations: ["Start tracking your cycle to understand your body better."]
    };
  }

  const {
    cycleLength,
    irregular,
    phase: currentCyclePhase,
    tip: phaseTip,
    confidence: predictionConfidence,
    lastStartDate
  } = cyclePrediction;

  // Add phase-based recommendation
  recommendations.push(phaseTip);

  // --- 2. Symptom Analysis & Mood Tracking ---
  const symptomFrequency = {};
  const symptomPhaseCorrelation = {}; // { symptom: { phase: count } }
  const moodByPhase = {}; // { phase: { mood: count } }

  history.forEach(entry => {
    const entryStartDate = new Date(entry.startDate);
    const daysSinceLastStart = Math.floor((entryStartDate - lastStartDate) / (1000 * 60 * 60 * 24));

    // Determine phase for this historical entry relative to the *last* cycle start
    // This is a simplified phase detection for historical entries for insight generation
    let historicalPhase = "Unknown";
    if (daysSinceLastStart >= 0 && daysSinceLastStart <= 5) historicalPhase = "Menstrual";
    else if (daysSinceLastStart >= 6 && daysSinceLastStart <= 13) historicalPhase = "Follicular";
    else if (daysSinceLastStart === 14) historicalPhase = "Ovulation";
    else if (daysSinceLastStart >= 15 && daysSinceLastStart <= (cycleLength || 28)) historicalPhase = "Luteal";

    // Track symptom frequency and phase correlation
    entry.symptoms?.forEach(s => {
      symptomFrequency[s] = (symptomFrequency[s] || 0) + 1;
      if (!symptomPhaseCorrelation[s]) symptomPhaseCorrelation[s] = {};
      symptomPhaseCorrelation[s][historicalPhase] = (symptomPhaseCorrelation[s][historicalPhase] || 0) + 1;
    });

    // Track mood by phase
    if (entry.mood) {
      if (!moodByPhase[historicalPhase]) moodByPhase[historicalPhase] = {};
      moodByPhase[historicalPhase][entry.mood] = (moodByPhase[historicalPhase][entry.mood] || 0) + 1;
    }
  });

  const totalEntries = history.length;
  const commonSymptoms = Object.entries(symptomFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([symptom]) => symptom);

  // Add recommendations for common symptoms
  if (commonSymptoms.length > 0) {
    recommendations.push(...getSymptomRecommendations(commonSymptoms));
  }

  // --- 3. Insights Generation ---
  if (irregular) {
    insights.push("Your cycle patterns show some irregularity. Consistency in tracking can help identify triggers.");
  } else {
    insights.push("Your cycle appears regular and predictable. Keep up the great tracking!");
  }

  if (commonSymptoms.length > 0) {
    commonSymptoms.forEach(symptom => {
      const phasesWithSymptom = Object.entries(symptomPhaseCorrelation[symptom] || {})
        .sort(([, a], [, b]) => b - a)
        .map(([phase]) => phase);
      if (phasesWithSymptom.length > 0) {
        insights.push(`You tend to experience ${symptom.toLowerCase()} most often during your ${phasesWithSymptom[0]} phase.`);
      }
    });
  }

  // Mood trend insights
  Object.entries(moodByPhase).forEach(([phase, moods]) => {
    const mostCommonMood = Object.entries(moods).sort(([, a], [, b]) => b - a)[0]?.[0];
    if (mostCommonMood && mostCommonMood !== "Calm" && mostCommonMood !== "Happy") {
      insights.push(`You tend to feel ${mostCommonMood.toLowerCase()} during your ${phase} phase.`);
    }
  });

  // Check for PMS pattern (e.g., irritability/bloating/fatigue in Luteal)
  const lutealSymptomsCount = history.filter(entry => {
    const entryStartDate = new Date(entry.startDate);
    const daysIntoCycle = Math.floor((entryStartDate - lastStartDate) / (1000 * 60 * 60 * 24));
    return daysIntoCycle >= 15 && daysIntoCycle <= (cycleLength || 28) && entry.symptoms?.some(s => ["Irritability", "Bloating", "Fatigue"].includes(s));
  }).length;

  if (lutealSymptomsCount > totalEntries * 0.3 && totalEntries > 2) { // If more than 30% of luteal phases have these symptoms
    insights.push("Your patterns suggest a possible premenstrual syndrome (PMS) trend. Focus on self-care during your Luteal phase.");
  }

  // --- 4. Cycle Health Score Calculation ---
  // Base score on prediction confidence (regularity)
  let cycleHealthScore = predictionConfidence;

  // Penalize for symptom frequency
  const totalSymptomsLogged = Object.values(symptomFrequency).reduce((sum, count) => sum + count, 0);
  const symptomPenalty = (totalSymptomsLogged / (totalEntries * 3)) * 20; // Max 3 symptoms per entry, scale penalty
  cycleHealthScore = Math.max(0, cycleHealthScore - symptomPenalty);

  // Penalize for mood instability (simple heuristic: more varied moods = less stable)
  let moodVariability = 0;
  Object.values(moodByPhase).forEach(moods => {
    if (Object.keys(moods).length > 1) { // If more than one mood logged for a phase
      moodVariability += 5;
    }
  });
  cycleHealthScore = Math.max(0, cycleHealthScore - moodVariability);

  // Reward for data completeness
  const dataCompletenessBonus = Math.min(20, totalEntries * 2); // Max 20 bonus for 10+ entries
  cycleHealthScore = Math.min(100, cycleHealthScore + dataCompletenessBonus);

  // Ensure score is within 0-100
  cycleHealthScore = Math.round(Math.max(0, Math.min(100, cycleHealthScore)));

  return {
    cyclePhase: currentCyclePhase,
    cycleHealthScore,
    insights,
    recommendations
  };
}