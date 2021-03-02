const express = require('express');
const workRouter = express.Router();

workRouter.get('/', (req, res, next) => {
    res.sendFile('/home/eric/personal_website/html/work.html');
});

module.exports = workRouter;