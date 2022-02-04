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
unitname varchar(100) NOT NULL,
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
assessmentname varchar(100) UNIQUE NOT NULL,
summative bool NOT NULL,
unit int NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (unit) REFERENCES unit(id)
);

CREATE TABLE attendance (
student int 