// Funkce pro získání počasí pomocí async/await
async function getWeather(city) {
    const apiKey = 'd635c13d478e0ce0473eb4b78f5ab35e';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=cz`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Nepodařilo se získat data o počasí.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Nastala chyba při získávání dat.');
    }
}

// Funkce pro zobrazení počasí
function displayWeather(data) {
    const weatherResults = document.getElementById('weather-results');
    weatherResults.innerHTML = `
        <div class="weather-info">
            <p>Teplota: ${data.main.temp}°C</p>
            <p>Popis: ${data.weather[0].description}</p>
            <p>Rychlost větru: ${data.wind.speed} m/s</p>
        </div>
    `;
}

// Funkce pro zobrazení chybové zprávy
function displayError(error) {
    const weatherResults = document.getElementById('weather-results');
    weatherResults.innerText = error;
}

// Event listener na tlačítko
document.getElementById('search-btn').addEventListener('click', async function() {
    const city = document.getElementById('city').value;
    if (city) {
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            displayError(error.message);
        }
    } else {
        displayError('Zadejte název města.');
    }
});
