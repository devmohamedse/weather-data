async function search(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
        if (response.ok && response.status !== 400) {
            let weatherData = await response.json();
            displayCurrent(weatherData.location, weatherData.current);
            displayForecast(weatherData.forecast.forecastday);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

document.getElementById("search").addEventListener("keyup", (event) => {
    search(event.target.value);
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current) {
        const lastUpdated = new Date(current.last_updated.replace(" ", "T"));
        const todayForecast = `
            <div class="today forecast">
                <div class="forecast-header" id="today">
                    <div class="day">${days[lastUpdated.getDay()]}</div>
                    <div class="date">${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}</div>
                </div> 
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="images/icon-umbrella.png" alt="">20%</span>
                    <span><img src="images/icon-wind.png" alt="">18 km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                </div>
            </div>`;
        document.getElementById("forecast").innerHTML = todayForecast;
    }
}

function displayForecast(forecastDays) {
    let forecastHtml = "";
    for (let i = 1; i < forecastDays.length; i++) {
        const forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        forecastHtml += `
            <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${days[forecastDate.getDay()]}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${forecastDays[i].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${forecastDays[i].day.condition.text}</div>
                </div>
            </div>`;
    }
    document.getElementById("forecast").innerHTML += forecastHtml;
}


search("Cairo");
