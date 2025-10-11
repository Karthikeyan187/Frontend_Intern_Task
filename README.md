# Notes App - Full-Stack Web Application

A modern, scalable notes application built for the Frontend Developer Intern position at Bajarang. This project showcases a complete full-stack solution with user authentication, CRUD operations, and a polished UI, ready for production deployment.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens and password hashing.
- **Notes Management**: Create, read, update, delete notes with tagging and search functionality.
- **Responsive Design**: Mobile-first UI with Tailwind CSS, animations, and Vanta.js backgrounds.
- **Real-Time Search**: Filter notes by title/content or tags.
- **Professional UI**: Indigo theme with gradients, cards, and smooth transitions.
- **API Documentation**: Postman collection for easy testing.
- **Scalable Architecture**: Modular code ready for production scaling.

## 🛠 Tech Stack

### Frontend
- **Next.js** (React framework with pages router)
- **Tailwind CSS** (Utility-first styling)
- **Vanta.js** (Dynamic background animations)
- **Axios** (HTTP client for API calls)

### Backend
- **Node.js** with **Express.js** (RESTful API server)
- **MongoDB** with **Mongoose** (NoSQL database)
- **JWT** (Authentication tokens)
- **bcryptjs** (Password hashing)
- **Joi** (Input validation)

### DevOps & Tools
- **Postman** (API testing)
- **Morgan** (HTTP request logging)
- **CORS** (Cross-origin resource sharing)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MONGO_URI and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   echo "NEXT_PUBLIC_API_URL=http://localhost:5001/api" > .env.local
   npm run dev
   ```

4. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5001

## 📖 Usage

1. **Register**: Create a new account on the signup page.
2. **Login**: Authenticate to access your dashboard.
3. **Dashboard**: View profile, manage notes (CRUD), search/filter.
4. **Logout**: Securely end your session.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/profile` | Get user profile |
| POST | `/api/profile` | Update user profile |
| GET | `/api/notes` | Get all user notes (with optional ?q=search) |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

Use the included Postman collection for testing.

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub.
2. Connect to Vercel and deploy.
3. Set environment variables.

### Backend (Heroku/AWS)
1. Containerize with Docker.
2. Deploy to Heroku or AWS EC2.
3. Configure MongoDB Atlas.

## 🔒 Security

- Passwords hashed with bcryptjs.
- JWT tokens for session management.
- Input validation with Joi.
- CORS configured for frontend origin.

## 📈 Scalability Notes

To scale this app for production:

- **API Rate Limiting**: Use express-rate-limit to prevent abuse.
- **Caching**: Implement Redis for sessions and API responses.
- **Database**: Upgrade to MongoDB Atlas with replicas and sharding.
- **Load Balancing**: Deploy behind NGINX or AWS ELB.
- **CDN**: Serve assets via Cloudflare for global speed.
- **Monitoring**: Add Sentry for error tracking and Winston for logs.
- **Security**: Enforce HTTPS, use helmet.js, and version APIs.
- **Frontend**: Optimize with code splitting and lazy loading.
- **CI/CD**: Automate with GitHub Actions for reliable deployments.

