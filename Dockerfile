FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./backend/src
RUN mvn package -DskipTests
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
# Use the official Eclipse Temurin image as the base image
# Set the working directory inside the container
# Copy the built JAR file from the build stage
# Expose port 8080 for the application
# Set the entry point to run the application
# Use Maven to build the application
# Set the working directory for the build stage
# Copy the Maven project file
# Download project dependencies
# Copy the source code
# Package the application, skipping tests for faster build