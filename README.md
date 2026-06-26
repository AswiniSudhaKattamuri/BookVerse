# 📚 BookVerse Backend

##  Project Overview

BookVerse Backend is a RESTful API built using the **MERN Stack** (Node.js, Express.js, MongoDB, and Mongoose). It powers an online bookstore with secure authentication, role-based authorization, book management, wishlist, shopping cart, and order management features.

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* dotenv
* CORS

---

# 📂 Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Token Generation
* Protected Routes
* User Profile

## 👨‍💼 Authorization

* Role-based Access Control
* Admin-only Book Management

## 📚 Books

* Add Book (Admin)
* Get All Books
* Get Book by ID
* Update Book (Admin)
* Delete Book (Admin)
* Search Books by Title
* Filter Books by Category

## ❤️ Wishlist

* Add Book to Wishlist
* View Wishlist
* Remove Book from Wishlist

## 🛒 Shopping Cart

* Add Book to Cart
* View Cart
* Update Quantity
* Remove Book from Cart

## 📦 Orders

* Place Order
* View Order History

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login user                 |
| GET    | `/api/auth/profile`  | Get logged-in user profile |

---

## Books

| Method | Endpoint                                    | Description              |
| ------ | ------------------------------------------- | ------------------------ |
| GET    | `/api/books`                                | Get all books            |
| GET    | `/api/books/:id`                            | Get book by ID           |
| GET    | `/api/books/search/title?title=value`       | Search books by title    |
| GET    | `/api/books/filter/category?category=value` | Filter books by category |
| POST   | `/api/books`                                | Add new book (Admin)     |
| PUT    | `/api/books/:id`                            | Update book (Admin)      |
| DELETE | `/api/books/:id`                            | Delete book (Admin)      |

---

## Wishlist

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/wishlist`         | Add book to wishlist      |
| GET    | `/api/wishlist`         | Get wishlist              |
| DELETE | `/api/wishlist/:bookId` | Remove book from wishlist |

---

## Cart

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/cart`         | Add book to cart      |
| GET    | `/api/cart`         | Get cart              |
| PUT    | `/api/cart/:bookId` | Update cart quantity  |
| DELETE | `/api/cart/:bookId` | Remove book from cart |

---

## Orders

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| POST   | `/api/orders` | Place an order           |
| GET    | `/api/orders` | Get user's order history |

---

# 🔒 Authentication

Protected routes require a JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

# 👨‍💼 Admin Access

The following endpoints require an authenticated user with the `admin` role:

* `POST /api/books`
* `PUT /api/books/:id`
* `DELETE /api/books/:id`

Regular users can browse books, manage wishlists, carts, and place orders but cannot modify the book catalog.

---

# ▶️ Run Locally

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Start the server

```bash
npm start
```

or

```bash
node server.js
```

---

# 📌 Future Enhancements

* Product Reviews & Ratings
* Payment Gateway Integration
* Email Notifications
* Inventory Management
* Admin Dashboard
* Sales Analytics

---

# 👨‍💻 Developed By

**Aswini Sudha**

A full-stack MERN bookstore backend demonstrating secure authentication, role-based authorization, RESTful API design, and e-commerce functionality.
