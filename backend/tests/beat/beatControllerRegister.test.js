const BeatController = require('../../controllers/BeatController');
const Beat = require('../../models/Beat');
const User = require('../../models/User');
const Tag = require('../../models/Tag');

// Mocking the required modules
jest.mock('../../models/Beat');
jest.mock('../../models/User');
jest.mock('../../models/Tag');

describe('BeatController.save', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: 'Test Beat',
        description: 'A cool beat',
        price: 10,
        bpm: 120,
        tone: 'Major',
        owner: '123', // This should be the ID of the user (assumed string here)
        tags: ['tag1', 'tag2'],
      },
      files: {
        image: [{ filename: 'beat-image.jpg' }],
        audioURL: [{ filename: 'beat-audio.mp3' }],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new beat successfully', async () => {
    // Mocking the database responses
    Beat.findOne.mockResolvedValue(null); // No beats in the database
    User.findOne.mockResolvedValue({ id: '123', username: 'user1' }); // Valid user
    Tag.find.mockResolvedValue([{ id: 'tag1' }, { id: 'tag2' }]); // Valid tags
  
    // Calling the save method
    await BeatController.save(req, res);
  
    // Assertions
    expect(Beat.findOne).toHaveBeenCalledWith({});
    expect(User.findOne).toHaveBeenCalledWith({ id: '123' }); // This should now pass
    expect(Tag.find).toHaveBeenCalledWith({ id: { $in: ['tag1', 'tag2'] } });
    expect(Beat.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should return a 400 error if owner is invalid', async () => {
    // Mocking the database responses
    Beat.findOne.mockResolvedValue(null); // No beats in the database
    User.findOne.mockResolvedValue(null); // Invalid user

    // Calling the save method
    await BeatController.save(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ id: '123' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid owner' });
  });

  it('should return a 400 error if tags are invalid', async () => {
    // Mocking the database responses
    Beat.findOne.mockResolvedValue(null); // No beats in the database
    User.findOne.mockResolvedValue({ id: '123', username: 'user1' }); // Valid user
    Tag.find.mockResolvedValue([]); // No tags found

    // Calling the save method
    await BeatController.save(req, res);

    // Assertions
    expect(Tag.find).toHaveBeenCalledWith({ id: { $in: ['tag1', 'tag2'] } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid tags' });
  });

  it('should return a 400 error if an error occurs during save', async () => {
    // Mocking the database responses
    Beat.findOne.mockResolvedValue(null); // No beats in the database
    User.findOne.mockResolvedValue({ id: '123', username: 'user1' }); // Valid user
    Tag.find.mockResolvedValue([{ id: 'tag1' }, { id: 'tag2' }]); // Valid tags

    // Simulating an error during save
    Beat.prototype.save.mockRejectedValue(new Error('Database error'));

    // Calling the save method
    await BeatController.save(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
