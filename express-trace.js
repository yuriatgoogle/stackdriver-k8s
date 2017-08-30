require('@google-cloud/trace-agent').start();

//function for randomizing
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//for outbound HTTP
const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/',
    method: 'GET'
  };

const express = require('express');
const app = express();
const got = require('got');
const http = require('http');



// This incoming HTTP request should be captured by Trace
app.get('/', (req, res) => {
	var sleepInt = randomInt(1,10);
	var sleepVar = require ('sleep');
    sleepVar.sleep(sleepInt);
    
    //outbound HTTP request should be traced
    const myReq = http.request(options, (res) => {
        console.log("http requested" + res.url);
        console.log("STATUS: " + res.statusCode);
        });

        res.on('end', () => {
            console.log('http requested ' + res.url);
        });

        myReq.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
          });

    myReq.end();
    
    //TODO wrap outbound HTTP call
    got('google.com')
        .then(response => {
            console.log("got requested " + response.url);
        })
        .catch(error => {
            console.log("got failed with " + error.response.body);
        });
    
    //return response
	res
        .status(200)
        .send("I slept for " + sleepInt + " seconds before responding")
        .end();
    });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running at http://127.0.0.1:8080/");
  console.log('Press Ctrl+C to quit.');
});