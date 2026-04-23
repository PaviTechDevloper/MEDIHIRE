# Development Workflow

## Request Flow Example: Job Application
1. User logs in from React frontend.
2. Frontend calls `POST /api/auth/login` on API Gateway.
3. Gateway forwards request to Auth Service.
4. Auth Service validates credentials and returns JWT.
5. Frontend stores JWT and calls `POST /api/applications` with selected job ID.
6. Gateway forwards request to Application Service.
7. Application Service validates job seeker role, checks for duplicate application, stores application, and calls Notification Service.
8. Notification Service stores notification and emits real-time event to connected frontend clients.
9. Job seeker sees application in tracker; employer sees applicant in employer dashboard.

## Request Flow Example: Job Posting
1. Employer logs in.
2. Frontend sends `POST /api/jobs` to API Gateway.
3. Gateway forwards request to Job Service.
4. Job Service validates employer role and persists job.
5. Notification Service can send new job alerts to matching job seekers later.

## Inter-service Communication
- Application Service -> Job Service: validate job availability
- Application Service -> Notification Service: status/application alerts
- Auth Service -> other services: JWT secret shared for token validation

## Suggested Development Order
1. Run Auth Service
2. Run Profile Service
3. Run Job Service
4. Run Application Service
5. Run Notification Service
6. Run API Gateway
7. Run Frontend
