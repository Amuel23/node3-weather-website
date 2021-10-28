const path = require("path");
const express = require("express");
const hbs = require(`hbs`);
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
//Define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Set up handlebars engine and views location
app.set(`view engine`, "hbs");
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: `Weatheria`,
    name: `Tikmol pogi`,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: `Tikmol pogi`,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help. Me. Amuels.",
    name: `Tikmol pogi`,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      Error: "Agay latan anggapoy address",
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "U must provide search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.com
// app.com/help
// app.com/about
app.get("/help/*", (req, res) => {
  res.render("error", {
    body: `Help data not found`,
  });
});
app.get("/*", (req, res) => {
  res.render("error", {
    body: `Error 404: website not found`,
  });
});

app.listen(3000, () => {
  console.log(`Server is up on port 3000`);
});
