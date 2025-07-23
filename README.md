# HireLink Platform

A backend application designed to manage job applications and hiring workflows efficiently. Built using Java, Spring Boot, and Maven, with MongoDB for data persistence and WebSocket support for real-time updates.

## Features

- Job application model and domain structure
- RESTful API built with Spring Boot
- MongoDB for data storage
- WebSocket support for real-time communication
- Custom argument resolver for user context injection
- S3 configuration for cloud storage integration
- Maven Wrapper included for easy build and run
- application.properties for environment config
- Clean Git history with no leaked secrets

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
│   │   │   ├── JobApplication.java
│   │   │   └── configs/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
```

## Getting Started

### Prerequisites

- Java 17+
- Maven or Maven Wrapper
- MongoDB running locally or remotely
- IDE (e.g., IntelliJ, VS Code)

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

4. **Access the API**
   - API: `http://localhost:8080`

## Main Java Dependencies

- Spring Boot
- Spring Web
- Spring Data MongoDB
- Spring WebSocket
- AWS SDK (S3)
- Lombok

See `pom.xml` for the full list.
