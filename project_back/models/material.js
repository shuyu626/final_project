import { Schema, ObjectId, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '物品名稱必填']
  },
  img: {
    type: String,
    required: [true, '物品圖片必填']
  },
  quantity: {
    type: Number,
    required: [true, '物品數量必填'],
    min: [1, '物品數量不符']
  },
  category: {
    type: String,
    required: [true, '物品分類必填'],
    enum: {
      values: ['食品', '服飾配件', '日用品', '家具', '輔具', '教育用品', '嬰幼兒用品', '休閒用品'],
      message: '物品分類錯誤'
    }
  },
  description: {
    type: String,
    required: [true, '活動介紹必填']
  },
  user: { // 發布物資貼文的用戶
    type: ObjectId,
    ref: 'users',
    required: true
  }
})

export default model('materials', schema)
