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
  res.render('index', {title: 'CS361 Week 6 - Group 24'});
});

// story 1 medical form information
app.get('/story1', function(req, res) {
  res.render('medform');
});


// story 2 basic implementation for testing
app.get('/story2', function(req, res) {
  // set up queries for getting patient information
  const patient_query = 'select * from Med_Patient';
  var patient;

  const prescription_query = 'select \
  Med_Patient.patient_first_name, Med_Patient.patient_last_name, Med_Practitioner.practitioner_name, \
  Med_PatientHistory.prescrip_name, Med_PatientHistory.prescrip_date, Med_PatientHistory.dosage \
  from \
  Med_PatientHistory \
  inner join Med_Patient ON Med_PatientHistory.patient_id = Med_Patient.patient_id \
  inner join Med_Practitioner ON Med_PatientHistory.physician_id = Med_Practitioner.practitioner_id';

  // get patient data
  connection.query(patient_query, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    patient = results;
  });


  connection.query(prescription_query, function(error, results, fields) {
    if (error) throw error;
    // pass sql results and title into the handlebars page
    console.log(results);
    res.render(
        'story2',
        {title: 'Story 2', patientHistory: results, patient: patient});
  });
});


// story 3 basic implementation for testing
app.get('/story3', function(req, res) {
  const query = 'SELECT * from users';

  res.render('medform');
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

app.get('/story6', function (req, res) {
    const query =
      'SELECT provider_name, practitioner_name FROM Med_medicalProvider INNER JOIN Med_Insurance ON Med_Insurance.insurance_id = Med_medicalProvider.insurance_id_fk INNER JOIN Med_Practitioner ON Med_Practitioner.provider_id_fk = Med_medicalProvider.provider_id';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        // pass sql results and title into the handlebars page
        console.log(results);
        res.render('story6', { title: 'Story 6', providerID: results });
    });
});

// story 6 basic implementation for testing
app.post('/search_name', function (req, res) {
    var ctx = {};   
    var body = req.body;
    var identification = body.identification;
    var queryStr = "SELECT provider_name, practitioner_name FROM Med_medicalProvider";   
    queryStr += ' INNER JOIN Med_Insurance ON Med_Insurance.insurance_id = Med_medicalProvider.insurance_id_fk';
    queryStr += ' INNER JOIN Med_Practitioner ON Med_Practitioner.provider_id_fk = Med_medicalProvider.provider_id';
    queryStr += ' WHERE Med_Insurance.identification = "' + identification + '";';
    connection.query(queryStr, function(err, rows, fields) {   
        if (err) {   console.log(err);   
            console.log(queryStr);   
            ctx.results = err;   
            res.send(ctx);   return;   }   
        console.log(queryStr);   
        ctx.results = rows;   
        res.send(ctx);
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
