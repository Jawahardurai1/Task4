const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '92d0e72833e52fd7b75b4761ba2666cd';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return; // Prevent empty searches

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // If city not found, show error message
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // Prevent duplicate search if it's the same city
            if (cityHide.textContent === city) return;
            cityHide.textContent = city;

            // Ensure container height is appropriate
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            // Weather elements
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Set Weather Image Based on Condition
            switch (json.weather[0].main) {
                case 'Clear': image.src = 'images/clear.png'; break;
                case 'Rain': image.src = 'images/rain.png'; break;
                case 'Snow': image.src = 'images/snow.png'; break;
                case 'Clouds': image.src = 'images/cloud.png'; break;
                case 'Mist': image.src = 'images/mist.png'; break;
                case 'Haze': image.src = 'images/mist.png'; break;
                default: image.src = 'images/cloud.png';
            }

            // Update Weather Details
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            // Clear previous cloned elements before adding new ones
            document.querySelectorAll('.active-clone').forEach(el => el.remove());

            // Clone elements to show animation effect
            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);
        })
        .catch(error => console.error("Error fetching weather data:", error));
});
