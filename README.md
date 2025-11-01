# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop with user authentication, inventory management, and role-based access control.


## ✨ Features

### User Features
- 🔐 User registration and login with JWT authentication
- 🍭 Browse all available sweets
- 🔍 Search and filter sweets by name, category, and price range
- 🛒 Purchase sweets (decreases inventory quantity)

### Admin Features
- ➕ Add new sweets to inventory
- ✏️ Edit existing sweet details
- 🗑️ Delete sweets from inventory
- 📦 Restock sweets (increase quantity)
- 👥 Role-based access control

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Testing**: Jest & Supertest
- **Validation**: express-validator

### Frontend
- **Framework**: React.js
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **State Management**: React Hooks

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sweet-shop-management.git
cd sweet-shop-management
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```



## 🏃 Running the Application

### Start Backend Server

```bash
# From backend folder
cd backend
npm start

# You should see:
# ✅ MongoDB Connected Successfully
# 🚀 Server running on port 5000
```

### Start Frontend Development Server

```bash
# Open a new terminal
# From frontend folder
cd frontend
npm start

# Frontend will open at http://localhost:3000
```

**The application will automatically open in your browser at `http://localhost:3000`**

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "password123",
  "role": "user"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Sweets Endpoints (Protected)

#### Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>
```

#### Search Sweets
```http
GET /api/sweets/search?name=gulab&category=traditional&minPrice=50&maxPrice=200
Authorization: Bearer <token>
```

#### Add New Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Gulab Jamun",
  "category": "Traditional",
  "price": 120,
  "quantity": 50,
  "description": "Soft and spongy milk-solid balls",
  "image": "https://example.com/gulab-jamun.jpg"
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Gulab Jamun Special",
  "price": 150
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <token>
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25
}
```

## 🧪 Testing

### Backend Tests

```bash
# Navigate to backend folder
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Test Coverage Report:**
```
PASS  tests/auth.test.js
PASS  tests/sweets.test.js

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        3.456 s
Coverage:    85% statements, 78% branches, 82% functions, 85% lines
```

### Frontend Tests

```bash
# Navigate to frontend folder
cd frontend

# Run tests
npm test
```

## 🤖 My AI Usage

### AI Tools Used

Throughout this project, I extensively utilized **Claude AI (Anthropic)** as my primary AI assistant for development, problem-solving, and code generation.

### How I Used AI

#### 1. **Project Architecture & Planning** 
- **What I did**: Asked Claude to help design the overall project structure 
- **AI contribution**: Provided suggestions for folder structure, separation of concerns, and best practices for MERN stack applications
- **My contribution**: Made final decisions based on project requirements and modified suggestions to fit specific needs

#### 2. **Backend Development** 
- **What I did**: Used Claude to generate boilerplate code for Express routes, middleware, and MongoDB models
- **AI contribution**: 
  - Generated initial User and Sweet model schemas with proper validation
  -  Provided error handling patterns and security best practices
- **My contribution**: 
  - Customized validation rules for specific business logic
  - Created authentication middleware with JWT token verification
  - Implemented additional fields and methods based on project requirements
  - Added comprehensive error messages and status codes

**Example Commits:**
```
feat: Add User authentication with JWT
- Implemented user registration and login endpoints
- Added password hashing with bcryptjs
- Created JWT token generation and verification

Co-authored-by: Claude AI <claude@anthropic.com>
```

#### 3. **Frontend Development** 
 - **My contribution**: 

  - Generated complete component structures for Login, Register, Dashboard, and AdminPanel
  - Created responsive CSS with modern design patterns
  - Implemented axios interceptors for token management
  - Customized UI/UX based on personal preferences
  - Modified color schemes and styling to match brand identity
  - Added additional user feedback mechanisms (loading states, error messages)

**Example Commits:**
```
feat: Implement Dashboard with search and filter
- Created sweet card component with purchase functionality
- Added search, category filter, and price range filters
- Implemented responsive grid layout

