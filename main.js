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
  user: 'cs361_lucassha',
  password: '2333',
  database: 'cs361_lucassha'
});

// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'oniddb.cws.oregonstate.edu',
//   user: 'reedz-db',
//   password: 'TB5UGjHKqJiI9wgw',
//   database: 'reedz-db'
// });

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
  const query =
      'SELECT p.patient_first_name, p.patient_last_name, mp.insurance_company, mp.identification, mp.member, mmp.provider_name FROM Med_Insurance mp INNER JOIN Med_medicalProvider mmp ON mp.insurance_id = mmp.insurance_id_fk INNER JOIN Med_Practitioner mpv ON mpv.provider_id_fk = mmp.provider_id INNER JOIN Med_AssignPractitioner map ON map.practitioner_id_fk = mpv.practitioner_id INNer JOIN Med_Patient p ON p.patient_id = map.patient_id_fk';

  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    console.log(results);
    res.render('story4', {title: 'Story 4', providerID: results});
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
