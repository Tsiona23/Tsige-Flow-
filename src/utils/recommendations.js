export function getSymptomRecommendations(symptoms) {
  const recommendations = [];

  if (!symptoms || symptoms.length === 0) {
    return ["Keep tracking your cycle to understand your body better."];
  }

  if (symptoms.includes("Cramps")) {
    recommendations.push("Try a warm compress and stay hydrated 💧");
  }

  if (symptoms.includes("Headache")) {
    recommendations.push("Rest and reduce screen time 🧠");
  }

  if (symptoms.includes("Fatigue")) {
    recommendations.push("Eat iron-rich foods and prioritize rest 😴");
  }

  if (symptoms.includes("Bloating")) {
    recommendations.push("Avoid salty foods and drink plenty of water 🥗");
  }
  if (symptoms.includes("Irritability")) {
    recommendations.push("Practice relaxation techniques like deep breathing or meditation 🧘‍♀️");
  }

  if (recommendations.length === 0) {
    recommendations.push("Take care of yourself today 💖");
  }

  return recommendations;
}