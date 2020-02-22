const request = require('request');
const forecast = (latitude , longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/5efa8aad555a00e4d56749197de24e1a/"+ encodeURIComponent(latitude)+","+encodeURIComponent(longitude) +"?units=si";
    request({url , json:true},(error,{body})=>{
        if (error){
            callback("unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback("unable to find location",undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + "the temperature is " + body.currently.temperature +"C and is currently "+body.currently.summary)
        }
    })
};



module.exports = forecast;