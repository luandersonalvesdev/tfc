const validEmail = 'jorel@email.com'
const validUsername = 'jorel'
const validPassword = '1234567'
const invalidPassword = '12345'

export const validToken = 'validToken'
export const invalidToken = 'invalidToken'

export const userMockWithPassword = {
  id: 1,
  email: validEmail,
  username: validUsername,
  role: 'admin',
  password: validPassword,
}

export const userMockWithoutPassword = {
  id: 1,
  email: validEmail,
  username: validUsername,
  role: 'admin',
}

export const validLoginMock = {
  email: validEmail,
  password: validPassword,
}

export const validLoginMockWithWrongPass = {
  email: validEmail,
  password: validPassword,
}

export const invalidLoginMock = {
  password: validPassword,
}

export const validReturnPayload = {
  id: 1,
  email: validEmail,
  username: validUsername,
  role: 'admin',
}