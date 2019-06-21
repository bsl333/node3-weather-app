const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const fetchGeocode = require('./utils/geocode');
const fetchForecast = require('./utils/forecast');

const app = express();
app.use(require('cors')());
const PORT = process.env.PORT || 3003;

//config paths for static files, hbs, and partials
const publicPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const pathToPartials = path.join(__dirname, '..', 'templates', 'partials');

// setup path for static files
app.use(express.static(publicPath));



//setup handlbar config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(pathToPartials);

// routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Branden'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Branden'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Please click below for help',
    name: 'Branden'
  });
});


app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(404).send({
      error: 'Must provide address as query string'
    })
  }
  fetchGeocode(address, (err, { lat, long, placeName: location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    fetchForecast(lat, long, (err, { temperature, precipProbability, summary } = {}) => {
      if (err) {
        return res.send({ err });
      }
      res.json({
        location,
        summary,
        temperature,
        precipProbability,
      });
    });
  });
});


// error handling
app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMsg: 'This help article was not found!'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'page not found'
  });
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));