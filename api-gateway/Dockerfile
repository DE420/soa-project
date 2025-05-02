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
COPY api-gateway/pom.xml ./api-gateway/pom.xml

# Download dependencies for api-gateway
RUN ./mvnw dependency:go-offline -pl api-gateway -am

# Copy the application source code for api-gateway
COPY api-gateway/src/main ./api-gateway/src/main

# Build the api-gateway module
RUN ./mvnw clean install -pl api-gateway -am

# Switch to a new stage with the JRE-only base image
FROM eclipse-temurin:21-jre-jammy

# Set the working directory inside the container
WORKDIR /opt/app

# Expose the api-gateway port
EXPOSE 8085

# Copy the JAR file from the builder stage
COPY --from=builder /opt/app/api-gateway/target/api-gateway-1.0-SNAPSHOT.jar /opt/app/app.jar

# Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "/opt/app/app.jar"]