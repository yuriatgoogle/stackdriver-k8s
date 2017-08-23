//Add Google Stackdriver Trace agent
var agent = require('@google-cloud/trace-agent').start();
// Load the http module to create an http server.
var http = require('http');
var got = require('got');

//const for Trace API
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

//function for randomizing
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, nodeResp) {
  var sleepInt = randomInt(1,10);
  var sleepVar = require ('sleep');
  sleepVar.sleep(sleepInt);
  
  //make call to Trace API
  got(DISCOVERY_URL, { json: true })
  	.then(response => {
  		console.log("got a response");
  		console.log("response was " + response);
  		//console.log(response.requestUrl);
  		nodeResp.writeHead(200, {"Content-Type": "text/plain"});
  		nodeResp.end("I slept for " + sleepInt + " seconds");
  		})
  	.catch(error => {
        console.log("an error happened");
        //=> 'Internal server error ...' 
    	});
	// end trace

});//end server

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");
