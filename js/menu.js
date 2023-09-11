//import { add } from "./calculate.js"

document.querySelector("#open-nav-menu").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
});

document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });

//Greeting section
const condition = "Sunny";
const userLocation = "New Zw";
let temperature = 98.80000996;

//switch temperature value form fahrenheit to celcius and vise versa depending on selected
document.querySelector(".weather-group").addEventListener("click", function (e) {
    let temp = e.target.id;
    let weatherText = "";
    if (temp == "fahr") {
        weatherText = `The weather is ${condition} in ${userLocation} and it's ${celToFar(
            temperature
        ).toFixed(1)}°F outside`;
    } else {
        weatherText = `The weather is ${condition} in ${userLocation} and it's ${temperature.toFixed(
            1
        )}°C outside`;
    }
    updateElement(`#weather`, weatherText);
});

//updates clock every second
setInterval(function () {
    let date = new Date();

    hour = date.getHours();
    minute = date.getMinutes();
    seconds = date.getSeconds();

    document.querySelector("span[data-time=hours]").textContent = hour
        .toString()
        .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = minute
        .toString()
        .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = seconds
        .toString()
        .padStart(2, "0");

    console.log(hour);
    if (hour > 6 && hour < 12) {
        updateElement("#greeting", "Good Morning");
    } else if (hour >= 12 && hour < 18) {
        updateElement("#greeting", "Good Afternoon");
    } else if (hour >= 18 && hour < 24) {
        updateElement("#greeting", "Good Evening");
    } else {
        updateElement("#greeting", "Good Night");
    }
}, 1000);

//src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"
const images = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1",
    }, {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2",
    }, {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3",
    },
];

let mainImage = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");

mainImage.src = images[0].src;
mainImage.alt = images[0].alt;
// <img src="./assets/gallery/image1.jpg"
//alt="Thumbnail Image 1"
//data-array-index="0" data-selected="true">

images.forEach(function (img, index) {
    let thumb = document.createElement("img");
    thumb.src = img.src;
    thumb.alt = img.alt;
    thumb.dataset.arrayIndex = index;

    thumb.dataset.selected = index === 0 ? true : false;

    thumb.addEventListener('click', function (e) {
        mainImage.src = this.src;
        mainImage.alt = this.alt;
        thumbnails.querySelectorAll('img').forEach(function (thumb) {
            thumb.dataset.selected = false;
        });

        this.dataset.selected = true;
    });
    thumbnails.appendChild(thumb);
});


function updateElement(id, text) {
    document.querySelector(id).innerHTML = text;
}

function celToFar(cel) {
    return (cel * 9) / 5 + 32;
}

// function maxInArr (arr) {
//     return Math.max(...arr)
// }
// array = [1,9,10,50,2,0]
// console.log(maxInArr(array))
// function addUp (a, b) {
//     return a+b;
// }
// console.log(addUp(100, 9))
