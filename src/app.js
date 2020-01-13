const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// making some paths
const pubDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars, views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// which directory for static? you know
app.use(express.static(pubDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Homepage",
    name: "Joshua Hill"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Joshua Hill"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Joshua Hill",
    message: "Let's see if this is working as intended."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address required"
    });
  }

  geocode(req.query.address, (error, { lat, lng, cityName } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, lng, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        cityName,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search term needed"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404: Help Section",
    name: "Joshua Hill",
    message: "Couldn't find your help docs"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Joshua Hill",
    message: "ERROR...ERROR"
  });
});

app.listen(port, () => {
  console.log("server running on" + port);
});
