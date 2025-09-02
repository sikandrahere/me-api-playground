# Me-API Playground 

A full-stack web application for managing and showcasing personal profile information through a RESTful API. This project demonstrates CRUD operations, query filtering, and search functionality for a candidate profile system.

## Project Overview

This playground application allows users to:
- Create, read, update, and delete personal profile information
- Manage projects, work experience, and skills
- Query and search through profile data
- Interact with data through both API endpoints and a web interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **HTML/CSS/JavaScript** - Core web technologies

##  Project Structure

The project is structured as follows:

```bash
./
├── client
│   ├── public
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json  
│   └── vite.config.js
├── server
│   ├── src
│   │   ├── app.js
│   │   ├── db
│   │   ├── models
│   │   ├── routes
│   └── package.json
├── readme.md
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/sikandrahere/me-api-playground
```

2. **Navigate to the project directory**

```bash
cd me-api-playground
```

3. **Install dependencies for the client**

```bash
cd client
npm install
```

4. **Install dependencies for the server**

```bash
cd ../server
npm install
```
5. **make .env file in server directory**

```bash
touch .env
```

6. **Copy the contents in .env**

```bash
DB_URL=
DB_NAME=
```
7. **Start the development servers**

```bash
npm run dev
```

### Endpoints

#### Profile Management
- **GET** `/` - Retrieve profile
- **POST** `/` - Create/Update profile
- **PUT** `/` - Update profile (atomic)
- **DELETE** `/` - Delete profile

#### Query & Search
- **GET** `/projects?skill=javascript` - Filter projects by skill
- **GET** `/skills/top` - Get top 3 skills
- **GET** `/search?q=react` - Search projects and skills
- **GET** `/health` - Health check

### Data Schema

```json
{
"name": "John Doe",
"email": "john@example.com",
"education": "Computer Science",
"skills": ["JavaScript", "React", "Node.js"],
"projects": [
{
"title": "Portfolio Website",
"description": "Personal portfolio built with React",
"links": ["https://github.com/john/portfolio"]
}
],
"work": [
{
"company": "Tech Corp",
"role": "Developer",
"start": "2023-01",
"end": "2024-01"
}
],
"links": {
"linkedin": "https://linkedin.com/johndoe",
"github": "https://github.com/johndoe",
"portfolio": "https://johndoe.com"
}
}
```

##  Features

### Core Functionality
-  **Full CRUD Operations** - Create, read, update, delete profile data
-  **Dynamic Arrays** - Manage multiple projects and work experiences
-  **Query Filtering** - Filter projects by skills
-  **Search Functionality** - Search across projects and skills (case-insensitive)
-  **Health Monitoring** - API health check endpoint

### User Interface
-  **Profile Management** - Easy-to-use forms for editing
-  **Dynamic Forms** - Add/remove projects and work experiences
-  **Search Interface** - Interactive search and query tools
-  **Responsive Design** - Works on different screen sizes

### Technical Features
-  **RESTful API Design** - Follows REST principles
- **Data Validation** - Mongoose schema validation
-  **Error Handling** - Proper error responses
- **CORS Enabled** - Cross-origin requests supported

##  Deployment

The project is deployed on Vercel and can be accessed at [https://me-api-playground.vercel.app/](https://me-api-playground.vercel.app/).



