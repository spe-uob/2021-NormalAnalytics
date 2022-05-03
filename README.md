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

### Importing Blackboard data

- On initial login, a directory ./NormalAnalytics/target/blackboard will be created (or ./NormalAnalytics/blackboard if running through an IDE)
- In the directory, find the subdirectory for your tutor username
- Within this directory, create a subdirectory with the username of the student who's grades you wish to import
- Students can access their grades on Blackboard via the `My Marks` icon in the dropdown menu under their username
- From their they can select the assessment you wish to import
- Press `Ctrl + S` to download the page's HTML files
- Inside the newly downloaded folder, you should find a file named `myGrades.html`
- Copy this file into the corresponding student directory and rename it to the code of it's unit (For example, to import grades from SPE, you would rename `myGrades.html` to `COMS20006.html`
- The database should be updated upon next login

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
mysql -u user -p 
```
Then will be asked for your password. Finally type the following command to initialise the database: 
```sh 
source [location of project on disk]/2021-NormalAnalytics/database/db-init.sql 
```

Note: This script populates the database with test data which can be safely removed if you wish

- Enter your database and Redis server credentials in ./NormalAnalytics/src/main/resources/application.properties
- Start Redis server by the following command:
```sh 
sudo redis-server
```
Note - you will need sudo password
- Navigate to to ./NormalAnalytics and run the command 'mvn clean install'

- Navigate to ./NormalAnalytics/target and run the command 'java -jar NormalAnalytics-0.0.1-SNAPSHOT.jar'

- Open in browser on localhost:8080
- If you wish to run the frontend seperately navigate to 2021-NormalAnalytics/normal-analytics-frontend folder and run the following command in a terminal of your choice
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
mvn test
```

## Remote Deployment Guide on IBM Cloud
- From the IBM Cloud dashboard, navigate to `DevOps` > `Toolchains` in the sidebar
- Create a toolchain
- Select `Develop a Kubernetes App`
- Change the source provider to `Github`
- Set the repository type to `Existing`
- Enter the URL of the repository (Note: if you aren't the owner of the repository, you made need to make a fork and use its URL instead)
- Navigate to `Delivery Pipeline`
- Create a new API key or enter exisiting
- Set your organisation's `Resource Group`, `Cluster Name` and `Cluster Namespace`
- Click `Create`
- Click `Delivery Pipeline`
- Click on the settings gear of `Build` tile then `Configure Stage`
- Under Jobs tab, switch the `Builder Type` to `Maven`
- Replace the textbox under `Build script` with
```sh
#!/bin/bash
mvn -B -f NormalAnalytics/pom.xml package -DskipTests=True
```
- Click `Save`
- Click on the settings gear of `Deploy` tile then `Configure Stage`.
- Under the `Jobs` tab, inside `Deploy` script, replace what is in the textbox with
```sh
source ./check_and_deploy_kubectl.sh
```
- Click `Save`
- Begin the Pipeline

If your organisation does not have exisiting remote Redis and/or MariaDB servers, additional Dockerfiles for creating database containers in the `redis` and `database` directories respectively

## Licence
The system use MIT License. 
## Ethics
No sensitive is collected in this system, general ethics form could be seen on [Ethics form](https://github.com/spe-uob/2021-NormalAnalytics/tree/main/docs)



