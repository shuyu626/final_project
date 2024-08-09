import { Router } from 'express'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
// import admin from '../middlewares/admin.js'
import { create, getAll, getId, getFind, getShare } from '../controllers/material.js'

const router = Router()

// 請求進來 > 經過jwt認證 > 新增活動
router.post('/', auth.jwt, upload, create)
router.get('/find', getFind)
router.get('/share', getShare)
router.get('/', getAll)
// 請求進來 > 經過jwt認證 > 判斷是不是管理員 > 取得全部的資料
router.get('/all', auth.jwt, getAll)

router.get('/:id', getId)
// 更新指定id的商品 > 經過jwt認證 > 判斷是不是管理員 > 編輯可能會換圖片所以要upload > 編輯
// router.patch('/:id', auth.jwt, upload, edit)

export default router
