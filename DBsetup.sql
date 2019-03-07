-- Med_Insurance
DROP TABLE IF EXISTS Med_Insurance;
CREATE TABLE IF NOT EXISTS Med_Insurance (
    insurance_id INT AUTO_INCREMENT,
    insurance_company VARCHAR(255) NOT NULL,
    identification VARCHAR(255) NOT NULL,
    member VARCHAR(255) NOT NULL,
    PRIMARY KEY(insurance_id)
) ENGINE=INNODB;

INSERT INTO Med_Insurance (insurance_company, identification, member)
VALUES ('Premera Blue Cross', '10001010', 'Lucas'),
       ('Premera Blue Cross', '10001011', 'Nancy'),
       ('Premera Blue Cross', '10001012', 'Tim'),
       ('Aetna', '20001010', 'Nathan'),
       ('Aetna', '20001011', 'Alex'),
       ('Wellcare', '30001010', 'Julia');

-- Med_medicalProvider
CREATE TABLE IF NOT EXISTS Med_medicalProvider (
    provider_id INT AUTO_INCREMENT,
    provider_name VARCHAR(255) NOT NULL,
    insurance_id_fk INT NOT NULL,
    PRIMARY KEY (provider_id),
    FOREIGN KEY (insurance_id_fk) REFERENCES Med_Insurance(insurance_id) ON DELETE CASCADE
)  ENGINE=INNODB；

INSERT INTO Med_medicalProvider (provider_name, insurance_id_fk)
VALUES ('Provider A', 1),
       ('Provider B', 2),
       ('Provider C', 3),
       ('Provider D', 4),
       ('Provider E', 5),
       ('Provider F', 6);

-- Med_Practitioner 
CREATE TABLE IF NOT EXISTS Med_Practitioner(
    practitioner_id INT AUTO_INCREMENT,
    practitioner_name VARCHAR(255) NOT NULL,
    provider_id_fk INT NOT NULL,
    PRIMARY KEY (practitioner_id),
    FOREIGN KEY (provider_id_fk) REFERENCES Med_medicalProvider(provider_id) ON DELETE CASCADE
)ENGINE=INNODB;

INSERT INTO Med_Practitioner ( practitioner_name, provider_id_fk)
VALUES ('Dr. Jessie', 1),
       ('Dr. Candice', 1),
       ('Dr. Anthony', 2),
       ('Dr. Moira', 2),
       ('Dr. Annie', 3),
       ('Dr. Angela', 3),
       ('Dr. Jayser', 4),
       ('Dr. Jonna', 4),
       ('Dr. Wayne', 5),
       ('Dr. Danny', 6);

-- Med_Patient
CREATE TABLE IF NOT EXISTS Med_Patient (
    patient_id INT AUTO_INCREMENT,
    patient_first_name VARCHAR(255) NOT NULL,
    patient_last_name VARCHAR(255) NOT NULL,
    patient_gender VARCHAR(255) NOT NULL,
    patient_birthdate DATE,
    PRIMARY KEY (patient_id)
)  ENGINE=INNODB;

INSERT INTO Med_Patient (patient_first_name, patient_last_name, patient_gender, patient_birthdate)
VALUES('Jenny', 'Cremer', 'Female', '1986--10-18'),
      ('Mia', 'Divia', 'Female', '1984-02-10'),
      ('Leo', 'R', 'Male', '1990-11-15'),
      ('Peter', 'Jone', 'Male', '1980-09-18'),
      ('Ruby', 'Mie', 'Male', '1978-12-12'),
      ('Angel', 'Hill', 'Female', '1964-06-25'),
      ('Sandra', 'Foster', 'Female', '1989-10-20');

-- Med_AssignPractitioner
CREATE TABLE IF NOT EXISTS Med_AssignPractitioner (
    assign_id INT AUTO_INCREMENT,
    patient_id_fk INT NOT NULL,
    practitioner_id_fk INT NOT NULL,
    PRIMARY KEY (assign_id),
    FOREIGN KEY (patient_id_fk) REFERENCES Med_Patient(patient_id) ON UPDATE CASCADE,
    FOREIGN KEY (practitioner_id_fk) REFERENCES Med_Practitioner(practitioner_id) ON UPDATE CASCADE
)ENGINE=INNODB;

INSERT INTO Med_AssignPractitioner (patient_id_fk, practitioner_id_fk)
VALUES (1, 9),
       (2, 3),
       (4, 10),
       (6, 8),
       (7, 4);

-- Med_Appointment
CREATE TABLE IF NOT EXISTS Med_Appointment (
    appointment_id INT AUTO_INCREMENT,
    availability DATETIME,
    practitioner_id_fk INT NOT NULL,
    PRIMARY KEY (appointment_id), 
    FOREIGN KEY (practitioner_id_fk) REFERENCES Med_Practitioner(practitioner_id) ON DELETE CASCADE
)ENGINE=INNODB;

INSERT INTO Med_Appointment (availability, practitioner_id_fk)
VALUES ('2019-4-1 10:00:00', 1),
       ('2019-3-8 13:00:00', 2),
       ('2019-3-9 14:00:00', 2),
       ('2019-3-10 9:00:00', 3),
       ('2019-3-15 10:00:00', 4),
       ('2019-3-18 11:00:00', 5),
       ('2019-3-11 15:00:00', 6),
       ('2019-3-12 16:00:00', 7),
       ('2019-4-15 17:00:00', 8),
       ('2019-3-27 12:00:00', 9),
       ('2019-3-28 9:30:00', 10);