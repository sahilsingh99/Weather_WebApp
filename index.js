const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');


// app router
var app = express();

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// set view engine
app.set('view engine', 'ejs');

// 
app.use(express.static(path.join(__dirname , 'public')));


// home router
app.get('/', (req, res) => {
    var weather = {
        city: "None",
        temp: "0",
        desc: "hihi"
    }, errors = false;
    res.render('index', {weather, errors});
});

app.post('/',(req, res) => {
    var city = req.body.city;
    var weather = {};
    var errors;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
    request(url, (err, resp, body) => {
        errors = false;
        weather_json = JSON.parse(body);
        if(weather_json.cod === '404'){ errors = true;}
        else{
            //console.log("still");
            //console.log(weather_json);
            weather = {
                city: weather_json.name,
                temp: weather_json.main.temp,
                desc: weather_json.weather[0].description,
                icon: weather_json.weather[0].icon
            };}
        res.render('index', {weather, errors});
    });

})



// set listener
app.listen(process.env.PORT || 3000, (res,req) => {
    console.log("app is started");
})