const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
    res.sendFile('/home/eric/personal_website/html/home.html');
})

module.exports = indexRouter;