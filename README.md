# Dellas Cowboy - E-commerce Project

Dellas Cowboy is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Designed for fashion enthusiasts, it specializes in selling a wide range of stylish dresses. The platform offers a seamless shopping experience with user-friendly navigation, secure authentication, a shopping cart, and integrated payment processing. Built for scalability and performance, Dellas Cowboy ensures a modern and engaging online shopping experience.


## Installation 
1. **Clone the repository:** 
```
bash git clone <repository-url> 
cd <repository-name> 
```

2. **Install Backend Dependencies**:

    `cd Server` 
Run `npm i` to install the project dependencies.
```bash
npm i
```
## Environment Configuration
Create a .env file in the root directory of the project. Here is an example configuration:
```
ADMIN_EMAIL = admin@gmail.com
ADMIN_PASSWORD = password
PORT=4000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabase
JWT_SECRET=yourjwtsecret

```
Replace the placeholders with your actual database credentials and JWT secret.

## Database Setup
 **Create a MySQL database:**

Use the MySQL command line or a tool like phpMyAdmin to create a new database.
```
CREATE DATABASE yourdatabase;
```
Update your .env file with the database connection details.

## Running the Server
**Start the development server:**

Run `npm run dev` to start the server using ts-node-dev.
```
npm run dev
```
Navigate to http://localhost:4000/ to access the server.





