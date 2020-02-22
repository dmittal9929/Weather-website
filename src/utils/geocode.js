const request = require('request');
const geocode = (address,callback)=>{
        const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGhydXYyOSIsImEiOiJjazV5MzhueXcyY3ZuM2puNXh1c25rMzlwIn0.i-lDYRM8r5lfqs7iWP2q5A"
        request({url:geourl , json:true},(error,{body}={})=>{
            if(error) {
                callback("unable to connect to location service",undefined);
            }
            else if (body.features.length==0){
                callback("unable to find the location",undefined);
            }
            else{
                callback(undefined,{
                    latitude : body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location : body.features[0].place_name
                });
            }

        })
};




module.exports = geocode;