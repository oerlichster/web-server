const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths for Express config
const aPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port=process.env.PORT || 3000;
//setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(aPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Odiya Erlichster" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Odiya Erlichster" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Odiya Erlichster" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an adress" });
    return;
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
  // res.send({ forecast: 'It is raining',location:'New York',address:req.query.address });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
    return;
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article Not Found",
    name: "Odiya Erlichster",
  });
});
app.get("*", (req, res) => {
  res.render("404", { title: "404 Not Found", name: "Odiya Erlichster" });
});

app.listen(port, () => {
  console.log("server is running on port 3000");
});
