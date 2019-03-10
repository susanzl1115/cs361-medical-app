
module.exports = function () {
	var express = require('express');
	var router = express.Router();
	
	// get provider from id 
	function getProviderID(res, mysql, context, id, complete) {
		var sql = 'SELECT p.patient_first_name, p.patient_last_name, mp.insurance_company, mp.identification, mp.member, mmp.provider_name FROM Med_Insurance mp INNER JOIN Med_medicalProvider mmp ON mp.insurance_id = mmp.insurance_id_fk INNER JOIN Med_Practitioner mpv ON mpv.provider_id_fk = mmp.provider_id INNER JOIN Med_AssignPractitioner map ON map.practitioner_id_fk = mpv.practitioner_id INNer JOIN Med_Patient p ON p.patient_id = map.patient_id_fk WHERE p.patient_id = ?'
		var inserts = [id];
		mysql.pool.query(sql, inserts, 
			function(error, results, fields) {
				if (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
				
				context.providerID = results[0]; // select only first data set 
				complete();	
			}
		);
	}
	
	function getMedicalPatients(res, mysql, context, complete) {
		var sql = 'SELECT patient_id, patient_first_name, patient_last_name FROM Med_Patient';
		mysql.pool.query(sql,
			function(error, results, fields) {
				if (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
				
				context.patients = results; 
				complete();	
			}
		);
	}
	
	router.get('/', function(req, res) {
		var callbackCount = 0;
		var context= {};
		var mysql = req.app.get('mysql');
		getMedicalPatients(res, mysql, context, complete);
		var file = 'patients';
		
		function complete() {
			callbackCount++;
			if(callbackCount >= 1) {
				res.render(file, context);
			}
		}
	});
	
	router.get('/:id', function(req, res) {
		var callbackCount = 0;
		var context = {};
		// context.jsscripts = ["a_delete.js"];
		var mysql = req.app.get('mysql');
		getProviderID(res, mysql, context, req.params.id, complete);
		var file = 'providerID';
		
		function complete() {
			callbackCount++;
			if(callbackCount >= 1) {
				res.render(file, context);
			}
		}
	});
	
	return router;
}();
	