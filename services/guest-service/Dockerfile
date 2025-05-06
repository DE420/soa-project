FROM eclipse-temurin:21-jdk-jammy as builder

# Set the working directory inside the container
WORKDIR /opt/app

# Copy Maven wrapper files
COPY .mvn/ .mvn
COPY mvnw .

# Copy the root POM file (saga-orchestration)
COPY pom.xml .

# Copy all module POM files to satisfy Maven's module structure
COPY outbox/pom.xml ./outbox/pom.xml
COPY services/hotel-service/pom.xml ./services/hotel-service/pom.xml
COPY services/payment-service/pom.xml ./services/payment-service/pom.xml
COPY services/reservation-service/pom.xml ./services/reservation-service/pom.xml
COPY services/guest-service/pom.xml ./services/guest-service/pom.xml
COPY api-gateway/pom.xml ./api-gateway/pom.xml

# Download dependencies for guest-service and its dependencies
RUN ./mvnw dependency:go-offline -pl services/guest-service -am

# Copy the application source code for guest-service and its dependencies
COPY outbox/src/main ./outbox/src/main
COPY services/guest-service/src/main ./services/guest-service/src/main

# Build the guest-service module
RUN ./mvnw clean install -pl services/guest-service -am

# Switch to a new stage with the JRE-only base image
FROM eclipse-temurin:21-jre-jammy

# Set the working directory inside the container
WORKDIR /opt/app

# Expose the default Spring Boot port
EXPOSE 8080

# Copy the JAR file from the builder stage
COPY --from=builder /opt/app/services/guest-service/target/guest-service-1.0-SNAPSHOT.jar /opt/app/app.jar

# Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "/opt/app/app.jar"]