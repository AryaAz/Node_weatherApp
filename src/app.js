const express = require('express');
const path    = require('path')
const app     = express();
const hbs     = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const publicDirectory = path.join(__dirname, '../public');
const viewsPath       = path.join(__dirname, '../templates/views');
const partialPath     = path.join(__dirname, '../templates/partials');

// Setup handlebars and view engine setup
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// set up static directory to serve
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arya Azim'
    });
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About me',
        name: 'Ari Tehrani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        location: 'Tehran', 
        name: 'Arya T',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, place_name} = {}) => {
        if(error)
        {
            return res.send( {error} );
        }

        weather(latitude, longitude, (error, {temperature, precipProbability, summary, tomorSummary, timezone} = {}) => {
            if(error)
                return res.send( {error} );

            let result = {
                    place_name,
                    forecast: 'Today is ' + temperature + ' degrees out and ' +  precipProbability + '% chance of rain',
                    summary,
                    tomorSummary,
                    timezone,
                    error
                }
            
            res.send(result)
        })
    })

    

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Ari Tehrani'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404n ',
        errorMsg: 'Page not found',
        name: 'Ari Tehrani'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})