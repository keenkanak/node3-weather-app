const geocode = require('./utils/geocode.js')
const weatherStack = require('./utils/weatherStack.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs');
const app = express()
const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs')

//Register the partials folder
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//app.com
//app.com/help
//app.com/about
//app.com/weather
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Kanak Dullu"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Kanak Dullu"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Kanak Dullu"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    
    console.log(req.query.address)
    const address = req.query.address
    
geocode(address, (error, {Latitude,Longitude,Location} = {}) => {
    if(error){
       return res.send(error)
    }

    weatherStack(Latitude,Longitude, (error, forecastData) => {
        if(error){
            return res.send(error)
        }
        res.send( {
            Latitude:Latitude,
            Longitude:Longitude,
            Location: Location, 
            Forecast:forecastData
        })
    })
    
})

    // res.send({
    //     Location:address,
    //     Temperature:32
    // })
}) 
//req holds the query string among other things
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
}) 
app.get('/help/*',(req,res) =>{
    res.render("404",{
        title:"404",
        name:'Kanak Dullu',
        errorMessage : "Help page not found"
    })
})    


app.get('*',(req,res) =>{
    res.render("404",{
        title:"404",
        name:'Kanak',
        errorMessage : "Page not found"
    })
})    


app.listen(port, () => {
    console.log("Server is up on port 3000")
})
