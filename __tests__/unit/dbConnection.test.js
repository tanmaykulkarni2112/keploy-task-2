const mongoose = require("mongoose");
const connectDB = require("../../config/config");

jest.mock("mongoose", () => ({
  connect: jest.fn()
}));

describe("connectDB", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, MONGO_URI: "mock-uri" };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should connect and log a success message", async () => {
    mongoose.connect.mockResolvedValueOnce();

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mock-uri");
    expect(logSpy).toHaveBeenCalledWith("MongoDB connected successfully.");

    logSpy.mockRestore();
  });

  it("should log error and exit if connection fails", async () => {
    const error = new Error("DB Error");
    mongoose.connect.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mock-uri");
    expect(errorSpy).toHaveBeenCalledWith("MongoDB connection failed:", error.message);
    expect(exitSpy).toHaveBeenCalledWith(1);

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
