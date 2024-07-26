import { Schema, ObjectId, model } from 'mongoose'
const schema = new Schema({
  user: { // 留言的用戶
    type: ObjectId,
    ref: 'users',
    required: true
  },
  material: { // 在哪個物資留言
    type: ObjectId,
    ref: 'materials',
    required: true
  },
  content: {
    type: String,
    required: [true, '留言內容必填']
  }
})
export default model('comments', schema)
