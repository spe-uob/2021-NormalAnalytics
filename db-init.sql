CREATE TABLE tutor (
tutor_username varchar(100) UNIQUE NOT NULL,
tutor_password varchar(100) NOT NULL,
tutor_firstname varchar(100) NOT NULL,
tutor_surname varchar(100) NOT NULL,
tutor_id int UNIQUE AUTO_INCREMENT,
PRIMARY KEY (tutor_id)
);

CREATE TABLE unit (
unit_id int UNIQUE AUTO_INCREMENT,
code varchar(9) UNIQUE NOT NULL,
unit_name varchar(100) NOT NULL,
PRIMARY KEY (unit_id)
);

CREATE TABLE student (
student_id int UNIQUE AUTO_INCREMENT,
student_username varchar(100) UNIQUE NOT NULL,
student_firstname varchar(100) NOT NULL,
student_surname varchar(100) NOT NULL,
tutor_id int NOT NULL,
PRIMARY KEY (student_id),
FOREIGN KEY (tutor_id) REFERENCES tutor(tutor_id)
);

CREATE TABLE assessment (
assessment_id int UNIQUE AUTO_INCREMENT,
assessment_name varchar(100) UNIQUE NOT NULL,
summative bool NOT NULL,
unit_id int NOT NULL,
PRIMARY KEY (assessment_id),
FOREIGN KEY (unit_id) REFERENCES unit(unit_id)
);

CREATE TABLE attendance (
student_id int NOT NULL,
unit_id int NOT NULL,
attendance real NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(student_id),
FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
PRIMARY KEY (student_id, unit_id)
);

CREATE TABLE grades (
student_id int UNIQUE NOT NULL,
assessment_id int UNIQUE NOT NULL,
grade real NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(student_id),
FOREIGN KEY (assessment_id) REFERENCES assessment(assessment_id),
PRIMARY KEY (student_id, assessment_id)
);

CREATE TABLE unit_enrollment(
student_id int UNIQUE NOT NULL,
unit_id int UNIQUE NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(student_id),
FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
PRIMARY KEY (student_id,unit_id)
);