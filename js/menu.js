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
const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

const weatherAPIKEY = `d25ca801f64b6817457b076723ed2fc3`;
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });

}

function clockHandler() {
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


    }, 1000);
}

function galleryHandler() {
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
}

function updateElement(id, text) {
    document.querySelector(id).innerHTML = text;
}

function celToFar(cel) {
    return (cel * 9) / 5 + 32;
}

function populateProducts(prods) {
    let prodSection = document.querySelector('.products-area');
    prodSection.textContent = "";
    prods.forEach(function (product) {
        let prodElm = document.createElement("div");
        prodElm.classList.add("product-item");

        let image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;


        let prodDetails = document.createElement("div");
        prodDetails.classList.add("product-details");

        let prodTitle = document.createElement("h3");
        prodTitle.classList.add('product-title');
        prodTitle.textContent = product.title;

        let prodAuthor = document.createElement("p");
        prodAuthor.classList.add('product-author');
        prodAuthor.textContent = product.author;

        let prodPriceTitle = document.createElement("p");
        prodPriceTitle.classList.add('price-title');
        prodPriceTitle.textContent = "Price";

        let prodPrice = document.createElement("p");
        prodPrice.classList.add('product-price');
        prodPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";


        prodDetails.append(prodTitle);
        prodDetails.append(prodAuthor);
        prodDetails.append(prodPriceTitle);

        prodDetails.append(prodPrice);

        prodElm.append(image);
        prodElm.append(prodDetails);

        prodSection.append(prodElm);

    });

}

function productHandler() {

    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length;

    let freeProds = products.filter(prod => !prod.price || prod.price <= 0);
    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProds.length;

    let paidProds = products.filter(prod => prod.price > 0);
    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProds.length;


    populateProducts(products);

    let prodFilter = document.querySelector('.products-filter');
    prodFilter.addEventListener("click", function (e) {
        if (e.target.id === 'all') {
            populateProducts(products);
        } else if (e.target.id === 'paid') {
            populateProducts(paidProds);
        } else if (e.target.id === 'free') {
            populateProducts(freeProds);
        }
    });


}

function populateFooter() {
    year = new Date().getFullYear();
    document.querySelector('footer').textContent = `© Copyright ${year}`;
}

function greetingHandler() {
    //Greeting section

    let hour = new Date().getHours();

    if (hour < 12) {
        updateElement("#greeting", "Good Morning");
    } else if (hour < 18) {
        updateElement("#greeting", "Good Afternoon");
    } else if (hour < 24) {
        updateElement("#greeting", "Good Evening");
    } else {
        updateElement("#greeting", "Welcome");
    }
}


async function weatherHandler() {

    navigator.geolocation.getCurrentPosition((location) => {
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;

        //update URL with parameters and consts
        let url = weatherAPIURL
            .replace('{lat}', lat)
            .replace('{lon}', lon)
            .replace('{API key}', weatherAPIKEY);
        try {

        } catch (error) {

        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const country = data.name;
                const condition = data.weather[0].description;

                let celciusText = `The weather is ${condition} in ${country} and it's ${temp.toFixed(1)}°C outside`;
                let fahrenheitText = `The weather is ${condition} in ${country} and it's ${celToFar(temp).toFixed(1)}°F outside`;
                //switch temperature value form fahrenheit to celcius and vise versa depending on selected
                document.querySelector('p#weather').innerHTML = celciusText;
                document.querySelector(".weather-group").addEventListener("click", function (e) {
                    let temp = e.target.id;
                    if (temp == "fahr") {
                        updateElement('#weather', fahrenheitText);
                    } else {
                        updateElement('#weather', celciusText);
                    }
                });
            }).catch((error => {
                console.error('Weather API error: ', error);
                updateElement('p#weather', 'Unable to get weather information. Please try again later.');
            }));
        //below line gets executed first before promise complete
        //need to use await keyword inside async function
        //console.log('test')
    });

}

function processData(data) {

}
weatherHandler();
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler();
populateFooter();
