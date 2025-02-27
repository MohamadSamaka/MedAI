# Backend (Server) README

## Prerequisites
- **Node.js** (v22 or later recommended)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Install Dependencies**  
   ```bash
   npm install
   ```
   This command installs all required libraries and packages defined in `package.json`.

2. **Environment Variables**  
   - Rename the file `.env.example` to `.env`.
   - Open the `.env` file and fill in the required variables (e.g., database connection strings, API keys, etc.).

## Seeding the Database (Optional)
If you have a default seed script defined in the project, you can run:
```bash
npm run seed
```
This will insert some initial data into your database.

## Starting the Server
To start the backend application, use:
```bash
npm run start
```
By default, this will launch the server on the configured port (check your `.env` file or server logs for details).

---

**Thank you for using our Backend (Server) application.**  
If you encounter any issues, please refer to documentation in the code or contact the project maintainers.