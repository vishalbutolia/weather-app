const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//Setting handlebar engine and view location
app.set('views', viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vishal Butolia'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
    helpText: 'Please enter a valid location to get the weather update',
    name: 'Vishal Butolia'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vishal Butolia'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Vishal Butolia',
    errMsg: 'Help article not found.'
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if(!address){
    return res.send({
      error: 'Location value is required'
    });
  }

  geocode(address, (err, {latitude, longitude, location} = {}) => {
    if(err){
      return res.send({
        error: err
      });
    }
    
    forecast(latitude, longitude, (err, forecast) => {
      if(err){
        return res.send({
          error: err
        })
      }

      return res.send({
        forecast,
        location
      })
    });
  })
});

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Vishal Butolia',
    errMsg: 'Page not found.'
  });
});

app.listen(port, () => console.log('Weather server is up on port '+ port));