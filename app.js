// The express package contains Express, and its own required dependencies. It needs to be
// installed using npm.
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: null
}));
app.set("view engine", "handlebars");

// Setup static routing. Any file located in the "public" folder
// will be able to be accessed by clients directly.
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Get the car data from car-data.js
// will import an array of 220 car objects
const carData = require("./car-data");

// When a GET request is made to "/" (i.e. the root path), render the
// "home" view. This can be found in /views/home.handlebars
app.get("/", function (req, res) {
    res.render("home");
});

//An example route handler function that demonstrates how car data can be sent to the web browser
//stat
app.get("/stat", function(req,res){
    res.render("stat")
});

//favlist
app.get("/favouritelist", function(req, res){
    res.render("favouritelist");
});

//id
app.get("/cars/id", function (req, res) {
    const id = req.query.id;
    const car = getCarsByID(id);
    res.locals.cars = car;
    res.render("searchresults");
});

//favlist carID
app.get("/cars/fav/carID", function (req, res) {
    const carID = req.query.carID;
    const car = getCarsByID(carID);
    res.json(car[0]);
});

//model
app.get("/cars/carmodel", function (req, res) {
    const carModel = req.query.carModel;
    const car = getCarsByModel(carModel);
    res.locals.cars = car;
    res.render("searchresults");
});

//carmake
app.get("/cars/carmake", function (req, res) {
    const carMake = req.query.carMake;
    const car = getCarsByCarMake(carMake);
    res.locals.cars = car;
    res.render("searchresults");
});

//carmodel
app.get("/cars/carmodel", function (req, res) {
    const carModel = req.query.carModel;
    const car = getCarsByCarModel(carModel);
    res.locals.cars = car;
    res.render("searchresults");
});

//caryear
app.get("/cars/caryear", function (req, res) {
    const lowerYear = req.query.lower;
    const upperYear = req.query.upper;
    const carsArray = getCarsByYears(lowerYear, upperYear);
    res.locals.cars = carsArray;
    res.render("searchresults");
});

//price
app.get("/cars/price", function (req, res) {
    const lowerPrice = req.query.lowerPrice;
    const higherPrice = req.query.higherPrice;
    const carsArray = getCarsByPrice(lowerPrice, higherPrice);
    res.locals.cars = carsArray;
    res.render("searchresults");
});

//country
app.get("/cars/country", function (req, res) {
    const country = req.query.country;
    const car = getCarsByCountry(country);
    res.locals.cars = car;
    res.render("searchresults");
});

//odometer
app.get("/cars/odometer", function (req, res) {
    const lowerOdometer = req.query.lowerOdometer;
    const higherOdometer = req.query.higherOdometer;
    const carsArray = getCarsByOdometer(lowerOdometer, higherOdometer);
    res.locals.cars = carsArray;
    res.render("searchresults");
});

app.get('/summary/year', async (req, res) => {
    const year = req.query.year;
    const filteredCars = carData.filter(car => car.carYear === parseInt(year));
    const count = filteredCars.length;
    const averagePrice = filteredCars.reduce((sum, car) => sum + car.price, 0) / count;
    res.json({ count: count, averagePrice: averagePrice.toFixed(2)});  
});

app.get('/summary/make', async (req, res) => {
    const make = req.query.make;
    const filteredCarsByMake = carData.filter(car => car.carMake.toLowerCase() === make.toLowerCase());
    const countByMake = filteredCarsByMake.length;
    const averagePriceByMake = filteredCarsByMake.reduce((sum, car) => sum + car.price, 0) / countByMake;
    res.json({ count: countByMake, averagePrice: averagePriceByMake.toFixed(2) });
})

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

function getCarsByID(id) {
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].id == id) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByModel(carModel){
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].carModel.toLowerCase() == carModel.toLowerCase()) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByYears(lowerYear, upperYear) {
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].carYear >= lowerYear && carData[i].carYear <= upperYear) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByPrice(lowerPrice, higherPrice) {
    let filterResults = [];

    for (let i = 0; i < carData.length; i++) {
        if (carData[i].price >= lowerPrice && carData[i].price <= higherPrice) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByOdometer(lowerOdometer, higherOdometer) {
    let filterResults = [];

    for (let i = 0; i < carData.length; i++) {
        if (carData[i].odometer >= lowerOdometer && carData[i].odometer <= higherOdometer) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByCarMake(carMake) {
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].carMake.toLowerCase() == carMake.toLowerCase()) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByCarModel(carModel) {
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].carModel.toLowerCase() == carModel.toLowerCase()) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}

function getCarsByCountry(country) {
    let filterResults = [];
    for (let i = 0; i < carData.length; i++) {
        if (carData[i].country.toLowerCase() == country.toLowerCase()) {
            filterResults.push(carData[i]);
        }
    }
    return filterResults;
}
