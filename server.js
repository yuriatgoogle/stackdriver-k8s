require('@google-cloud/trace-agent').start();

const express = require('express');
const got = require('got');

const app = express();
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

// This incoming HTTP request should be captured by Trace
app.get('/', (req, res) => {
  // This outgoing HTTP request should be captured by Trace
  got(DISCOVERY_URL, { json: true })
    .then((response) => {
      const names = response.body.items.map((item) => item.name);

      res
        .status(200)
        .send(names.join('\n'))
        .end();
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .end();
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});