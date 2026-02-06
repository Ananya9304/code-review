# Code Review Platform

A full-stack platform where developers submit code and receive AI + peer reviews.

## Features
- AI-generated code review feedback
- Peer review workflow
- Code quality scoring system
- Role-based authentication (Admin/Reviewer/User)
- Analytics dashboard for improvement tracking

## Folder Structure
- `backend/` → REST API, authentication, scoring logic
- `frontend/` → React UI, dashboards, submission portal

## Tech Stack
Frontend: React, Tailwind  
Backend: Node.js, Express  
Database: MongoDB/PostgreSQL  
Auth: JWT + RBAC  
Analytics: Chart.js

## Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
