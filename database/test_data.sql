INSERT INTO tutor (tutor_username,tutor_password,tutor_firstname,tutor_surname)
VALUES
("jross","password123","Joel","Ross"),
("fakeTutor","password","Fake","Tutor");

INSERT INTO student (student_username,student_firstname,student_surname,tutor_id)
VALUES
("iq20064","William","Tripp",1),
("oj20075","Siana","Dicheva",1),
("ne20327","Sam","Thomas",1),
("kk19041","Luo","Zhao",1),
("ab12345","John","Doe",2);

INSERT INTO unit (code,unit_name)
VALUES
("COMS20006","SPE"),
("COMS20008","Computer Systems A"),
("COMS30042","Advanced Algorithms");

INSERT INTO assessment (assessment_name,summative,unit_id)
VALUES
("MVP",FALSE,1),
("Beta",FALSE,1),
("Final release",TRUE,1),
("Bank",FALSE,2),
("Game of Life",TRUE,2),
("Exam",TRUE,2);

INSERT INTO attendance (student_id,unit_id,attendance)
VALUES
(1,1,84),
(1,2,60),
(2,1,92),
(2,2,75),
(3,1,90),
(3,2,93),
(4,1,87),
(4,2,70);

INSERT INTO grades (student_id,assessment_id,grade)
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

INSERT INTO unit_enrollment (student_id,unit_id)
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(1,2),
(2,2),
(3,2),
(4,2);