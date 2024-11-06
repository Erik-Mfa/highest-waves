const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { login } = require('../../controllers/AuthController')

jest.mock('axios')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
jest.mock('../../models/User') // Mock the User model

describe('User Login API', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        email: 'testuser@example.com',
        password: 'password123'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn()
    }

    // Mock bcrypt compare to return true for a correct password match
    bcrypt.compare.mockResolvedValue(true)

    // Mock a found user response
    User.findOne.mockResolvedValue({
      id: 2,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedPassword123',
      role: 'customer'
    })

    // Mock jwt.sign to return a token
    jwt.sign.mockReturnValue('fake-jwt-token')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should login a user successfully', async () => {
    await login(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' })
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123')
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 2, role: 'customer', username: 'testuser' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
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

  it('should return an error if the user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null) // Simulate no user found

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User not found'
    })
  })

  it('should return an error if the password does not match', async () => {
    bcrypt.compare.mockResolvedValue(false) // Simulate password mismatch

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
      message: 'Database error'
    })
  })
})
