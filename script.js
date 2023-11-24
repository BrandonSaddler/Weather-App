const apiKey = 'b87df420933c0ff76246e8cdcedcb822';

function getWeather() {
    const cityInput = document.getElementById('cityInput').value;

    if (cityInput) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayError();
            });
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
    const weatherDescription = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    
    const timeZoneOffset = data.timezone;
    const localTime = new Date(Date.now() + timeZoneOffset * 1000);
    const formattedTime = `${('0' + localTime.getHours()).slice(-2)}:${('0' + localTime.getMinutes()).slice(-2)}`;

    const html = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Local Time: ${formattedTime}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;

    weatherInfo.innerHTML = html;
}

function displayError() {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
}
