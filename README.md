# 2021-NormalAnalytics

## Overview
Need to support student engagement through the data resources currently available.
Whilst BB has a great amount of data which is currently broadly discarded in the background in unusable
formats.
The project proposes two elements:
 - Develop a processed dashboard of information useful for gauging
understanding and engagement of a unit at both a student by student level and also a cohort overview using
log on data, attainment in formative and summative tests and the analytics from videos.
 - If possible develop a tutor view where when given a list of students on a programme the software can
compile this data across units to again give personal tutors the information required to spot difficulties
for students and offer further support.”

## User stories

 - As a personal tutor, I would like to be able to see student formative assignment data, not just the summative assignment data 
 - As a personal tutor, I would like to be able to see the entirety of a student's academic data throughout all units, not just unit-by-unit 
 - As a personal tutor, I would like to be able to compare student assignment data to the general result of the cohort 
 - As a personal tutor, I would to be able to see a student's average overall grade taking into account the different weightings of each unit 
 - As a personal tutor, I would like to be able to select the student I want to see the data for from a list of just my tutees
 - As a personal tutor, I would like to be able to see student attendance
## Quick links and navigation of the project
 [Documentation](https://github.com/spe-uob/2021-NormalAnalytics/tree/main/docs)
 
[Kanban board](https://github.com/spe-uob/2021-NormalAnalytics/projects)

[Pull requests](https://github.com/spe-uob/2021-NormalAnalytics/pulls)

[Commits](https://github.com/spe-uob/2021-NormalAnalytics/commits)

## User guide

Follow this link : http://4c110c5a-eu-gb.lb.appdomain.cloud:8080/

Log in with your given credentials 

## Developer guide:
### Dependencies:

Java 11 or higher

Maven 

MariaDB

Redis

Node JS

### Local build

- Clone the repository 
```sh 
git clone https://github.com/spe-uob/2021-NormalAnalytics.git
```
- Open the database folder

```sh 
cd 2021-NormalAnalytics/database
```
- Open MariaDB command prompt and authentisicate with the following command
```sh 
mysql -u user - p 
```
Then will be asked for your password. Finally type the following command to initialise the database: 
```sh 
source 2021-NormalAnalytics/database/db-init.sql 
```

Note: You could use your own data or use the database/test_data.sql script

- Enter your database and Redis server credentials in ./NormalAnalytics/src/main/resources/application.properties
- Start Redis server by the following command:
```sh 
sudo redis server start
```
Note - you will need sudo password
- Navigate to to ./NormalAnalytics and run the command 'mvn clean install'

- Navigate to ./NormalAnalytics/target and run the command 'java -jar NormalAnalytics-0.0.1-SNAPSHOT.jar'

- Open in browser on localhost:8080
- to run frontend navigate to 2021-NormalAnalytics/normal-analytics-frontend folder and run the following command in a terminal of your choice
```sh 
npm install
npm start
```
## Test

- To run frontend tests run command 
```sh 
npm test
```
- To run general tests run command
```sh 
mvn run test
```
## Licence
The system use MIT License. 
## Ethics
No sensitive is collected in this system, general ethics form could be seen on [Ethics form](https://github.com/spe-uob/2021-NormalAnalytics/tree/main/docs)
## Deployment
This system is deployed on IBM Cloud



