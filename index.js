const canvas = document.getElementById("animatedBackground");
const ctx = canvas.getContext("2d");
let particles = [];

// Canvas background setup
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * canvas.height;
        this.size = Math.random() * 10 + 2;
        this.speedY = Math.random() * 1 + 0.5;
        this.color = `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.3})`;
        this.glow = `rgba(138, 43, 226, 0.8)`;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < -this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.glow;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Bubble());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Weather App Script
const apiKey = "99feadb57e8d55cf23608fc968c9fd96";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const errorDisplay = document.querySelector(".errorDisplay");

const weatherEmojis = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "💨",
    Haze: "🌫️",
    Dust: "🌪️",
    Fog: "🌁",
    Sand: "🏜️",
    Ash: "🌋",
    Squall: "🌬️",
    Tornado: "🌪️",
};

async function getLocationDescription(city) {
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const response = await fetch(geoApiUrl);
    if (!response.ok) {
        throw new Error("City location not found");
    }
    const locationData = await response.json();
    if (!locationData.length) {
        throw new Error("City not found");
    }
    return locationData[0]; // Return the first matching location
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return response.json();
}

function displayWeatherInfo(weatherData, locationData) {
    const weatherMain = weatherData.weather[0].main;

    document.querySelector(".cityChoice").textContent = `${weatherData.name}`;
    document.querySelector(".locationDescription").textContent = `${locationData.state || ''}, ${locationData.country}`;
    document.querySelector(".tempDisplay").textContent = `${Math.round(weatherData.main.temp)}°C`;
    document.querySelector(".weatherDesc").textContent = weatherData.weather[0].description;
    document.querySelector(".humidityDisplay").textContent = `Humidity: ${weatherData.main.humidity}%`;

    const emoji = weatherEmojis[weatherMain] || "☀️";
    document.querySelector(".weatherEmoji").textContent = emoji;

    weatherCard.style.display = "flex";
    errorDisplay.style.display = "none";
}

function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
    weatherCard.style.display = "none";
}

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const locationData = await getLocationDescription(city);
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData, locationData);
        } catch (error) {
            console.error("Error caught:", error.message);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city.");
    }
});
