const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');

const db = require('./db/login.js');

const privateKey = fs.readFileSync('/home/eric/personal_website/key.pem');
const certificate = fs.readFileSync('/home/eric/personal_website/cert.pem');
const credentials = {key: privateKey, cert: certificate};

const app = express(express.static('public'));

const loginRouter = require('/home/eric/personal_website/routes/login.js');
const signupRouter = require('/home/eric/personal_website/routes/signup.js');
const skillsRouter = require('/home/eric/personal_website/routes/skills.js');
const workRouter = require('/home/eric/personal_website/routes/work.js');

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/skills', skillsRouter);
app.use('/work', workRouter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const cookies = req.cookies;

    db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [cookies.username, cookies.password])
        .then(function(data) {
            if(cookies.username == undefined) {
                console.log('user not found');
                res.status(200).sendFile('/home/eric/personal_website/html/login.html');
            } else {
                console.log('user logged in: ', cookies.username);
                res.status(200).sendFile('/home/eric/personal_website/html/home.html');
            }
        })
        .catch(function(error) {
            console.log(error);
            res.status(200).sendFile('/home/eric/personal_website/html/login.html')
        })
})

app.get('/index', (req, res) => {
    const cookies = req.cookies;

    db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [cookies.username, cookies.password])
        .then(function(data) {
            if(cookies.username == undefined) {
                console.log('user not found');
                res.status(200).sendFile('/home/eric/personal_website/html/login.html')
            } else {
                console.log('user logged in: ', cookies.username);
                res.status(200).sendFile('/home/eric/personal_website/html/home.html')
            }
        })
        .catch(function(error) {
            console.log(error);
            res.status(200).sendFile('/home/eric/personal_website/html/login.html')
        })
});

app.get('/name', (req, res) => {
    const cookies = req.cookies;
    res.status(200).send(cookies.username);
})

app.get('/style.css', (req, res) => {
	res.sendFile('/home/eric/personal_website/css/style.css')
});

app.get('/stella.png', (req, res) => {
    res.sendFile('/home/eric/personal_website/stella.png')
});

httpServer.listen(8080, function (req, res) {
    console.log(`HTTP running -> PORT ${httpServer.address().port}`);
});

httpsServer.listen(8081, function (req, res) {
   console.log(`HTTPS running -> PORT ${httpsServer.address().port}`);
});




