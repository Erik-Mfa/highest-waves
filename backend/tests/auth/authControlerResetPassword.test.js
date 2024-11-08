const { forgot, reset } = require('../../controllers/AuthController');
const httpMocks = require('node-mocks-http');
const User = require('../../models/User'); // Assuming your User model is here
const crypto = require('crypto');
const nodemailer = require('nodemailer');

jest.mock('../../models/User');
jest.mock('crypto');
jest.mock('nodemailer');

describe('Forgot and Reset Password Functionality', () => {
  let req, res, userMock, transporterMock, sendMailMock;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    res.status = jest.fn(() => res);
    res.json = jest.fn();

    // Mock user data
    userMock = {
      email: 'test@example.com',
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock transporter
    sendMailMock = jest.fn();
    transporterMock = {
      sendMail: sendMailMock
    };
    nodemailer.createTransport.mockReturnValue(transporterMock);
  });

  describe('Forgot Password', () => {
    it('should send a password reset email if user exists', async () => {
      req.body = { email: 'test@example.com' };
      User.findOne.mockResolvedValue(userMock);

      // Mock crypto
      const mockResetToken = 'fakeResetToken';
      crypto.randomBytes.mockReturnValue(Buffer.from(mockResetToken));

      await forgot(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(userMock.save).toHaveBeenCalled();
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(transporterMock.sendMail).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset email sent' });
    });

    it('should return 400 if user is not found', async () => {
      req.body = { email: 'nonexistent@example.com' };
      User.findOne.mockResolvedValue(null);

      await forgot(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('Reset Password', () => {
    it('should reset the password if token is valid', async () => {
      req.params = { token: 'validToken' };
      req.body = { password: 'newPassword' };
      userMock.resetToken = 'validToken';
      userMock.resetTokenExpiry = Date.now() + 3600000; // Valid for 1 hour
      User.findOne.mockResolvedValue(userMock);

      await reset(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        resetToken: 'validToken',
        resetTokenExpiry: { $gt: expect.any(Number) }
      });
      expect(userMock.save).toHaveBeenCalled();
      expect(userMock.password).toEqual('newPassword');
      expect(userMock.resetToken).toBeNull();
      expect(userMock.resetTokenExpiry).toBeNull();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password has been reset' });
    });

    it('should return 400 if token is invalid or expired', async () => {
      req.params = { token: 'invalidToken' };
      User.findOne.mockResolvedValue(null);

      await reset(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        resetToken: 'invalidToken',
        resetTokenExpiry: { $gt: expect.any(Number) }
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
    });
  });
});
