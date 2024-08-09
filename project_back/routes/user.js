import { Router } from 'express'// 從 express 模組中導入 Router 物件
import { create, login, extend, profile, logout, getAll } from '../controllers/user.js'
import * as auth from '../middlewares/auth.js'

const router = Router() // 建立一個新的 Router 實例

router.post('/', create) // 設置路由：當收到 POST 請求發送到根路徑 '/' 時，調用 create 函數來處理該請求
router.post('/login', auth.login, login)
router.patch('/extend', auth.jwt, extend)
router.get('/profile', auth.jwt, profile)
router.get('/', getAll)
router.delete('/logout', auth.jwt, logout)
export default router // 將這個 router 模組導出，以便在其他地方使用
