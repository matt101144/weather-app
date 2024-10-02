const apiKey = "99feadb57e8d55cf23608fc968c9fd96";
const weatherForm = document.querySelector(".weatherForm");
const cityChoice = document.querySelector(".cityChoice");
const weatherCard = document.querySelector(".weatherCard");

weatherForm.addEventListener("submit", async event => {

    event.preventDefaultMethod();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a correct city");
    }


});

async function getWeatherInfo(city){

};

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
};