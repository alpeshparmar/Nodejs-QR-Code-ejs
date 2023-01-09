const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");app.set("view engine", "ejs");
var fs = require('fs'),
http = require('http'),
https = require('https');
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
const port = 5000;


var Stream = require('stream').Transform;


var downloadImageFromURL = (url, filename, callback) => {
  
    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }
  
    client.request(url, function(response) {                                        
      var data = new Stream();                                                    
      response.on('data', function(chunk) {                                       
         console.log(data.push(chunk));                                                         
      });                                                                         
  
      response.on('end', function() {                                             
         console.log(fs.writeFileSync(filename, data.read()));                               
      });                                                                         
   }).end();
};
  
downloadImageFromURL('https:://example/url', 'example.png');

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;
    console.log(url);

   
    if (url.length === 0) res.send("Empty Data!");
    
   
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
      
       
        res.render("scan", { src });
    });
});

app.listen(port, () => console.log("Server at 5000"));
