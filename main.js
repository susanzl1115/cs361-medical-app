// // // for file writing
const fs = require('fs');

// import express, setup express object named "app"
// var tools = require('./tools');
var express = require('express');
var app = express();

// import handlebars and bodyParser
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('port', 3391);
app.set('view engine', 'handlebars');

// tells app to either use urlencoded or json depending on what it parses
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// makes "public" the location to serve static files (images, css, html)
app.use(express.static('public', {extensions: ['html']}));

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'classmysql.engr.oregonstate.edu',
  //user: 'cs361_lucassha',
  user: 'zhangl8-db',
  password: ' 95Ig3k9VNjmPDGJ3',
  //password: '2333',
  database: 'zhangl8-db'
});

connection.connect(function(err) {
  if (err) {
    console.error('mysql conn error: ' + err.stack);
    return;
  }

  console.log('MySQL connection verified');
});

/******************************************************
 * Routes Start Here
 *
 *
 ******************************************************
 */

//create Med_Insurance table 
/*
connection.query("DROP TABLE IF EXISTS Med_Insurance", function(err)) {
  var createString = "CREATE TABLE IF NOT EXISTS Med_Insurance(" +
  "insurance_id INT AUTO_INCREMENT," +
  "insurance_company VARCHAR(255) NOT NULL," +
  "identification VARCHAR(255) NOT NULL," +
  "member VARCHAR(255) NOT NULL," +
  "PRIMARY KEY(insurance_id)";
   connection.query(createString, function(err) {
      if (err) console.log(err);
      console.log("Med_Insurance table created");
   });
}
*/

// Home/Index Page
app.get('/', function(req, res) {
  res.render('index', {title: 'CS361 Week - Group 24'});
});

// story 1 medical form information
app.get('/story1', function(req, res) {
  res.render('medform');
});


// story 2 basic implementation for testing
app.get('/story2', function(req, res) {
  const query = 'SELECT * from users';

  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    res.render('story2', {title: 'Story 2', results: results});
  });
});


// story 3 basic implementation for testing
app.get('/story3', function(req, res) {
  const query = 'SELECT * from users';

  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    res.render('story3', {title: 'Story 3', results: results});
  });
});

// story 4 basic implementation for testing
app.get('/story4', function(req, res) {
  const query = 'SELECT * from users';

  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    res.render('story4', {title: 'Story 4', results: results});
  });
});

// story 5 basic implementation for testing
app.get('/story5', function(req, res) {
  const query = 'SELECT * from users';

  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    res.render('story5', {title: 'Story 5', results: results});
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log(
      'Express started on http://localhost:' + app.get('port') +
      '; press Ctrl-C to terminate.');
});
