import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  img: {
    type: String,
    required: [true, '活動圖片必填']
  },
  title: {
    type: String,
    required: [true, '活動標題必填']
  },
  date: {
    type: Date,
    required: [true, '活動日期必填']
  },
  address: {
    type: String,
    required: [true, '活動地點必填']
  },
  category: {
    type: String,
    required: [true, '活動分類必填'],
    enum: {
      values: ['老人', '兒少', '精神', '身障', '婦女'],
      message: '活動分類錯誤'
    }
  },
  organizer: {
    type: String,
    required: [true, '主辦單位必填']
  },
  description: {
    type: String,
    required: [true, '活動介紹必填']
  },
  user: { // 創建活動的用戶
    type: ObjectId,
    ref: 'users',
    required: true
  }
}, {
  timestamps: true, // 使用者建立時間，會多建立兩個欄位一個是帳號建立時間和更新時間
  versionKey: false // 追蹤版本
})

export default model('events', schema)
