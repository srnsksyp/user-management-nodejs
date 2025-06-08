# 🧾 User Management App – Node.js, Express, MySQL

A simple **full-stack CRUD application** for managing users using **Node.js**, **Express**, **EJS**, and **MySQL**. This project includes functionality for user **creation**, **editing**, **deletion**, and **listing**.

> 🎯 Focused on backend logic and SQL integration with minimal UI. Created as a learning project to practice backend development.

---

## 🚀 Features

- ✅ Create new users with email, username, and password
- 🔍 View a list of all users
- ✏️ Edit user’s username with password confirmation
- ❌ Delete users securely by verifying email and password
- 📊 Count and display total users on the homepage

---

## 🛠 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **EJS** – Template engine
- **MySQL** – Relational database
- **mysql2** – Node.js MySQL client
- **uuid** – Generate unique IDs
- **faker.js** – Fake data generation
- **method-override** – Enable HTTP verbs like PATCH/DELETE in forms

---

## 📁 Folder Structure
```
📦 user-management-nodejs  
├── views/              # EJS templates  
│   ├── home.ejs  
│   ├── users.ejs  
│   ├── new.ejs  
│   ├── edit.ejs  
│   └── delete.ejs  
├── app.js              # Main server file  
├── package.json        # Dependencies  
└── README.md
```
---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/user-management-nodejs.git
cd user-management-nodejs
```

---

### 2. Install Dependencies

``` npm install ```

---

### 3. Setup MySQL Database
Login to MySQL and run:
```sql 
CREATE DATABASE delta_app;

USE delta_app;

CREATE TABLE user (
  id VARCHAR(100),
  email VARCHAR(100),
  username VARCHAR(100),
  password VARCHAR(100)
);
```

---

### 4. Configure MySQL Connection
In `app.js`, update this section with your credentials:
```js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'delta_app'
});
```
---
### 5. Run the App
```bash
node app.js
```

