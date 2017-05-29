const express = require('express');
const hbs = require('hbs');
var app = express();
const http = require('http');

var Client = require('node-rest-client').Client;

var client = new Client();

const port = process.env.PORT || 3030;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    next();
});

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});




client.registerMethod("jsonMethod", "http://127.0.0.1:8000/api/list", "GET");

client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});




app.get('/home', (req, res) => {
    res.render('race.hbs', {
        pageTitle: 'Race Web App',
        types: 'ABC1'
    });
});

app.get('/players', (req, res) => {
    res.render('players.hbs', {
        pageTitle: 'Race Players'
    });
});

app.listen(port, () => {
    console.log(`The server is up at the port: ${port}`);
});