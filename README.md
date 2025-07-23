# HireLink Platform

A backend application designed to manage job applications and hiring workflows efficiently. The system is built with Java, Spring Boot, and Maven, with clean configuration, scalable project structure, and secure credential handling.

## Features

- Job application model and basic domain structure
- RESTful backend built with Spring Boot
- Custom argument resolver for user context injection
- S3 configuration for cloud storage integration
- Maven Wrapper included for ease of building
- Properties-based configuration (`application.properties`)
- Clean Git history without leaked secrets
- Ready to integrate with authentication, database, or third-party APIs

## Project Structure

```
HireLink-Platform/
├── mvnw, mvnw.cmd 
├── pom.xml       
├── .gitignore
├── README.md
├── src/
│   ├── main/
│   │   ├── java/com/jb/
│   │   │   ├── JobApplication.java         # Domain model
│   │   │   └── configs/
│   │   └── resources/
│   │       └── application.properties      # Configuration file
│   └── test/                              
```

## Getting Started

### Prerequisites

- Java 17+
- Maven or Maven Wrapper (`mvnw`/`mvnw.cmd`)
- IDE (IntelliJ, VS Code, Eclipse, etc.)

### Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/HTToann/HireLink-Platform.git
   cd HireLink-Platform
   ```

2. **Build the project**

   ```sh
   ./mvnw clean install
   ```

3. **Run the application**

   ```sh
   ./mvnw spring-boot:run
   ```

4. **Access the API (if enabled)**

   - Visit `http://localhost:8080` or your configured port

## Main Java Dependencies

- Spring Boot
- Spring Web
- AWS SDK (S3)
- Lombok (if configured in `pom.xml`)
- Spring Context

See `pom.xml` for the full list of dependencies.
