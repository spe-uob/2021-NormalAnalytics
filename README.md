# 2021-NormalAnalytics
Need to support student engagement through the data resources currently available.
Whilst BB has a great amount of data which is currently broadly discarded in the background in unusable
formats.
The project proposes two elements:
1. Develop a processed dashboard of information useful for gauging
understanding and engagement of a unit at both a student by student level and also a cohort overview using
log on data, attainment in formative and summative tests and the analytics from videos.
2. If possible develop a tutor view where when given a list of students on a programme the software can
compile this data across units to again give personal tutors the information required to spot difficulties
for students and offer further support.”

Deployment guide:

1. Clone the repository.

2. If not already done so, initialise your database using the database/db-init.sql and populate it either using your own data or using the database/test_data.sql script

3. Enter your database and Redis server credentials in ./NormalAnalytics/src/main/resources/application.properties

4. Navigate to to ./NormalAnalytics and run the command 'mvn clean install'

5. Navigate to ./NormalAnalytics/target and run the command 'java -jar NormalAnalytics-0.0.1-SNAPSHOT.jar'

6. Open in browser on localhost:8080

Dependencies:

Java 11 or higher

Maven 

MariaDB

Redis