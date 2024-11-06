const axios = require('axios')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const { register } = require('../../controllers/AuthController')

jest.mock('axios')
jest.mock('bcryptjs', () => ({
  hash: jest.fn() // Mock the bcrypt.hash function
}));
jest.mock('../../models/User') // Mock the User model

describe('User Registration API', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        captchaToken: 'fake-captcha-token'
      },
      file: {
        filename: 'profile.png'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    bcrypt.hash.mockResolvedValue('hashedPassword123') // Mock bcrypt hashing
    axios.post.mockResolvedValue({ data: { success: true } }) // Mock reCAPTCHA verification response

    // Mock User.findOne to handle the sort chain
    User.findOne.mockImplementation((query) => {
      if (Object.keys(query).length === 0) {
        // Handle the case where User.findOne({}) is called to find the max ID
        return {
          sort: jest.fn().mockResolvedValue({ id: 1 }) // Mock sorting behavior
        }
      }
      return Promise.resolve(null) // Otherwise, no existing user found
    })

    User.prototype.save.mockResolvedValue({
      username: 'testuser',
      email: 'testuser@example.com',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register a new user successfully', async () => {
    await register(req, res)

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(User.prototype.save).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: {
        username: 'testuser',
        email: 'testuser@example.com',
      }
    })
  })

  it('should return an error if CAPTCHA verification fails', async () => {
    axios.post.mockResolvedValue({ data: { success: false } })

    await register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'CAPTCHA verification failed'
    })
  })

  it('should return an error if email already exists', async () => {
    User.findOne.mockResolvedValueOnce({ email: 'testuser@example.com' })

    await register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Email already exists'
    })
  })

  it('should return an error if CAPTCHA token is missing', async () => {
    req.body.captchaToken = null

    await register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'CAPTCHA is required'
    })
  })

  it('should return a 500 error if an exception occurs', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('Database error')
    })

    await register(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Database error'
    })
  })
})
