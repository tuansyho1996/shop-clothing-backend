'use strict'

import { model, Schema } from "mongoose"

const DOCUMENT_NAME = 'Review'

const usersSchema = new Schema({
    review_usr_id: { type: Schema.Types.ObjectId },
    review_usr_name: { type: String, default: '' },
    review_usr_email: { type: String, require: true },
    review_content: { type: String, require: true },
    review_rating: { type: Number, require: true },
    review_product_id: { type: Schema.Types.ObjectId, require: true },
    review_media: { type: String, default: '' },
    review_status: { type: String, default: 'pending' },
}, {
    timestamps: true,
})

export default model(DOCUMENT_NAME, usersSchema)
