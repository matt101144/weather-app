const apiKey = "99feadb57e8d55cf23608fc968c9fd96";
const weatherForm = document.querySelector(".weatherForm");
const cityChoice = document.querySelector(".cityChoice");
const weatherCard = document.querySelector(".weatherCard");

weatherForm.addEventListener("submit", event => {

    event.preventDefaultMethod();

    const city = cityInput.value;


    if(city){

    }
    else{
        displayError("please enter a correct city");
    }


});

async function getWeatherInfo(city){

};

function displayEroor(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
};