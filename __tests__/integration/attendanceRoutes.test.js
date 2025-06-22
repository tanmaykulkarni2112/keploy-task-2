// __tests__/integration/attendanceRoutes.test.js
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const attendanceModel = require("../../model/attendance");
const connectDB = require("../../config/config");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGO_URI = uri;
  await connectDB(); // ✅ Use your existing DB connection logic
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await attendanceModel.deleteMany();
});

describe("Integration: GET /api/attendance", () => {
  it("should return 200 and an array of attendance", async () => {
    await attendanceModel.create([
      { date: "2025-06-01", lectures: 3 },
      { date: "2025-06-02", lectures: 4 }
    ]);

    const res = await request(app).get("/api/attendance");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(Array.isArray(res.body.msg)).toBe(true);
    expect(res.body.msg.length).toBe(2);
  });
});

describe("Integration: POST /api/attendance", () => {
  it("should create a new attendance record", async () => {
    const res = await request(app)
      .post("/api/attendance")
      .send({ date: "2025-06-22", lectures: 3 });

    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("success");

    const records = await attendanceModel.find();
    expect(records.length).toBe(1);
    expect(Number(records[0].lectures)).toBe(3);
  });

  it("should return 400 if date or lectures missing", async () => {
    const res = await request(app).post("/api/attendance").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("date or lecture not specified");
  });
});

describe("Integration: PUT /api/attendance/:id", () => {
  it("should update an existing attendance record", async () => {
    const doc = await attendanceModel.create({
      date: "2025-06-22",
      lectures: 2
    });

    const res = await request(app)
      .put(`/api/attendance/${doc._id}`)
      .send({ date: "2025-06-23", lectures: 4 });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Success");

    const updated = await attendanceModel.findById(doc._id);
    expect(Number(updated.lectures)).toBe(4);
  });

  it("should return 404 for non-existent ID", async () => {
    const res = await request(app)
      .put("/api/attendance/64690b38b66b3c2e8fb70999")
      .send({ date: "2025-06-23", lectures: 4 });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Couldn't update");
  });
});

describe("Integration: DELETE /api/attendance/:id", () => {
  it("should delete an attendance record", async () => {
    const doc = await attendanceModel.create({
      date: "2025-06-22",
      lectures: 2
    });

    const res = await request(app).delete(`/api/attendance/${doc._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Deleteted");

    const exists = await attendanceModel.findById(doc._id);
    expect(exists).toBeNull();
  });

  it("should return 404 if record not found", async () => {
    const res = await request(app).delete("/api/attendance/64690b38b66b3c2e8fb70999");
    expect(res.statusCode).toBe(404);
  });
});
