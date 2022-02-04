CREATE TABLE tutor (
username varchar(100) UNIQUE NOT NULL,
password varchar(100) NOT NULL,
firstname varchar(100) NOT NULL,
surname varchar(100) NOT NULL,
id int UNIQUE AUTO_INCREMENT,
PRIMARY KEY (id)
);

CREATE TABLE unit (
id int UNIQUE AUTO_INCREMENT,
code varchar(9) UNIQUE NOT NULL,
unit_name varchar(100) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE student (
id int UNIQUE AUTO_INCREMENT,
username varchar(100) UNIQUE NOT NULL,
firstname varchar(100) NOT NULL,
surname varchar(100) NOT NULL,
tutor_id int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (tutor_id) REFERENCES tutor(id)
);

CREATE TABLE assessment (
id int UNIQUE AUTO_INCREMENT,
assessment_name varchar(100) UNIQUE NOT NULL,
summative bool NOT NULL,
unit_id int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (unit_id) REFERENCES unit(id)
);

CREATE TABLE attendance (
student_id int NOT NULL,
unit_id int NOT NULL,
attendance real NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(id),
FOREIGN KEY (unit_id) REFERENCES unit(id),
PRIMARY KEY (student_id, unit_id)
);

CREATE TABLE grades (
student_id int UNIQUE NOT NULL,
assessment_id int UNIQUE NOT NULL,
grade real NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(id),
FOREIGN KEY (assessment_id) REFERENCES assessment(id),
PRIMARY KEY (student_id, assessment_id)
);

CREATE TABLE unit_enrollment(
student_id int UNIQUE NOT NULL,
unit_id int UNIQUE NOT NULL,
FOREIGN KEY (student_id) REFERENCES student(id),
FOREIGN KEY (unit_id) REFERENCES unit(id),
PRIMARY KEY (student_id,unit_id)
);