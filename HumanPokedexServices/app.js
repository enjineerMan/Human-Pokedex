const express = require('express');
const app = express();
const port = 3000;

const speechToText = require('./speech_to_text');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));
console.log("test")