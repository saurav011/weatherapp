const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '9b7e483669ea47e121a69d9d3b2497f4';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

function getWeatherData(city) {
    let url = city ? 
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` :
        `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=${API_KEY}`;

    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showWeatherData(data);
    });
}

function showWeatherData(data) {
    if (data.cod !== 200) {
        alert("City not found");
        return;
    }

    const { name, sys, main, wind, weather } = data;

    timezone.innerHTML = name;
    countryEl.innerHTML = sys.country;
    
    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
            <div>Humidity</div>
            <div>${main.humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${main.pressure}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind.speed} m/s</div>
        </div>
        <div class="weather-item">
            <div>Weather</div>
            <div>${weather[0].description}</div>
        </div>`;

    currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${days[new Date().getDay()]}</div>
            <div class="temp">Current - ${main.temp}&#176;C</div>
        </div>`;

    
    weatherForecastEl.innerHTML = '';
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

getWeatherData();
