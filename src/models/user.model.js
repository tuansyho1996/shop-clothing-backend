'use strict'

import { model, Schema } from "mongoose"

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const usersSchema = new Schema({
  usr_address: { type: String, require: true, unique: true },
  usr_first_name: { type: String, default: '' },
  usr_last_name: { type: String, default: '' },
  usr_email: { type: String },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, usersSchema)
