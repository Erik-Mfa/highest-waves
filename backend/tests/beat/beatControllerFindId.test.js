const Beat = require('../../models/Beat')
const BeatController = require('../../controllers/BeatController')

jest.mock('../../models/Beat')

describe('BeatController.findById', () => {
  let req, res

  beforeEach(() => {
    req = {
      params: {
        id: '12345'
      }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    // Mock the Beat model methods
    const mockPopulate = jest.fn().mockReturnThis() // Allows chaining
    Beat.findOne.mockReturnValue({
      populate: mockPopulate.mockReturnValue({
        populate: jest.fn().mockResolvedValue({ _id: '12345', name: 'Beat 1', owner: 'Owner 1', tags: ['Tag 1'] })
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a beat by ID with populated owner and tags', async () => {
    await BeatController.findById(req, res)

    expect(Beat.findOne).toHaveBeenCalledWith({ id: '12345' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ _id: '12345', name: 'Beat 1', owner: 'Owner 1', tags: ['Tag 1'] })
  })

  it('should return a 404 error if beat not found', async () => {
    // Simulate no beat found
    Beat.findOne.mockResolvedValue(null)

    await BeatController.findById(req, res)

    expect(Beat.findOne).toHaveBeenCalledWith({ id: '12345' })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Beat not found' })
  })

  it('should return a 500 error if an exception occurs', async () => {
    // Simulate an error
    Beat.findOne.mockImplementation(() => {
      throw new Error('Database error')
    })

    await BeatController.findById(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
  })
})
