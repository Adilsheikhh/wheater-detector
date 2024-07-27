const apikey = "586bd7363687c670b0fc83abd78b1d51";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        console.dir(data); // Inspect the entire data object

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Extract and log the weather condition
        const weatherCondition = data.weather[0].main;
        console.log("Weather condition:", weatherCondition);

        // Update the weather icon based on the weather condition
        let iconPath = "";
        switch (weatherCondition) {
            case "Clouds":
                iconPath = "images/clouds.png";
                break;
            case "Clear":
                iconPath = "images/clear.png";
                break;
            case "Rain":
                iconPath = "images/rain.png";
                break;
            case "Drizzle":
                iconPath = "images/drizzle.png";
                break;
            case "Mist":
                iconPath = "images/mist.png";
                break;
            default:
                iconPath = "images/default.png"; // Optional: provide a default icon
                break;
        }

        console.log("Setting icon to:", iconPath); // Debugging the icon path

        if (iconPath) {
            weatherIcon.src = iconPath;
        } else {
            console.error("Invalid icon path:", iconPath);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
