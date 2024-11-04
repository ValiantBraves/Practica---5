const affirmations = [
    "You are capable of amazing things.",
    "Believe in yourself and all that you are.",
    "Your only limit is your mind.",
    "Stay positive, work hard, make it happen.",
    "You are stronger than you think.",
    "Every day is a new beginning.",
    "The best is yet to come.",
    "You are enough just as you are.",
];

function getRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
}

document.getElementById("affirmation").textContent = getRandomAffirmation();

document.getElementById("new-affirmation").addEventListener("click", () => {
    document.getElementById("affirmation").textContent = getRandomAffirmation();
});
