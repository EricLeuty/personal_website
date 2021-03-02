const express = require('express');
const skillsRouter = express.Router();

skillsRouter.get('/', (req, res, next) => {
    res.sendFile('/home/eric/personal_website/html/skills.html');
});

module.exports = skillsRouter;