const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT ||3000;
const geocode = require('./utils/geocode.js');
const forecast = require ('./utils/forecast.js');


//Define path for node config
const publicDirectorypath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//set up static dir to serve(public dir)
app.use(express.static(publicDirectorypath));


/*
app.get('/help',(req,res)=>{
    res.send("this is help page")
});

app.get('/about',(req,res)=>{
   res.send('<h1>this is the about page<\h1>')
});*/

app.get('/weather',(req,res)=>{
    if (!req.query.search){
       return res.send({
            error:"enter the search location"
        })
    }

        geocode(req.query.search,(err,{latitude,longitude,location}={})=>{
            if (err) {
                return res.send({
                    error :err
                })
            }
            forecast(latitude,longitude,(error,data)=>{
                if (error) {
                    return res.send({
                        error : error
                    })
                }
                res.send({
                   forecast: data,
                    location,
                    address:req.query.search
                });

                return data
            })
        })
});

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: "enter the search query"
        })
    }
    console.log(req.query.search )
   res.send({
       products:[]
   })
});

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
        name:'Dhruv Mittal'
    })
});

app.get('/about',(req,res)=>{
   res.render('about',{
       title:'about',
       name:'Dhruv Mittal'
   })
});

app.get('/help',(req,res)=>{
   res.render('help',{
       title:'help',
       name:'Dhruv Mittal',
       message:'this is the sample help message'
   })
});

app.get('/help/*',(req,res)=>{
   res.render('error',{
       title:'Error',
       name : "Dhruv Mittal",
       message:"help article not found"
   })
});

app.get('*',(req,res)=>{
    res.render('error',{
        title: "Error",
        message:'Page not found',
        name:'Dhruv Mittal'
    })
});

app.listen(port,()=>{
    console.log('Listening to port '+port)
});