Co-authored-by: Claude AI <claude@anthropic.com>
```

#### 4. **Testing & Quality Assurance** 
- **What I did**: Asked Claude to help write unit tests and integration tests
- **AI contribution**: 
  - Generated test cases for authentication endpoints
  - Created mock data and test utilities
  
- **My contribution**: 
  - Added edge case tests based on real-world scenarios
  - Debugged failing tests and improved test coverage
  - Wrote custom test helpers for database seeding

#### 5. **Documentation** 
- **What I did**: Used Claude to draft README, API documentation, and code comments
- **AI contribution**: 
  - Created comprehensive README structure
  - Generated API endpoint documentation with examples

- **My contribution**: 
  - Added project-specific details and screenshots
  - Personalized "My AI Usage" section with honest reflection
  - Proofread and edited for clarity
  - Provided clear installation and setup instructions

#### 6. **Debugging & Problem Solving** 
- **What I did**: Consulted Claude when encountering errors or bugs
- **AI contribution**: 
  - Helped diagnose CORS issues between frontend and backend
  - Suggested solutions for MongoDB connection problems
  - Provided debugging strategies for React state management
- **My contribution**: 
  - Implemented fixes and verified solutions worked correctly
  - Tested edge cases to ensure bugs were fully resolved
  - Learned from explanations to avoid similar issues in future

### Reflection on AI Impact

#### Positive Impacts:
1. **Accelerated Development**: AI helped me complete the project 2-3x faster than coding from scratch
2. **Learning Opportunity**: Claude's explanations helped me understand concepts like JWT authentication and React hooks better
3. **Code Quality**: AI suggested best practices and design patterns I wasn't familiar with
4. **Reduced Boilerplate**: Generated repetitive code (models, routes, components) allowing me to focus on business logic
5. **Documentation**: Created professional, comprehensive documentation that I would have rushed otherwise

#### Challenges & Limitations:
1. **Over-reliance Risk**: Had to be careful not to blindly accept AI suggestions without understanding
2. **Context Limitations**: Sometimes AI-generated code needed significant modifications to fit exact requirements
3. **Testing Understanding**: While AI wrote test cases, I needed to understand what they were testing
4. **Debugging AI Code**: When AI-generated code had bugs, debugging required understanding the underlying logic

#### What I Learned:
- AI is a powerful **co-pilot**, not a replacement for developer thinking
- Best results come from **iterative collaboration** - asking follow-up questions and refining outputs
- **Critical thinking** is essential - I validated all AI suggestions against project requirements
- **Transparency** in AI usage builds trust and demonstrates professional integrity

#### My Approach:
I treated Claude AI as a **senior developer mentor** who provides guidance, code reviews, and suggestions. I made all final decisions, understood every line of code before committing, and took responsibility for the final implementation.



📸 Screenshots
1. Login Page
   screenshots\LoginPage.png
2. SignUp Page
   screenshots\Register.png
3.Dashboard
  screenshots\Dashboard (2).png
4.Purchase Sweets
  screenshots\Purchase_sweets.png
  screenshots\purchaseSweets.png
5.Search filter
 screenshots\Search_filter1.png
 screenshots\SearchByCategory.png
 screenshots\SearchByCategory(2).png

6. Clear_filter
   screenshots\ClearFilters.png

ADMIN
1. Admin Panel
   screenshots\AdminPanel (2).png
2.Edit_Sweets
   screenshots\Edit_Sweets.png
3.Add_Sweets
   screenshots\add_sweets.png
   
4. Restock Sweets
   screenshots\Restock.png
   screenshots\Restocked_successfully.png
   screenshots\Restocked.png
6. Delete_Operations
   screenshots\Delete_operations.png
   screenshots\Deleted.png
   screenshots\Final.png
   
  
  
  
  
  
   






## 📁 Project Structure

```
sweet-shop-management/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Sweet.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── sweets.js
│   ├── middleware/
│   │   └── auth.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── sweets.test.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AdminPanel.js
│   │   │   └── SweetCard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .gitignore
│   └── package.json
│
├── screenshots/
├── README.md
└── .gitignore
```

## 🚀 Future Enhancements

- [ ] Add payment gateway integration
- [ ] Implement order history for users
- [ ] Add email notifications for low stock alerts
- [ ] Create analytics dashboard for admins
- [ ] Implement cart functionality
- [ ] Add product reviews and ratings
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export inventory reports (PDF/Excel)
- [ ] Real-time stock updates using WebSockets

## 👨‍💻 Developer

**Your Name**
- GitHub: https://github.com/pritha-012
- Email: prithadas976@gmail.com


## 🙏 Acknowledgments

- Special thanks to Claude AI (Anthropic) for development assistance
- MongoDB documentation for database guidance
- React and Express.js communities for excellent documentation
- Unsplash for free stock images

---

**Made with ❤️ and 🍬 for Inquibity Assessment**
