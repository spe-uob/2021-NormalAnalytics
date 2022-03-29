CREATE TABLE IF NOT EXISTS tutor (
                       username varchar(100) UNIQUE NOT NULL,
                       password varchar(100) NOT NULL,
                       firstname varchar(100) NOT NULL,
                       surname varchar(100) NOT NULL,
                       id int AUTO_INCREMENT,
                       PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS unit (
                      id int AUTO_INCREMENT,
                      code varchar(9) UNIQUE NOT NULL,
                      name varchar(100) NOT NULL,
                      PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS student (
                         id int AUTO_INCREMENT,
                         username varchar(100) UNIQUE NOT NULL,
                         firstname varchar(100) NOT NULL,
                         surname varchar(100) NOT NULL,
                         tutor int NOT NULL,
                         PRIMARY KEY (id),
                         FOREIGN KEY (tutor) REFERENCES tutor(id)
);

CREATE TABLE IF NOT EXISTS assessment (
                            id int AUTO_INCREMENT,
                            name varchar(100) UNIQUE NOT NULL,
                            summative bool NOT NULL,
                            unit int NOT NULL,
                            PRIMARY KEY (id),
                            FOREIGN KEY (unit) REFERENCES unit(id)
);

CREATE TABLE IF NOT EXISTS attendance (
                            student int NOT NULL,
                            unit int NOT NULL,
                            date datetime NOT NULL,
                            present bool NOT NULL,
                            FOREIGN KEY (student) REFERENCES student(id),
                            FOREIGN KEY (unit) REFERENCES unit(id),
                            PRIMARY KEY (student, unit, date)
);

CREATE TABLE IF NOT EXISTS grades (
                        student int NOT NULL,
                        assessment int NOT NULL,
                        grade real NOT NULL,
                        FOREIGN KEY (student) REFERENCES student(id),
                        FOREIGN KEY (assessment) REFERENCES assessment(id),
                        PRIMARY KEY (student, assessment)
);

CREATE TABLE IF NOT EXISTS unit_enrollment(
                                student int NOT NULL,
                                unit int NOT NULL,
                                FOREIGN KEY (student) REFERENCES student(id),
                                FOREIGN KEY (unit) REFERENCES unit(id),
                                PRIMARY KEY (student,unit)
);