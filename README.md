
# Vacations Project

A full-stack vacation management web application where users can browse and like vacations, and admins can manage vacations (create, update, delete).

---

## Features

- User registration and login  
- View a list of vacations  
- Like/unlike vacations  
- Admin panel for managing vacations (CRUD operations)  
- Responsive frontend built with React  
- RESTful API backend built with Node.js and Express  
- MySQL database for storing users, vacations, and likes  

---

## Technologies Used

- Frontend: React, JavaScript, CSS  
- Backend: Node.js, Express  
- Database: MySQL  
- Authentication: JWT (JSON Web Tokens)  
- Version Control: Git, GitHub  

---

## Folder Structure

```
Vacations-Project/
│
├── Frontend/       # React app source code  
├── Backend/        # Node.js backend source code  
├── Database/       # SQL scripts for database schema and sample data  
├── README.md       # Project overview and instructions  
└── .gitignore      # Ignored files  
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)  
- MySQL server installed and running  

### Setup Backend

1. Open terminal and navigate to the `Backend` folder:  
   ```bash
   cd Backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` folder with your database credentials and JWT secret. Example:  
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=vacationsdb
   JWT_SECRET=your_jwt_secret
   ```
4. Run the SQL scripts in the `Database` folder to create tables and seed data.  
5. Start the backend server:  
   ```bash
   npm start
   ```

### Setup Frontend

1. Open terminal and navigate to the `Frontend` folder:  
   ```bash
   cd Frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the frontend app:  
   ```bash
   npm start
   ```
4. Open your browser to `http://localhost:4000`.

---

## Usage

- Register or login as a user to browse and like vacations.  
- Login as an admin to add, edit, or delete vacations.

---

## Contributing

Feel free to open issues or submit pull requests.

---

## Contact

Leeran Hsu – [leeranhsu1@gmail.com](mailto:leeranhsu1@gmail.com)  
