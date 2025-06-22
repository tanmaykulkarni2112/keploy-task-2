const attendanceModel = require('../../model/attendance');
const {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance
} = require('../../controllers/attendanceControllers');

jest.mock('../../model/attendance');

describe('Controller: getAttendance', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should return 200 and attendance list', async () => {
    const fakeData = [
      { date: '2024-01-01', lectures: 2 },
      { date: '2024-01-02', lectures: 3 }
    ];

    attendanceModel.find.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(fakeData)
    });

    await getAttendance(null, res);

    expect(attendanceModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: fakeData });
  });

  it('should return 500 on DB error', async () => {
    attendanceModel.find.mockImplementationOnce(() => ({
      lean: jest.fn().mockRejectedValueOnce(new Error('DB fail'))
    }));

    await getAttendance(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'server error' });
  });
});

describe('Controller: addAttendance', () => {
  let req, res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    req = { body: {} };
    jest.clearAllMocks();
  });

  it('should return 400 if date or lectures are missing', async () => {
    await addAttendance(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "date or lecture not specified"
    });
  });

  it('should save attendance and return 201 on success', async () => {
    req.body = {
      date: "2024-01-01",
      lectures: 3
    };

    const mockSave = jest.fn().mockResolvedValueOnce({});
    attendanceModel.mockImplementation(() => ({
      save: mockSave
    }));

    await addAttendance(req, res);

    expect(attendanceModel).toHaveBeenCalledWith({
      date: "2024-01-01",
      lectures: 3
    });
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ msg: "success" });
  });

  it('should return 500 on DB error', async () => {
    req.body = {
      date: "2024-01-01",
      lectures: 3
    };

    attendanceModel.mockImplementation(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error("DB failed"))
    }));

    await addAttendance(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "server error" });
  });
});

describe('Controller: updateAttendance', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: '123' },
      body: { date: "2024-01-01", lectures: 4 }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should update the attendance and return 200', async () => {
    attendanceModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: '123', date: '2024-01-01', lectures: 4
    });

    await updateAttendance(req, res);

    expect(attendanceModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      { date: '2024-01-01', lectures: 4 },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Success" });
  });

  it('should return 404 if no document found', async () => {
    attendanceModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

    await updateAttendance(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Couldn't update" });
  });

  it('should return 400 on DB error', async () => {
    attendanceModel.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error("DB Error"));

    await updateAttendance(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Couldn't update :(" });
  });
});

describe('Controller: deleteAttendance', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: 'mock-id' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should delete attendance and return 200', async () => {
    attendanceModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce({
      _id: 'mock-id',
      date: '2024-01-01',
      lectures: 2
    });

    await deleteAttendance(req, res);

    expect(attendanceModel.findByIdAndDelete).toHaveBeenCalledWith('mock-id');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Deleteted' });
  });

  it('should return 404 if attendance not found', async () => {
    attendanceModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

    await deleteAttendance(req, res);

    expect(attendanceModel.findByIdAndDelete).toHaveBeenCalledWith('mock-id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('should return 500 on database error', async () => {
    attendanceModel.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error('DB error'));

    await deleteAttendance(req, res);

    expect(attendanceModel.findByIdAndDelete).toHaveBeenCalledWith('mock-id');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error in deletion' });
  });
});
