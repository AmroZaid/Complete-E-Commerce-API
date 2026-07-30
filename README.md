# E-Commerce REST API

A Node.js and Express RESTful API integrated with a PostgreSQL database (hosted on Neon) for managing products, categories, and users. The application includes dynamic input validation, parameterization against SQL injection, complete CRUD operations, and centralized error handling.

---

## Technical Stack

- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL (Neon DB)
- Database Driver: pg (node-postgres)
- Development Tools: nodemon, dotenv, cors

---

## Project Structure

ecommerce-api/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── categoriesController.js
│ │ ├── productsController.js
│ │ └── usersController.js
│ ├── routes/
│ │ ├── categoriesRoutes.js
│ │ ├── productsRoutes.js
│ │ └── usersRoutes.js
│ ├── app.js
│ └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

---

## Environment Configuration

1. Copy `.env.example` to create a new `.env` file in the root directory:
   ```bash
   cp .env.example .env
   Open .env and configure your database connection string and server port:
   ```

Code snippet
PORT=3000
DATABASE_URL=your_neon_postgresql_connection_string
Installation & Setup Steps
Clone the repository:

Bash
git clone [https://github.com/AmroZaid/Complete-E-Commerce-API.git](https://github.com/AmroZaid/Complete-E-Commerce-API.git)
cd Complete-E-Commerce-API
Install project dependencies:

Bash
npm install
Start the application:

Development Mode (with hot reloading):

Bash
npm run dev
Production Mode:

Bash
npm start
API Endpoints Documentation
Server Health Check
GET / - Returns server operational status (200 OK)

Products Endpoints (/api/products)
GET /api/products - Retrieve all products (200 OK)

GET /api/products/:id - Retrieve a single product by ID (200 OK / 404 Not Found)

POST /api/products - Create a new product (201 Created / 400 Bad Request / 409 Conflict)

PUT /api/products/:id - Update an existing product (200 OK / 400 Bad Request / 404 Not Found)

PATCH /api/products/:id/deactivate - Soft-delete/deactivate a product (200 OK / 404 Not Found)

Categories Endpoints (/api/categories)
GET /api/categories - Retrieve all categories (200 OK)

GET /api/categories/:id - Retrieve a category by ID (200 OK / 404 Not Found)

POST /api/categories - Create a new category (201 Created / 400 Bad Request)

PUT /api/categories/:id - Update an existing category (200 OK / 400 Bad Request / 404 Not Found)

Users Endpoints (/api/users)
GET /api/users - Retrieve all users (200 OK)

POST /api/users - Create a new user (201 Created / 400 Bad Request / 409 Conflict)

PATCH /api/users/:id/status - Update user status (200 OK / 400 Bad Request / 404 Not Found)

Error Handling Standards
The API implements strict HTTP status codes:

200 OK - Request succeeded

201 Created - Resource created successfully

400 Bad Request - Validation missing or invalid parameters (e.g., negative price/stock, missing required fields)

404 Not Found - Requested resource or unknown route does not exist

409 Conflict - Duplicate unique fields (e.g., existing SKU or email)

500 Internal Server Error - Unhandled server error caught by global middleware

---

Save both files, commit them to Git, and push to GitHub:

```bash
git add README.md .env.example
git commit -m "Add documentation and environment template"
git push origin main
```
