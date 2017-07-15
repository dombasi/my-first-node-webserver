const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');    // register partials folder
app.set('view engine', 'hbs');                          // set the view engine

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });

    next();
});

// site under constuction middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// register helper for current year 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// register helper to make text upper case
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

 // register middleware
app.use(express.static(__dirname + '/public'));        

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my Website"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request!'
    })
});

app.listen(1337, () => {
    console.log("Server is up and listen on port 1337");
});