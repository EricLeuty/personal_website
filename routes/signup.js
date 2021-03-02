const express = require('express');
const bodyParser = require('body-parser');
const signupRouter = express.Router();

const db = require('../db/login.js');

signupRouter.use(bodyParser.json());
signupRouter.use(bodyParser.urlencoded({extended: true}));

signupRouter.get('/', (req, res, next) => {
    res.sendFile('/home/eric/personal_website/html/signup.html');
});

signupRouter.post('/', (req, res, next) => {
    const userInfo = req.query;
    if(userInfo.password != userInfo.password2) {
        console.log('passwords do not match')
        res.sendFile('/home/eric/personal_website/html/signup.html')
    } else {
        db.any('INSERT INTO users (username, password) VALUES ($1, $2)', [userInfo.username, userInfo.password])
            .then(function(data) {
                console.log('created user ', userInfo.username, ' with password ', userInfo.password)
                res.clearCookie('username');
                res.clearCookie('password');
                res.cookie('username', userInfo.username);
                res.cookie('password', userInfo.password);
                res.sendFile('/home/eric/personal_website/html/home.html')
            })
            .catch(function(error) {
                console.log("username already exists")
                res.sendFile('/home/eric/personal_website/html/signup.html')
            })
    }
})

module.exports = signupRouter;