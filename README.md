# Attendance API
 This is a Node.js and Express-based API that allows for tracking and managing attendance records with MongoDB as the backend. 
 
 It supports CRUD operations and includes **unit**, **integration**, and **API testing** to ensure robust functionality. 
 --- 
 ## 📦 Tech Stack 
 - **Backend**: Node.js, Express.js 
 - **Database**: MongoDB with Mongoose 
 - **Testing**: Jest, Supertest 
 - **API Testing**: Postman (for manual validation) 
 - **Test Coverage**: Jest Coverage Reports (70%+) 
 --- 
 ## 🚀 Features 
 - Add, update, delete attendance records 
 - Fetch all attendance entries 
 - Proper error handling for missing data or DB failures - Unit tests for controller logic 
 - Integration tests for API routes 
 - API tested using Postman 
 ---
  ## 📂 Folder Structure 
  
  ``` 
├── __tests__/
│   ├── integration/           # Integration tests (Supertest + Jest)
│   │   └── attendanceRoutes.test.js
│   └── unit/                  # Unit tests (Jest)
│       └── attendanceControllers.test.js

```

  ---
   ## 🧪 Running Tests ### Unit + Integration Tests 

   ```bash npm test ``` ### Run with coverage 
   ```bash npm test -- --coverage ``` 
   > 🖼️ Screenshot your coverage report and include it in this README or your GitHub repo. 
   --- 

   ## 📬 API Endpoints 
   ### `GET /api/attendance` 
   Returns all attendance records. ### `POST /api/attendance` Creates a new record. Body: ```json { "date": "2024-01-01", "lectures": 3 } ``` 
   ### `PUT /api/attendance/:id` Updates a specific attendance record.

### `DELETE /api/attendance/:id` Deletes a record by ID. 

--- 

## 🔍 API Testing with Postman 
- All API routes were verified using **Postman**. 
- You can import the collection manually or test endpoints directly using the examples above. 
---
 ## 🛠️ Tools Used 
 - **Jest**: Unit & Integration Testing 
 - **Supertest**: HTTP assertions for Express routes 
 - **Postman**: API Testing - **MongoDB Memory Server (if used)**: For isolation in integration tests 
 ---
  ## 📸 Test Coverage Include a screenshot like this in your repo: ![Coverage Example](./test-img/test-coverage.png)