var express = require('express');
var todoController = require('./controllers/todoController.js');

var app = express();

// Setting up template engine
app.set('view engine', 'ejs');

// Using middleware for serving static files
app.use(express.static('./public'));

// Set up controllers
todoController(app);

// Listen to port
app.listen(3000, () => {
    console.log('Listening to port 3000...');
});
