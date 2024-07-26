import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// 使用者創建帳號
export const create = async (req, res) => {
  try {
    // 資料庫中建立使用者資料
    await User.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 取得第一個錯誤的鍵
      const key = Object.keys(error.errors)[0]
      // 取得錯誤訊息
      const message = error.errors[key].message
      // 返回狀態碼 400 (Bad Request) 和錯誤訊息
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號已註冊'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
// 確保使用者在成功登入後能夠獲得一個有效的 JWT token 用於後續的身份驗證
export const login = async (req, res) => {
  try {
    // 使用 JWT 簽署 token，包含使用者的 _id
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 將生成的 token 加入使用者的 tokens 屬性中
    req.user.tokens.push(token)
    // 將使用者物件保存到資料庫中，包括更新後的 tokens 屬性
    await req.user.save()
    // 返回成功的 HTTP 狀態碼和包含使用者資訊的 JSON 回應
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // req.user包含已驗證的使用者資訊
      result: {
        token, // 返回生成的 token
        username: req.user.username, // 返回服務名稱
        role: req.user.role, // 返回使用者的角色
        cart: req.user.cartQuantity // 返回使用者的購物車數量（假設有這個屬性）
      }
    })
    // 如果發生任何錯誤，返回內部伺服器錯誤的 HTTP 狀態碼和錯誤訊息
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// token 舊換新
export const extend = async (req, res) => {
  try {
    // 找到當前使用的 token 在 tokens 陣列中的索引
    const idx = req.user.tokens.findIndex(token => token === req.token)
    // 簽新的，簽發一個新的 JWT token，並設置有效期為 7 天
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 更新使用者 tokens 陣列中的對應索引位置的 token
    req.user.tokens[idx] = token
    // 將更新後的使用者資訊保存到資料庫
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: token
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// 讓已經驗證的使用者取得自己的基本資料
export const profile = (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        role: req.user.role,
        cart: req.user.cartQuantity
      }
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// 使用者請求登出時，會將該使用者的當前 token 從資料庫中移除
export const logout = async (req, res) => {
  try {
    //  過濾掉當前使用的 JWT token
    // req.token 可以獲取到當前的 JWT token
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    // 將更新後的使用者資訊保存到資料庫
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
