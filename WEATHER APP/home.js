let input = document.getElementById("input");
let getWeatherBtn = document.getElementById("get-weather-btn");
let card = document.querySelector(".card");
let apiKey = "7c46d5101a0247a6bc382634252112";
// Fetch The API
getWeatherBtn.addEventListener("click",() => {
    let inputValue = input.value.toLowerCase().trim();
    if(inputValue == ""){
        card.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }
    fetchingData(inputValue);
});
 async function fetchingData(city){
    card.innerHTML = `<div class="loader"></div>`;
    input.value = "";
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
    const data = await response.json();
    if(data.error){
        card.innerHTML = "No Matching City Found!";
        return;
    } // Error Fetching Data
    console.log(data);
    let weatherImage = "";
    let temperature = data.current.temp_c;
    if(temperature > 30){
        weatherImage = "sunny.png"
    }
    else if(temperature < 30 && temperature > 20){
        weatherImage = "cloudy.png";
    }
    else if(temperature < 20 && temperature > 15){
        weatherImage = "rainy.png"
    }
    else{
        weatherImage = "snowy.png"
    }
    card.innerHTML = `
            <h1>Location : ${data.location.name}</h1> 
            <p>Humidity : ${data.current.humidity}%💧</p>
            <p>Temperature : ${data.current.temp_c}°C</p>
            <p>Wind Speed : ${data.current.wind_kph}</p>
            <img src = "${weatherImage}" alt = "Weather Image">
            `;
    card.style.color = "white";
}