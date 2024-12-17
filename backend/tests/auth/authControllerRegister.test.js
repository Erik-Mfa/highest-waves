const axios = require('axios')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const { register } = require('../../controllers/AuthController')

jest.mock('axios')
jest.mock('bcryptjs', () => ({
  hash: jest.fn() // Mock the bcrypt.hash function
}))
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

    // Mock bcrypt.hash to return a resolved promise
    bcrypt.hash.mockResolvedValue('hashedPassword123')

    // Mock reCAPTCHA verification response
    axios.post.mockResolvedValue({ data: { success: true } })

    // Mock User.findOne to handle the case where User.findOne({}) is used to find the max ID
    User.findOne.mockImplementation((query) => {
      if (Object.keys(query).length === 0) {
        return {
          sort: jest.fn().mockResolvedValue({ id: 1 }) // Mock sorting behavior
        }
      }
      return Promise.resolve(null) // No existing user found
    })

    // Mock User.prototype.save
    User.prototype.save.mockResolvedValue({
      username: 'testuser',
      email: 'testuser@example.com'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register a new user successfully', async () => {
    // Mock CAPTCHA verification request to Google reCAPTCHA API
    axios.post.mockResolvedValue({ data: { success: true } }) // Simulate successful CAPTCHA verification

    // Call the register function
    await register(req, res)

    // Check the user was saved
    expect(User.prototype.save).toHaveBeenCalled()

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.google.com/recaptcha/api/siteverify',
      null, // null body is correct, assuming req.body contains CAPTCHA response
      expect.objectContaining({
        params: expect.objectContaining({
          secret: process.env.CAPTCHA_SECRET,
          response: 'fake-captcha-token' // This should match the token in the mock request
        })
      })
    )

    // Check the response for a successful registration
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: {
        username: 'testuser',
        email: 'testuser@example.com'
      }
    })
  })

  it('should return an error if CAPTCHA verification fails', async () => {
    // Set up mock response to indicate CAPTCHA failure
    axios.post.mockResolvedValue({ data: { success: false } })

    await register(req, res)

    // Check response status and message
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'CAPTCHA verification failed'
    })
  })

  it('should return an error if email already exists', async () => {
    // Simulate email already existing
    User.findOne.mockResolvedValueOnce({ email: 'testuser@example.com' })

    await register(req, res)

    // Check response status and message
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Email already exists'
    })
  })

  it('should return an error if CAPTCHA token is missing', async () => {
    req.body.captchaToken = null // Simulate missing CAPTCHA token

    await register(req, res)

    // Check response status and message
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'CAPTCHA is required'
    })
  })

  it('should return a 500 error if an exception occurs', async () => {
    // Simulate a database error during User.findOne call
    User.findOne.mockImplementation(() => {
      throw new Error('Database error')
    })

    await register(req, res)

    // Check response status and message
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Database error'
    })
  })
})
