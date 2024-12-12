const { logout } = require('../../controllers/AuthController')
const httpMocks = require('node-mocks-http') // For mocking the request and response objects

describe('Logout Functionality', () => {
  let req, res

  beforeEach(() => {
    // Create mock request and response objects
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()

    // Manually mock the response methods
    res.clearCookie = jest.fn()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn()
  })

  it('should log the user out successfully and clear the cookie', async () => {
    // Set a mock token in cookies for testing
    req.cookies = { token: 'fake-jwt-token' }

    // Call the logout function
    await logout(req, res)

    // Check that clearCookie was called with the correct cookie name
    expect(res.clearCookie).toHaveBeenCalledWith('token')

    // Check the status code and response message
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful' })
  })

  it('should handle the case when there is no token in the cookies', async () => {
    // Simulate no token in cookies
    req.cookies = {} // No token

    // Call the logout function
    await logout(req, res)

    // Check that clearCookie was not called (because there's no token to clear)
    expect(res.clearCookie).not.toHaveBeenCalled()

    // Check the status code and response message
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful' })
  })
})
