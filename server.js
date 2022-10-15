const express = require("express");
const app =  express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");





app.listen(3000, ()=>{
  console.log("Sj's Server Running!!!");
})


app.get("/" , (req, res)=>{
  res.sendFile(__dirname+"/index.html");

});


app.post("/", (request, response)=>{

  let userCity = request.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&appid=467c83a29ac15f0610413076729c9f29&units=metric";

  console.log(url);

  https.get(url , (res)=>{

    console.log(`Server Is Running On ${res.statusCode}`);
    
    res.on("data" ,function(data){
    const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const city = weatherData.name;
     const icon = weatherData.weather[0].icon;
     const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
     
     response.write(`<h1 style="margin-top:10rem; font-size:3rem"> <center> The Temprature of ${city} is ${temp} C.</center> </h1> `);
     response.write(" <center><img src= " + imgUrl + "> </center>")
     response.send();
    
  });

  
});  

});

