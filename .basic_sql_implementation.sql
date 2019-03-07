DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, dob)
VALUES
    ('john', 'doe', '30-11-1991'),
    ('jane', 'doe', '1-1-1980');