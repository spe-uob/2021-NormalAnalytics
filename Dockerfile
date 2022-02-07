FROM maven:3.8.2-openjdk-11-slim as build
COPY NormalAnalytics/src /home/app/src
COPY normal-analytics-frontend /home/normal-analytics-frontend
COPY NormalAnalytics/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests=True

FROM openjdk:11.0-jdk-slim-buster
COPY --from=build /home/app/target/NormalAnalytics-0.0.1-SNAPSHOT.jar /usr/local/lib/demo.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]