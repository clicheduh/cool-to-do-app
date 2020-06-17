var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect(
    'mongodb+srv://test:test@todo-kt9nl.mongodb.net/datab1?retryWrites=true&w=majority'
);

//This is schema- it's like blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// // This is just for explaination of mongodb
// var itemOne = Todo({ item: 'get flowers' }).save((err) => {
//     if (err) throw err;
//     else console.log('Item has been saved');
// });

// // This is our dummy data
// var data = [
//     { item: 'learn photoshop' },
//     { item: 'make dinner' },
//     { item: 'get some sleep' }
// ];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        // Get data from mongodb and pass it into the view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            else res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        var myNewTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            else res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(
            (err, data) => {
                if (err) throw err;
                else res.json(data);
            }
        );
    });
};
