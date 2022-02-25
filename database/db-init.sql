DROP DATABASE IF EXISTS normalanalytics;
CREATE DATABASE normalanalytics;
USE normalanalytics;

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
name varchar(100) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE student (
id int UNIQUE AUTO_INCREMENT,
username varchar(100) UNIQUE NOT NULL,
firstname varchar(100) NOT NULL,
surname varchar(100) NOT NULL,
tutor int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (tutor) REFERENCES tutor(id)
);

CREATE TABLE assessment (
id int UNIQUE AUTO_INCREMENT,
name varchar(100) UNIQUE NOT NULL,
summative bool NOT NULL,
unit int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (unit) REFERENCES unit(id)
);

CREATE TABLE attendance (
student int NOT NULL,
unit int NOT NULL,
attendance real NOT NULL,
FOREIGN KEY (student) REFERENCES student(id),
FOREIGN KEY (unit) REFERENCES unit(id),
PRIMARY KEY (student, unit)
);

CREATE TABLE grades (
student int NOT NULL,
assessment int NOT NULL,
grade real NOT NULL,
FOREIGN KEY (student) REFERENCES student(id),
FOREIGN KEY (assessment) REFERENCES assessment(id),
PRIMARY KEY (student, assessment)
);

CREATE TABLE unit_enrollment(
student int NOT NULL,
unit int NOT NULL,
FOREIGN KEY (student) REFERENCES student(id),
FOREIGN KEY (unit) REFERENCES unit(id),
PRIMARY KEY (student,unit)
);

INSERT INTO tutor (username,password,firstname,surname)
VALUES
("jross","password123","Joel","Ross"),
("fakeTutor","password","Fake","Tutor");

INSERT INTO student (username,firstname,surname,tutor)
VALUES
("iq20064","William","Tripp",1),
("oj20075","Siana","Dicheva",1),
("ne20327","Sam","Thomas",1),
("kk19041","Luo","Zhao",1),
("ab12345","John","Doe",2);

INSERT INTO unit (code,name)
VALUES
("COMS20006","SPE"),
("COMS20008","Computer Systems A"),
("COMS30042","Advanced Algorithms");

INSERT INTO assessment (name,summative,unit)
VALUES
("MVP",FALSE,1),
("Beta",FALSE,1),
("Release",TRUE,1),
("Bank",FALSE,2),
("Game of Life",TRUE,2),
("Exam",TRUE,2);

INSERT INTO attendance (student,unit,attendance)
VALUES
(1,1,84),
(1,2,60),
(2,1,92),
(2,2,75),
(3,1,90),
(3,2,93),
(4,1,87),
(4,2,70);

INSERT INTO grades (student,assessment,grade)
VALUES
(1,1,50),
(1,2,70),
(1,3,100),
(1,4,30),
(1,5,80),
(1,6,85),
(2,1,100),
(2,2,80),
(2,3,60),
(2,4,70),
(2,5,55),
(2,6,70),
(3,1,60),
(3,2,90),
(3,3,50),
(3,4,70),
(3,5,75),
(3,6,90),
(4,1,90),
(4,2,85),
(4,3,50),
(4,4,60),
(4,5,85),
(4,6,90);

INSERT INTO unit_enrollment (student,unit)
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(1,2),
(2,2),
(3,2),
(4,2);