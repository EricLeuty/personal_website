const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const privateKey = fs.readFileSync('/home/eric/personal_website/key.pem');
const certificate = fs.readFileSync('/home/eric/personal_website/cert.pem');
const credentials = {key: privateKey, cert: certificate};

const app = express();

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

app.get('/', (req, res) => {
    console.log(`It worked`)
   res.sendFile('/home/eric/personal_website/home.html')
});

app.get('/skills', (req, res) => {
    console.log(`He got punked`)
   res.sendFile('/home/eric/personal_website/skills.html')
});

app.get('/work', (req, res) => {
   res.sendFile('/home/eric/personal_website/work.html')
});

app.get('/style.css', (req, res) => {
	res.sendFile('/home/eric/personal_website/style.css')
});

app.get('/stella.png', (req, res) => {
    res.sendFile('/home/eric/personal_website/stella.png')
});

app.get('/flowers.jpeg', (req, res) => {
    res.sendFile('/home/eric/personal_website/flowers.jpeg')
});

httpsServer.listen(8080, function (req, res) {
   console.log(`HTTPS running -> PORT ${httpsServer.address().port}`);
});

httpServer.listen(8081, function (req, res) {
    console.log(`HTTP running -> PORT ${httpServer.address().port}`);
});
