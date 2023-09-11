//import { add } from "./calculate.js"

document.querySelector('#open-nav-menu').addEventListener('click', function () {
    document.querySelector('header nav .wrapper').classList.add('nav-open');
});

document.querySelector('#close-nav-menu').addEventListener('click', function () {
    document.querySelector('header nav .wrapper').classList.remove('nav-open');
});


//Greeting section
const greet = 'Good Afternoon';
const condition = 'Sunny';
const userLocation = 'New Zw';
let temperature = 98.80000996;

document.querySelector('.weather-group').addEventListener('click', function(e) {
    let temp = e.target.id;
    let weatherText = '';
    if (temp == 'fahr') {
        weatherText = `The weather is ${condition} in ${userLocation} and it's ${celToFar(temperature).toFixed(1)}°F outside`;
    } else {
        weatherText = `The weather is ${condition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside`;
    }
    updateElement(`#weather`, weatherText);
});



function updateElement(id, text) {
    document.querySelector(id).innerHTML = text
}

function celToFar (cel) {
    return ((cel * 9/5) + 32); 
}

updateElement('#greeting', greet)


// function maxInArr (arr) {
//     return Math.max(...arr)
// }
// array = [1,9,10,50,2,0]
// console.log(maxInArr(array))
// function addUp (a, b) {
//     return a+b;
// }
// console.log(addUp(100, 9))
