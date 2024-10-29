const apiKey = "99feadb57e8d55cf23608fc968c9fd96";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("City not found");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found"); 
    }
    return response.json();
}

function displayWeatherInfo(data) {
    document.querySelector(".cityChoice").textContent = data.name;
    document.querySelector(".tempDisplay").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".weatherDesc").textContent = data.weather[0].description;
    document.querySelector(".humidityDisplay").textContent = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".errorDisplay").textContent = ""; 
}

function displayError(message) {
    weatherCard.textContent = ""; 
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorDisplay);
}