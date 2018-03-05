var express = require('express'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 3000,
	app = express();

var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url);

var getUser = require('./app/routes/user').getUser;
var getUsers = require('./app/routes/user').getUsers;
var postUser = require('./app/routes/user').postUser;
var updateUser = require('./app/routes/user').updateUser;



app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.route("/user")
	.get(getUsers)
	.post(postUser);
app.route("/user/:id")
	.get(getUser)
	.put(updateUser);

app.listen(port);
console.log("Server loaded. The magic happens on port", port)

module.exports = app;