'use strict'
import userModel from "../models/user.model.js"
import orderModel from "../models/order.model.js"
import bcrypt from 'bcrypt'
import { BadRequestError, AuthFailureError } from "../core/error.response.js"
import { getInfoData } from "../utils/index.js"

class UserService {
  createUser = async (data) => {
    const isUser = await userModel.findOne({ usr_email: data.usr_email })
    if (isUser) {
      throw new BadRequestError('Email already exists, please select another email')
    }
    const hashPassword = await bcrypt.hash(data.usr_password, 10)
    const newUser = await userModel.create({ ...data, usr_password: hashPassword })
    if (newUser) {
      return { user: getInfoData({ filed: ['_id', 'usr_email', 'usr_first_name', 'usr_last_name'], object: newUser }) }
    }
    return null
  }
  login = async (data) => {
    const isUser = await userModel.findOne({ usr_email: data.usr_email })
    if (!isUser) {
      throw new BadRequestError('Email is not exist')
    }
    const match = await bcrypt.compare(data.usr_password, isUser.usr_password)
    if (!match) {
      throw new AuthFailureError('Password is not valid')
    }
    if (isUser) {
      const orders = await orderModel.find({ order_user_id: isUser._id });
      isUser.usr_orders = orders
      return { user: getInfoData({ filed: ['_id', 'usr_email', 'usr_first_name', 'usr_last_name', 'usr_orders'], object: isUser }) }
    }
    return null
  }
  connectUser = async (address) => {
    let user = await userModel.findOne({ usr_address: address })
    if (!user) {
      user = await userModel.create({ usr_address: address })
    }
    return { user: getInfoData({ filed: ['_id', 'usr_email', 'usr_first_name', 'usr_last_name', 'usr_address'], object: user }) }
  }
}

export default new UserService