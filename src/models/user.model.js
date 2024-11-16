'use strict'

import { model, Schema } from "mongoose"

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const usersSchema = new Schema({
  usr_first_name: { type: String, default: '' },
  usr_last_name: { type: String, default: '' },
  usr_password: { type: String, require: true },
  usr_email: { type: String, require: true },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, usersSchema)
