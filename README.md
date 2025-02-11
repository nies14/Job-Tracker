# Job Application Tracker

A full-stack application to help users track their job applications across different stages.

## Features

- User authentication (register/login)
- Track job applications in different stages:
  - Details
  - In Progress
  - Accepted
  - Rejected
- Drag and drop functionality to move applications between stages
- Add notes to each job application
- User-specific job listings
- Responsive design

## Technology Stack

### Frontend

- React.js
- React DnD (Drag and Drop)
- JavaScript/ES6
- CSS3
- js-cookie for cookie management
- JWT for authentication

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the Backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/job-tracker
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the Frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the Frontend directory:

```env
REACT_APP_URL=http://localhost:5000/api
```

4. Start the frontend application:

```bash
npm start
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Jobs

- GET `/api/jobs` - Get all jobs for logged-in user
- POST `/api/jobs` - Create a new job
- PATCH `/api/jobs/:id` - Update job status
- DELETE `/api/jobs/:id` - Delete a job

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port number
- `JWT_SECRET`: Secret key for JWT
- `NODE_ENV`: Environment mode (development/production)

### Frontend

- `REACT_APP_URL`: Backend API base URL

## Project Structure

```
job-tracker/
├── Backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   ├── .env
│   └── package.json
└── README.md
```

## Usage

1. Register a new account or login with existing credentials
2. Add new job applications using the form
3. Add relevant details including company name, job description, and notes
4. Drag and drop job cards between columns to update their status
5. Delete jobs when needed

## Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Protected API routes
- HTTP-only cookies for token storage
- CORS protection

## Deployment

### Backend

- Ensure environment variables are properly set
- Update MONGODB_URI to production database
- Set NODE_ENV to production

### Frontend

- Update REACT_APP_URL to production API URL
- Build the production version:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License
