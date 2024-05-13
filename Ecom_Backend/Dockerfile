# Use a base image with Java installed
FROM khipu/openjdk17-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and related files into the container
COPY mvnw .
COPY .mvn .mvn

# Copy the Maven project file
COPY pom.xml .

# Download dependencies and ensure they are available offline
RUN ./mvnw dependency:go-offline -B

# Copy the application source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# Create a directory for dependencies
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Build the final image
FROM khipu/openjdk17-alpine

ARG DEPENDENCY=/app/target/dependency

# Copy dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Expose the port on which your Spring Boot application runs
EXPOSE 8080

# Set the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "net.javaguides.springboot.EcomBackendApplication"]
