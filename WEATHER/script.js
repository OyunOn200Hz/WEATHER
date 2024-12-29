const translations = {
    "clear sky": {
        "fr": "ciel dégagé",
        "en": "clear sky",
        "es": "cielo despejado",
        "de": "klarer Himmel",
        "ru": "ясное небо",
        "zh": "晴朗的天空",
        "pt": "céu limpo",
        "ar": "سماء صافية"
    },
    "few clouds": {
        "fr": "quelques nuages",
        "en": "few clouds",
        "es": "pocas nubes",
        "de": "wenige Wolken",
        "ru": "мало облаков",
        "zh": "少云",
        "pt": "poucas nuvens",
        "ar": "غيوم قليلة"
    },
    "scattered clouds": {
        "fr": "nuages épars",
        "en": "scattered clouds",
        "es": "nubes dispersas",
        "de": "vereinzelte Wolken",
        "ru": "рассеянные облака",
        "zh": "零散的云",
        "pt": "nuvens dispersas",
        "ar": "غيوم متناثرة"
    },
    "broken clouds": {
        "fr": "nuages brisés",
        "en": "broken clouds",
        "es": "nubes rotas",
        "de": "aufgelockerte Bewölkung",
        "ru": "разорванные облака",
        "zh": "破碎的云",
        "pt": "nuvens quebradas",
        "ar": "غيوم مكسورة"
    },
    "shower rain": {
        "fr": "pluie d'averse",
        "en": "shower rain",
        "es": "lluvia de ducha",
        "de": "Regenschauer",
        "ru": "ливень",
        "zh": "阵雨",
        "pt": "chuva de banho",
        "ar": "زخات المطر"
    },
    "rain": {
        "fr": "pluie",
        "en": "rain",
        "es": "lluvia",
        "de": "Regen",
        "ru": "дождь",
        "zh": "雨",
        "pt": "chuva",
        "ar": "مطر"
    },
    "thunderstorm": {
        "fr": "orage",
        "en": "thunderstorm",
        "es": "tormenta",
        "de": "Gewitter",
        "ru": "гроза",
        "zh": "雷暴",
        "pt": "trovoada",
        "ar": "عاصفة رعدية"
    },
    "snow": {
        "fr": "neige",
        "en": "snow",
        "es": "nieve",
        "de": "Schnee",
        "ru": "снег",
        "zh": "雪",
        "pt": "neve",
        "ar": "ثلج"
    },
    "mist": {
        "fr": "brume",
        "en": "mist",
        "es": "niebla",
        "de": "Nebel",
        "ru": "туман",
        "zh": "雾",
        "pt": "névoa",
        "ar": "ضباب"
    },
    "search": {
        "fr": "Rechercher",
        "en": "Search",
        "es": "Buscar",
        "de": "Suchen",
        "ru": "Поиск",
        "zh": "搜索",
        "pt": "Pesquisar",
        "ar": "بحث"
    },
    "enter city name": {
        "fr": "Entrez le nom de la ville",
        "en": "Enter city name",
        "es": "Ingrese el nombre de la ciudad",
        "de": "Stadtnamen eingeben",
        "ru": "Введите название города",
        "zh": "输入城市名称",
        "pt": "Digite o nome da cidade",
        "ar": "أدخل اسم المدينة"
    },
    "humidity": {
        "fr": " d'humidité",
        "en": " humidity",
        "es": " humedad",
        "de": " Luftfeuchtigkeit",
        "ru": " влажность",
        "zh": " 湿度",
        "pt": " umidade",
        "ar": " رطوبة"
    }
};

let currentWeatherData = null;

function updateWeatherDisplay(data) {
    const language = document.getElementById("language-select").value;
    const countryCode = data.sys.country.toLowerCase();
    const countryCodeToEmoji = {
        "fr": "\uD83C\uDDEB\uD83C\uDDF7", // 🇫🇷
        "us": "\uD83C\uDDFA\uD83C\uDDF8", // 🇺🇸
        "gb": "\uD83C\uDDEC\uD83C\uDDE7", // 🇬🇧
        "de": "\uD83C\uDDE9\uD83C\uDDEA", // 🇩🇪
        "it": "\uD83C\uDDEE\uD83C\uDDF9", // 🇮🇹
        "es": "\uD83C\uDDEA\uD83C\uDDF8", // 🇪🇸
        "pt": "\uD83C\uDDF5\uD83C\uDDF9", // 🇵🇹
    };
    const countryEmoji = countryCodeToEmoji[countryCode] || "";
    document.getElementById("villeaffiche").innerText = data.name + " " + countryEmoji;
    document.getElementById("img-meteo").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";
    const weatherDescription = data.weather[0].description;
    document.getElementById("meteo").innerText = translations[weatherDescription][language] || weatherDescription;
    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    const temperatureFahrenheit = Math.round((data.main.temp - 273.15) * 9/5 + 32);
    const temperature = language === "en" ? `${temperatureCelsius}°C / ${temperatureFahrenheit}°F` : `${temperatureCelsius}°C`;
    document.getElementById("temperature").innerText = "🌡️" + temperature;
    document.getElementById("humidity").innerText = "💧" + data.main.humidity + "%" + translations["humidity"][language];
    document.getElementById("wind").innerText = "💨" + data.wind.speed + " m/s";
    document.getElementById("city-input").placeholder = translations["enter city name"][language];
    document.getElementById("search-button").innerText = translations["search"][language];
}

function fetchWeather(city) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=978560401196292313f12f7a48f2af5e`,
        method: "get",
        success: function(data) {
            currentWeatherData = data;
            updateWeatherDisplay(data);
        }
    });
}

document.getElementById("search-button").addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    fetchWeather(city);
});

document.getElementById("language-select").addEventListener("change", function() {
    if (currentWeatherData) {
        updateWeatherDisplay(currentWeatherData);
    }
});

document.querySelectorAll(".predefined-city").forEach(button => {
    button.addEventListener("click", function() {
        const city = this.innerText;
        fetchWeather(city);
        document.getElementById("phrase").style.display = "none";
    });
});

// Fetch weather for default city (Paris) on page load