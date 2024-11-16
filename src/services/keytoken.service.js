'use strict'

import keytokenModel from "../models/keytoken.model.js"

class KeyTokenService {
  createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    const filter = { user: userId }, update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken }, option = { upsert: true, new: true }
    const token = await keytokenModel.findOneAndUpdate(filter, update, option)
    return token ? token.publicKey : null
  }
}

export default new KeyTokenService