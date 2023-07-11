`use strict`;

const url = `https://www.weatherapi.com`;

const apiKey1 = `8630ff89e58549dba2d82630230707`;

const apiKey2 = `4defc69e3ae54e89bbc141914231007`;

const apiKey3 = `2238cc77c0c648d79d0142038231007`;

const apiKey4 = `baae20989ca545fa9e0122825231107`;

const elderWood = `https://api.weatherapi.com/v1/current.json?key=baae20989ca545fa9e0122825231107&q=Bucuresti&aqi=yes`;

const appEl = document.querySelector(`.app`);

const containerEl = document.querySelector(`.container`);

const introEl = document.querySelector(`.intro`);

const clockEl = document.querySelector(`.clock`);

const toggleTheme = document.querySelector(`.toggle-theme`);

const btnLogIn = document.querySelector(`.btn-login`);

const btnSignIn = document.querySelector(`.btn-signin`);

const logInForm = document.querySelector(`.login-form`);

const logInEl = document.querySelector(`.login`);

const signInEl = document.querySelector(`.signin`);

const currentLocation = document.querySelector(`.current-location`);

const tempC = document.querySelector(`.temp-c`);

toggleTheme.addEventListener(`click`, () => {
    appEl.classList.toggle(`dark`);
});

btnLogIn.addEventListener(`click`, () => {
    logInForm.classList.remove(`hidden`);

    logInEl.classList.toggle(`hidden`);
});

btnSignIn.addEventListener(`click`, () => {
    logInEl.classList.toggle(`hidden`);
});

clockDisplay = () => {
    const now = new Date();
    const hour = now.getHours();
    const hours = (hour % 12 || 12).toString().padStart(2, 0);

    const minutes = now.getMinutes().toString().padStart(2, 0);

    const seconds = now.getSeconds().toString().padStart(2, 0);

    const amPm = hour < 12 ? `am` : `pm`;

    let timeOfDay = ``;

    if (hour >= 1 && hour <= 10) {
        timeOfDay = `morning`;
    }

    if (hour >= 11 && hour <= 13) {
        timeOfDay = `day`;
    }

    if (hour >= 14 && hour <= 16) {
        timeOfDay = `afternoon`;
    }

    if (hour >= 17 && hour <= 22) {
        timeOfDay = `evening`;
    }

    if (hour >= 22 || hour === 0) {
        timeOfDay = `night`;
    }

    let day = ``;

    switch (now.getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;

        default:
            day = undefined;
    }

    let date = Number(now.getDate().toString().slice(-1));

    let sufix = ``;

    switch (date) {
        case 1:
            sufix = `'st`;
            break;

        case 2:
            sufix = `'nd`;
            break;

        case 3:
            sufix = `'rd`;
            break;

        default:
            sufix = `'th`;
            break;
    }

    const monthsStr = `January February March April May June July August September Octomber November December`;

    const months = monthsStr.split(` `);

    const month = months[now.getMonth()];

    const year = now.getFullYear();

    introEl.textContent = `Good ${timeOfDay}! It's ${day} the ${now.getDate()}${sufix} of ${month} ${year} `;

    clockEl.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
};
setInterval(() => {
    clockDisplay();
}, 1000);

const lat = navigator.geolocation.getCurrentPosition(
    (position) => position.coords.latitude
);

const long = navigator.geolocation.getCurrentPosition(
    (position) => position.coords.longitude
);

const getWeather = async(lat, long) => {
    const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=baae20989ca545fa9e0122825231107&q=Bucuresti&aqi=yes`
    );
    try {
        const response = await data.json();

        tempC.textContent = `${response.current.temp_c}°C`;

        console.log(response.location.name);
    } catch (error) {
        console.log(error);
        const reject = await data.reject();
    }
};

// "current": {
// "last_updated_epoch": 1689078600,
// "last_updated": "2023-07-11 15:30",
// "temp_c": 32.0,
// "temp_f": 89.6,
// "is_day": 1,
// "condition": {
//     "text": "Sunny",
//     "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
//     "code": 1000
// },
// "wind_mph": 2.2,
// "wind_kph": 3.6,
// "wind_degree": 282,
// "wind_dir": "WNW",
// "pressure_mb": 1014.0,
// "pressure_in": 29.94,
// "precip_mm": 0.0,
// "precip_in": 0.0,
// "humidity": 38,
// "cloud": 0,
// "feelslike_c": 30.8,
// "feelslike_f": 87.4,
// "vis_km": 10.0,
// "vis_miles": 6.0,
// "uv": 8.0,
// "gust_mph": 10.1,
// "gust_kph": 16.2,
// "air_quality": {
//     "co": 200.3000030517578,
//     "no2": 0.699999988079071,
//     "o3": 123.0,
//     "so2": 1.100000023841858,
//     "pm2_5": 11.5,
//     "pm10": 12.199999809265137,
//     "us-epa-index": 1,
//     "gb-defra-index": 1
// }
// }
// }