import { Schema, ObjectId, model } from 'mongoose'

const schema = new Schema({
  user: {
    type: ObjectId,
    ref: 'users',
    required: true
  },
  event: {
    type: ObjectId,
    ref: 'events',
    required: true
  }
}, {
  timestamps: true, // 使用者建立時間，會多建立兩個欄位一個是帳號建立時間和更新時間
  versionKey: false // 追蹤版本
})

export default model('eventmarks', schema)
