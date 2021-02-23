const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
   res.sendFile('/Users/ericleuty/WebstormProjects/personal_website/home.html')
});

app.get('/skills', (req, res) => {
   res.sendFile('/Users/ericleuty/WebstormProjects/personal_website/skills.html')
});

app.get('/work', (req, res) => {
   res.sendFile('/Users/ericleuty/WebstormProjects/personal_website/work.html')
});

const server = app.listen(8080, () => {
   console.log(`Express running -> PORT ${server.address().port}`);
});
