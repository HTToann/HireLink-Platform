# HireLink Platform – Fullstack Hire-Link

A full-stack hire-link platform built with **Java Spring Boot**, **React.js**, **MongoDB**, and **Docker Compose** for easy deployment.

---

## Project Structure

```
HireLink-Platform/
├── hire-link-be/        → Backend (Spring Boot)
├── hire-link-fe/        → Frontend (React)
├── docker-compose.yml   → Docker Compose file for both FE + BE
└── README.md
```

---

## Tech Stack

- **Frontend**: React.js, TypeScript, Mantine, TailwindCSS
- **Backend**: Java 21, Spring Boot, MongoDB, WebSocket
- **Database**: MongoDB
- **Infra**: Docker, Docker Compose
- **Others**: AWS S3 (for file upload), Maven Wrapper

---

## Getting Started (Manual)

### Backend (Spring Boot)

```bash
cd hire-link-be
./mvnw clean install
./mvnw spring-boot:run
# Accessible at http://localhost:8080
```

>  Make sure MongoDB is running locally or update the URI in `application.properties`.

---

### Frontend (React)

```bash
cd hire-link-fe
npm install
npm run dev
# Accessible at http://localhost:3000
```

> Edit `.env.production` to match backend API URL:

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## Getting Started with Docker

> Make sure [Docker](https://www.docker.com/products/docker-desktop) is installed.

### Build & Run

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

> If you encounter port conflicts, adjust them in `docker-compose.yml`.

---

## Environment Variables

### `hire-link-be/src/main/resources/application.properties`

```properties
spring.data.mongodb.uri=mongodb://mongo:27017/hirelink
aws.s3.bucket=your-bucket
aws.accessKeyId=your-access-key
aws.secretAccessKey=your-secret-key
```

### `hire-link-fe/.env.production`

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## Available Scripts (Frontend)

- `npm run dev`: Start dev server
- `npm run build`: Build production bundle
- `npm run preview`: Preview built app

---

## Features

- [x] User Registration & Login
- [x] Job Posting (Employer)
- [x] Job Application (Applicant)
- [x] WebSocket for live updates
- [x] AWS S3 File Upload
- [x] REST API with Spring Boot
- [x] MongoDB for document storage

---

## License

This project is licensed under the MIT License.
