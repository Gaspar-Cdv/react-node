import { User } from '@prisma/client'
import chai from 'chai'
import { JWT_EXPIRATION_TIME } from '../../src/config/environment'
import AuthService from '../../src/services/authService'

const authService = AuthService.getService()
const { expect } = chai

describe('authService', () => {
  it('should verify if email is valid', () => {
    const correctEmails = [
      'test@test.com',
      'test.test@test.com',
      'test@test.test.com',
      'test-test@test.com',
      'test@test-test.com',
      'test123@test.com',
      'test@test123.com',
      'TEST@test.com',
      'test@TEST.com',
      'test@test.COM'
    ]

    const incorrectEmails = [
      'test',
      'test@test',
      'test.com',
      '@test.com',
      'test@.com',
      'test@test.',
      '.test@test.com',
      '-test@test.com',
      'test.@test.com',
      'test-@test.com',
      'test@.test.com',
      'test@-test.com',
      'test@test..com',
      'test@test-.com',
      'test@test.-com',
      'test@test.com.',
      'test@test.com-',
      'test@test@test.com'
    ]

    const toDispatch = [ // TODO are these emails valid?
      '123@test.com',
      'test@123.com',
      'test@test.123'
    ]

    expect(correctEmails.every(email => authService.isEmailValid(email))).to.be.true
    expect(incorrectEmails.every(email => !authService.isEmailValid(email))).to.be.true
  })

  it('should verify if password is strong enough', () => {
    const softCorrectPasswords = [
      'abcABC123',
      'abcABC.!?',
      'abc123.!?',
      'ABC123.!?',
      'abAB12.!?'
    ]

    const hardCorrectPasswords = [
      'abcABC123.!?'
    ]

    const incorrectPasswords = [
      'abcdefgh',
      'ABCDEFGH',
      '12345678',
      '.!?@/-_()',
      'abcdABCD',
      'abcd1234',
      'abcd.!?@',
      'ABCD1234',
      'ABCD.!?@',
      '1234.!?@',
      'abAB12!'
    ]

    expect(softCorrectPasswords.every(password => authService.isPasswordStrongEnough(password))).to.be.true
    expect(hardCorrectPasswords.every(password => authService.isPasswordStrongEnough(password))).to.be.true
    expect(incorrectPasswords.every(password => !authService.isPasswordStrongEnough(password))).to.be.true

    expect(hardCorrectPasswords.every(password => authService.isPasswordStrongEnough(password, true))).to.be.true
    expect(softCorrectPasswords.every(password => !authService.isPasswordStrongEnough(password, true))).to.be.true
    expect(incorrectPasswords.every(password => !authService.isPasswordStrongEnough(password, true))).to.be.true
  })

  it('should generate, decode and verify token', () => {
    const user: User = {
      userId: 1,
      username: 'test',
      email: 'test@test.com',
      password: null,
      createdAt: null
    }

    const token = authService.generateToken(user)
    const payload = authService.extractPayloadFromToken(token)

    expect(authService.isTokenValid(token)).to.be.true
    expect(authService.isTokenValid(token + 'a')).to.be.false
    expect(payload.userId).to.equal(user.userId)
    expect(payload.username).to.equal(user.username)
    expect(payload.email).to.equal(user.email)
    expect(payload.exp).to.equal(payload.iat + JWT_EXPIRATION_TIME)
  })
})
