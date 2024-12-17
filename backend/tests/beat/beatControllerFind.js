const Beat = require('../models/Beat')
const BeatController = require('../controllers/BeatController')
const User = require('../models/User')
const Tag = require('../models/Tag')

jest.mock('../models/Beat') // Mock the Beat model
jest.mock('../models/User') // Mock the User model
jest.mock('../models/Tag')  // Mock the Tag model

describe('BeatController.find', () => {
  let req, res, beatController

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    beatController = new BeatController()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all beats with populated owner and tags', async () => {
    // Mock data
    const mockBeats = [
      {
        _id: '1',
        title: 'Beat 1',
        owner: { _id: '1', username: 'User1' },
        tags: [{ _id: '1', name: 'HipHop' }]
      },
      {
        _id: '2',
        title: 'Beat 2',
        owner: { _id: '2', username: 'User2' },
        tags: [{ _id: '2', name: 'Trap' }]
      }
    ]

    // Mock Beat.find().populate()
    Beat.find.mockImplementation(() => ({
      populate: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue(mockBeats)
    }))

    // Call the find method
    await beatController.find(req, res)

    // Assertions
    expect(Beat.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockBeats)
  })

  it('should return a 500 error if an exception occurs', async () => {
    // Mock an error in Beat.find
    Beat.find.mockImplementation(() => ({
      populate: jest.fn().mockReturnThis(),
      populate: jest.fn().mockRejectedValue(new Error('Database error'))
    }))

    // Call the find method
    await beatController.find(req, res)

    // Assertions
    expect(Beat.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
  })
})
