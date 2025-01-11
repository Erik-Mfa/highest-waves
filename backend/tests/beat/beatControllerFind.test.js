const Beat = require('../../models/Beat')
const BeatController = require('../../controllers/BeatController')

jest.mock('../../models/Beat')

describe('BeatController.find', () => {
  let req, res

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    // Mock the Beat model methods
    const mockPopulate = jest.fn().mockReturnThis() // Allows chaining
    Beat.find.mockReturnValue({
      populate: mockPopulate.mockReturnValue({
        populate: jest.fn().mockResolvedValue([
          { _id: '1', name: 'Beat 1', owner: 'Owner 1', tags: ['Tag 1'] },
          { _id: '2', name: 'Beat 2', owner: 'Owner 2', tags: ['Tag 2'] }
        ])
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all beats with populated owner and tags', async () => {
    await BeatController.find(req, res)

    expect(Beat.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([
      { _id: '1', name: 'Beat 1', owner: 'Owner 1', tags: ['Tag 1'] },
      { _id: '2', name: 'Beat 2', owner: 'Owner 2', tags: ['Tag 2'] }
    ])
  })

  it('should return a 500 error if an exception occurs', async () => {
    // Simulate an error
    Beat.find.mockImplementation(() => {
      throw new Error('Database error')
    })

    await BeatController.find(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
  })
})
