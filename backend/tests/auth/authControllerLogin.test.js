const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../../models/User')
const { login } = require('../../controllers/AuthController')

jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
jest.mock('axios') // Mock axios globally
jest.mock('../../models/User') // Mock the User model

describe('User Login API', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        email: 'testuser@example.com',
        password: 'password123',
        captchaToken: 'fake-captcha-token'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn()
    }

    // Mock bcrypt.compare to return true for correct password
    bcrypt.compare.mockResolvedValue(true)

    // Mock User.findOne to return a user object
    User.findOne.mockResolvedValue({
      id: 2,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedPassword123',
      role: 'customer'
    })

    // Mock jwt.sign to return a token
    jwt.sign.mockReturnValue('fake-jwt-token')

    // Mock axios.post to simulate CAPTCHA verification success
    axios.post.mockResolvedValue({ data: { success: true } })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should login a user successfully', async () => {
    await login(req, res)

    // Verify CAPTCHA request is sent
    expect(axios.post).toHaveBeenCalledWith(
      'https://www.google.com/recaptcha/api/siteverify',
      null, // null body is correct
      expect.objectContaining({
        params: expect.objectContaining({
          secret: process.env.CAPTCHA_SECRET,
          response: 'fake-captcha-token'
        })
      })
    )

    // Check other assertions for successful login
    expect(User.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' })
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      'hashedPassword123'
    )
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 2, role: 'customer', username: 'testuser' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    expect(res.cookie).toHaveBeenCalledWith('jwt_token', 'fake-jwt-token', {
      httpOnly: true
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      token: 'fake-jwt-token'
    })
  })

  it('should return an error if CAPTCHA verification fails', async () => {
    // Set up mock response to indicate CAPTCHA failure
    axios.post.mockResolvedValue({ data: { success: false } })

    await login(req, res)

    // Check response status and message
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'CAPTCHA verification failed'
    })
  })

  it('should return an error if the user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null) // Simulate no user found

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User not found'
    })
  })

  it('should return an error if the password does not match', async () => {
    bcrypt.compare.mockResolvedValueOnce(false) // Simulate password mismatch

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid credentials'
    })
  })

  it('should return a 500 error if an exception occurs', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('Database error')
    })

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Database error' // Matching the actual error message
    })
  })
})
