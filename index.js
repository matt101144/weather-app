const apiKey = "99feadb57e8d55cf23608fc968c9fd96";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const errorDisplay = document.querySelector(".errorDisplay");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error("Error caught:", error.message);
            displayError("City not found");  
        }
    } else {
        displayError("Please enter a city.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");  // Throw error if city isn't found
    }
    return response.json();
}

function displayWeatherInfo(data) {
    document.querySelector(".cityChoice").textContent = data.name;
    document.querySelector(".tempDisplay").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".weatherDesc").textContent = data.weather[0].description;
    document.querySelector(".humidityDisplay").textContent = `Humidity: ${data.main.humidity}%`;

    // Show weather card and hide error
    weatherCard.style.display = "flex";
    errorDisplay.style.display = "none";
}

function displayError(message) {
    console.log("Displaying error message:", message);  
    errorDisplay.textContent = message;  // Add error message to the element
    errorDisplay.style.display = "block";  

    // Hide the weather card if there's an error
    weatherCard.style.display = "none";
}