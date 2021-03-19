const express = require('express')
const app = new express()
const request = require('request')

//Middlewares
app.set("view engine", "ejs")

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/result', (req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=719aaefd&s=${req.query.movieName}`
    request(url, (error, response, body) => {

        if(!error && response.statusCode === 200) {
            const data = JSON.parse(body)
            res.render('result', {moviesDump: data})
        }
        else {
            res.send('Something went wrong')
        }

    })
})

app.get('/result/:id', (req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=719aaefd&i=${req.params.id}`
    request(url, (error, response, body) => {

        if(!error && response.statusCode === 200) {
            const data = JSON.parse(body)
            res.render('detail', {movieDetail: data})
            
        }
        else {
            res.send('Something went wrong')
        }

    })
})

app.get('/about', (req,res)=>{
    res.render('about')
})

app.get('*', (req,res)=>{
    res.send('404 : Request not found')
})

app.listen(8000, ()=>{
    console.log("Server has started")
})

