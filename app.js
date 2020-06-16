/******************************************
Treehouse Techdegree:
FSJS project 6 - Static Node.js and Express Site
--aiming for exceeds expectations--
******************************************/

const express = require('express');
const app = express();

const data = require('./data.json');

// Sets pug as the view engine.
app.set('view engine', 'pug');

// Serves the static files located in the public folder.
app.use('/static', express.static('public'));

// Index route renders the home page with the locals set to data.projects.
app.get('/', (req, res) => {
    const projects = data.projects;
    res.render('index', {projects});
});

// About route renders the about page.
app.get('/about', (req, res) => {
    res.render('about');
});

// Project route (based on the id of the project) renders a customized project pug template to show off the selected project.
app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const thisProjData = data.projects[id];
    res.render('project', {thisProjData});
});

// Catches a 404 error to send to error handler.
app.use((req, res, next) => {
    const err = new Error(`Oops, page not found.`);
    err.status = 404;
    console.log('Sorry, this page does not exist.');
    next(err);
});

// Error handler that renders the error pug template.
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Runs the app on local host at port 3000.
app.listen(3000, () => {
    console.log('The application is running on localhost:3000.');
});