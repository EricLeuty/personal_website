const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
   res.sendFile('/home/eric/personal_website/home.html')
});

app.get('/skills', (req, res) => {
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
 
const server = app.listen(8080, () => {
   console.log(`Express running -> PORT ${server.address().port}`);
});
