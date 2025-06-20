# 📘 Attendance API Documentation

This project is a RESTful API built using **Node.js**, **Express**, and **MongoDB** for managing attendance data.

-----

## ✅ APIs Created and Their Functionality

The API provides standard CRUD (Create, Read, Update, Delete) operations for attendance records. Each record includes a `date` (string) and `lectures` (string), along with auto-generated fields like `_id`, `createdAt`, `updatedAt`, and `__v`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/attendance` | Fetch all attendance records |
| POST | `/api/attendance` | Add a new attendance record |
| PUT | `/api/attendance/:id` | Update an attendance record by ID |
| DELETE | `/api/attendance/:id` | Delete an attendance record by ID |

-----

## 🗃️ Database Used and Integration

### 🔹 Database: **MongoDB**

This API uses **MongoDB** as its database. You can run MongoDB locally or utilize **MongoDB Atlas** for a cloud-hosted solution. **Mongoose** is employed as the ODM (Object Data Modeling) library to interact with MongoDB.

### 🔧 Integration

The MongoDB connection is established in your application, typically in `config/db.js` or directly within `server.js`. The connection URI is sourced from your `.env` file.

```javascript
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
```

-----

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js**
  * **MongoDB** (local or remote instance)
  * A **.env** file in your project root containing your `MONGO_URI`.

### Steps to Run the API

Follow these steps to get the Keploy Attendance API up and running on your local machine:

```bash
# Clone the repository
git clone <your-repo-url>
cd keploy-api

# Install dependencies
npm install

# Create a .env file and add your Mongo URI
echo "MONGO_URI=mongodb://localhost:27017/keploy" > .env

# Start the server
node server.js
```

Upon successful startup, you should see the following message in your console:

```css
listening to port 3000
```

-----

## 📡 How to Interact with the API

Below are examples of how to interact with the API endpoints using sample requests and responses.

### ➕ Add Attendance

To add a new attendance record, send a `POST` request to `/api/attendance`.

**Request Body:**

```json
{
  "date": "11-12-2003",
  "lectures": "3"
}
```

**Successful Response:**

```json
{
  "msg": "Attendance saved",
  "data": {
    "_id": "60d0fe4f7d3a0c001f3e7b1a",
    "date": "11-12-2003",
    "lectures": "3",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  }
}
```

### 📥 Get All Attendance

To retrieve all attendance records, send a `GET` request to `/api/attendance`.

**Successful Response:**

```json
{
  "msg": [
    {
      "_id": "60d0fe4f7d3a0c001f3e7b1a",
      "date": "11-12-2003",
      "lectures": "3",
      "createdAt": "2023-10-27T10:00:00.000Z",
      "updatedAt": "2023-10-27T10:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "60d0fe4f7d3a0c001f3e7b1b",
      "date": "12-12-2003",
      "lectures": "4",
      "createdAt": "2023-10-28T11:00:00.000Z",
      "updatedAt": "2023-10-28T11:00:00.000Z",
      "__v": 0
    }
  ]
}
```

### 📝 Update Attendance

To update an existing attendance record, send a `PUT` request to `/api/attendance/:id`, replacing `:id` with the actual record's ID.

**Request Body:**

```json
{
  "date": "12-12-2003",
  "lectures": "4"
}
```

**Successful Response:**

```json
{
  "msg": "Success",
  "data": {
    "_id": "60d0fe4f7d3a0c001f3e7b1a",
    "date": "12-12-2003",
    "lectures": "4",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-28T11:00:00.000Z",
    "__v": 0
  }
}
```