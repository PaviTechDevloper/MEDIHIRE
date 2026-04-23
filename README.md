# MediHire - Medical Job Finder (Microservices)

MediHire is a medical recruitment platform built with a strict microservices architecture using **React.js**, **Node.js/Express**, and **MongoDB**.

## Services
1. **API Gateway** - single entry point
2. **Auth Service** - JWT auth + RBAC
3. **Profile Service** - job seeker and employer profiles
4. **Job Service** - job posting and search
5. **Application Service** - apply and track status
6. **Notification Service** - in-app notifications + Socket.IO

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + Axios + React Router
- Backend: Node.js + Express + Mongoose
- Auth: JWT
- Realtime: Socket.IO
- Database: MongoDB (one DB per service recommended)

## Architecture Flow
Frontend -> API Gateway -> Target Service -> MongoDB

For notifications:
- Service performs action (e.g., application status update)
- Service calls Notification Service REST API
- Notification Service saves notification and emits real-time event via Socket.IO
- Frontend subscribes and updates dashboard/notification bell

## Local Ports
- API Gateway: 4000
- Auth Service: 4001
- Profile Service: 4002
- Job Service: 4003
- Application Service: 4004
- Notification Service: 4005
- Frontend: 5173

## Quick Start
### 1) Start MongoDB
Make sure MongoDB is running locally.

### 2) Install dependencies
Run in each folder:
```bash
npm install
```

### 3) Configure environment
Copy `.env.example` to `.env` for each service and update values.

### 4) Start backend services
Open 6 terminals:
```bash
cd api-gateway && npm run dev
cd services/auth-service && npm run dev
cd services/profile-service && npm run dev
cd services/job-service && npm run dev
cd services/application-service && npm run dev
cd services/notification-service && npm run dev
```

### 5) Start frontend
```bash
cd frontend && npm install && npm run dev
```

## Default Roles
- `jobseeker`
- `employer`
- `admin`

## Best Practices for Scaling Later
- Move from REST inter-service calls to async messaging (RabbitMQ/Kafka)
- Add service discovery and centralized config
- Add Redis caching for search and session invalidation
- Add Kubernetes, ingress, HPA, and centralized logging
- Split databases per service in production
- Add API rate limiting, audit logs, tracing, and CI/CD

## Python Requirements
This solution uses **Node.js only** for backend services. A placeholder `requirements.txt` is included only because you requested it.
