DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    sex VARCHAR(255) NOT NULL,
    insurer VARCHAR(255) NOT NULL,
);

INSERT INTO users (first_name, middle_name, last_name, dob, sex, insurer)
VALUES
    ('john', 'doe', 'smith', '30-11-1991', 'M', 'Aetna'),
    ('jane', 'doe', 'williams', '1-12-1985', 'F', 'Kaiser Health Insurance');


CREATE TABLE Med_PatientHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescrip_name VARCHAR(255) NOT NULL,
    prescrip_date VARCHAR(255) NOT NULL,
    physician VARCHAR(255) NOT NULL,
    dosage VARCHAR(255) NOT NULL,
    patient_id INT,
    FOREIGN KEY(patient_id) REFERENCES users(id)
);

INSERT INTO prescription_history (prescrip_date, prescrip_name, physician, dosage, patient_id)
VALUES
    ('1-1-2019', 'Ambien', 'Dr. A', '15mg', 1);

----------------
CREATE TABLE Med_PatientHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescrip_name VARCHAR(255) NOT NULL,
    prescrip_date VARCHAR(255) NOT NULL,
    physician VARCHAR(255) NOT NULL,
    dosage VARCHAR(255) NOT NULL,
    patient_id INT,
    FOREIGN KEY(patient_id) REFERENCES Med_Patient(patient_id)
);

INSERT INTO prescription_history (prescrip_date, prescrip_name, physician, dosage, patient_id)
VALUES
    ('1-1-2019', 'Ambien', 'Dr. A', '15mg', 1);












