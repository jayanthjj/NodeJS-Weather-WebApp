const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});

var query;
var temp;
var lon;
var lat;
var desp;
var icon;
var country;
var today = new Date();
var date = today.getDate();
var month = today.getMonth();
var current = today.getDay();
var day = "";
if (current == 0) {
  day = "Sunday";
} else if (current == 1) {
  day = "Monday";
} else if (current == 2) {
  day = "Tuesday";
} else if (current == 3) {
  day = "Wednesday";
} else if (current == 4) {
  day = "Thursday";
} else if (current == 5) {
  day = "Friday";
} else if (current == 6) {
  day = "Saturday";
}
if (month == 1) {
  mon = "January";
} else if (month == 2) {
  mon = "February";
} else if (month == 3) {
  mon = "March";
} else if (month == 4) {
  mon = "April";
} else if (month == 5) {
  mon = "May";
} else if (month == 6) {
  mon = "June";
} else if (month == 7) {
  mon = "July";
} else if (month == 8) {
  mon = "August";
} else if (month == 9) {
  mon = "September";
} else if (month == 10) {
  mon = "October";
} else if (month == 11) {
  mon = "November";
} else if (month == 12) {
  mon = "December";
}

app.post("/", function (req, res) {
  query = req.body.cityName;
  const apiKey = "74cc8b24d148d0972b04c0c7cc5bb9fe";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === 200) {
        console.log(weatherData);
        temp = weatherData.main.temp;
        lon = weatherData.coord.lon;
        lat = weatherData.coord.lat;
        desp = weatherData.weather[0].main;
        icon = weatherData.weather[0].icon;
        country = weatherData.sys.country;
        console.log("Details");
        console.log(date);
        console.log(month);
        console.log(day);
        console.log(temp);
        console.log(lon);
        console.log(lat);
        console.log(desp);
        console.log(icon);
        console.log(country);

        res.render("weatherReport", {
          Query: query,
          day: day,
          temp: temp,
          condition: desp,
          cc: country,
          lon: lon,
          lat: lat,
          icon: icon,
          date: date,
          month: mon,
        });
      } else if (weatherData.cod == 404) {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});
app.post("/weatherReport.ejs", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3030, function () {
  console.log("Server up and running at port:3030");
});
