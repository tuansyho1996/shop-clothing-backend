'use strict'
import JWT from 'jsonwebtoken'
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '30 days'
    })
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '60 days'
    })
    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.error('error verify::', error)
      } else {
        console.log('decode verify::', decode)
      }
    })
    return {
      accessToken, refreshToken
    }
  } catch (error) {
    return error.message
  }
}

export {
  createTokenPair,
}