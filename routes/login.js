const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();

const db = require('../db/login.js');

loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({extended: true}));

loginRouter.get('/', (req, res, next) => {
    res.sendFile('/home/eric/personal_website/html/login.html');
});

loginRouter.post('/', (req, res, next) => {
    var userInfo = req.body;
    console.log(userInfo.username);
    db.any('SELECT * FROM users WHERE username = $1', [userInfo.username])
        .then(function(data) {

            if(userInfo.username == data[0].username && userInfo.password == data[0].password){
                console.log('username and password match');
                res.clearCookie('username');
                res.clearCookie('password');
                res.cookie('username', userInfo.username);
                res.cookie('password', userInfo.password);
                res.sendFile('/home/eric/personal_website/html/home.html');
            } else {
                console.log('incorrect password')
                res.sendFile('/home/eric/personal_website/html/login.html')
            }
        })
        .catch(function(error) {
            console.log('username not found')
            res.sendFile('/home/eric/personal_website/html/login.html')
        })

})

module.exports = loginRouter;