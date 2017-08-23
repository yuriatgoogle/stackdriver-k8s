//Add Google Stackdriver Trace agent
var agent = require('@google-cloud/trace-agent').start();
// Load the http module to create an http server.
var http = require('http');
//var sleepVar = require ('sleep');

//function for randomizing
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  //console.log("Random number is " + randomInt(1,5));
  var sleepInt = randomInt(1,10);
  var sleepVar = require ('sleep');
  sleepVar.sleep(sleepInt);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("I slept for " + sleepInt + " seconds");
  //response.end("no sleep");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");
