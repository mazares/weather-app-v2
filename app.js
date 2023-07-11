`use strict`;

console.log(`works`);

const url = `https://www.weatherapi.com`;

const apiKey1 = `8630ff89e58549dba2d82630230707`;

const apiKey2 = `4defc69e3ae54e89bbc141914231007`;

const apiKey3 = `2238cc77c0c648d79d0142038231007`;

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

const latitude = navigator.geolocation.getCurrentPosition(
    (position) => position.coords.latitude
);

const longitude = navigator.geolocation.getCurrentPosition(
    (position) => position.coords.longitude
);

const getWeather = async(lat, long) => {
    const data = await fetch(
        `${url}/v1/forecast.json?key=${apiKey1}&q=${lat},${long}&days=3`
    );

    const weather = await data.json();
    console.log(weather);
};

console.log(getWeather(latitude, longitude));