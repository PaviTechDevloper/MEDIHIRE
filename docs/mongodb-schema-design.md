# MongoDB Schema Design

## Auth DB (`medihire_auth`)
### users
- `_id`
- `fullName`
- `email` (unique)
- `password` (hashed)
- `role` (`jobseeker | employer | admin`)
- `createdAt`, `updatedAt`

## Profile DB (`medihire_profiles`)
### profiles
- `_id`
- `userId` (unique, maps to auth user)
- `role`
- `phone`
- `location`
- `bio`
- `skills[]`
- `specialization`
- `education[]`
- `experienceYears`
- `resumeUrl`
- `employerDetails.organizationName`
- `employerDetails.organizationType`
- `employerDetails.website`
- `employerDetails.address`
- `employerDetails.description`
- `createdAt`, `updatedAt`

## Job DB (`medihire_jobs`)
### jobs
- `_id`
- `employerId`
- `title`
- `companyName`
- `location`
- `employmentType`
- `specialization`
- `experienceLevel`
- `salaryMin`
- `salaryMax`
- `description`
- `skillsRequired[]`
- `qualifications[]`
- `status`
- `createdAt`, `updatedAt`

## Application DB (`medihire_applications`)
### applications
- `_id`
- `jobId`
- `employerId`
- `jobSeekerId`
- `status`
- `coverLetter`
- `createdAt`, `updatedAt`

Unique index:
- `{ jobId: 1, jobSeekerId: 1 }`

## Notification DB (`medihire_notifications`)
### notifications
- `_id`
- `userId`
- `title`
- `message`
- `type`
- `read`
- `createdAt`, `updatedAt`
