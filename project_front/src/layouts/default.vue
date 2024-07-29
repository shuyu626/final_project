<template>
  <v-navigation-drawer v-if="mobile" v-model="drawer" color="primary" class="b-1">
    <v-list nav>
      <v-list-item
      v-for="item in navItems" 
      :key="item.to"
      :prepend-icon="item.icon" 
      :to="item.to"
      :title="item.text" 
      :active="false"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>


  <v-dialog v-model="dialogOpen" persistent width="600">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <!-- Dialog 的內容 -->
      <v-card class=" px-6 bg-grey-lighten-3 b-1" >
        <v-card-title class="mt-5 text-center">
          <v-btn width="250" height="50" variant="plain" :class="{ 'active-btn': isRegistering }" @click="toggleForm(true)">註冊</v-btn>
          <v-btn width="250" height="50" variant="plain" :class="{ 'active-btn': !isRegistering }" @click="toggleForm(false)">登入</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text >
          <!-- <template > -->
            <v-text-field v-if="isRegistering"
            label="服務單位"
            minlength="3"
            maxlength="20"
            variant="outlined"
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            counter>
            </v-text-field>
            <v-text-field 
            label="公務信箱"
            type="email"
            variant="outlined"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            >
            </v-text-field>
            <v-text-field
            label="密碼"
            type="password"
            minlength="6"
            maxlength="20"
            variant="outlined"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            counter
            >
            </v-text-field>
            <v-text-field v-if="isRegistering"
            label="確認密碼"
            type="password"
            minlength="6"
            maxlength="20"
            variant="outlined"
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value"
            counter
            >
            </v-text-field>
          <!-- </template> -->
          <!-- <template v-else>
            <v-text-field 
              label="公務信箱"
              type="email"
              v-model="loginEmail.value.value"
              :error-messages="loginEmail.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="密碼"
              type="password"
              minlength="6"
              maxlength="20"
              v-model="loginPassword.value.value"
              :error-messages="loginPassword.errorMessage.value"
              counter
            ></v-text-field>
          </template> -->
        </v-card-text>
        <v-card-actions class="mx-auto mb-5">
          <v-btn color="red" @click="closeDialog">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <v-app-bar color="primary" scroll-behavior="elevate" class="b-1">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">logo</v-btn>
      <v-spacer></v-spacer>
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn 
        v-for="item in navItems" 
        :key="item.to" 
        :prepend-icon="item.icon" 
        :to="item.to"
        :active="false"
        class="mx-1"
        @click="handleItemClick(item)"
        >{{ item.text }}</v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
  
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useApi } from '@/composables/axios'
const { api } = useApi()
const router = useRouter()
const drawer = ref(false)
const dialogOpen = ref(false)
const isRegistering = ref(true) // 判斷註冊還是登入


  const navItems=[
    { to: '/', text: '資源地圖', icon: 'mdi-map-search' },
    { to: '/event', text: '活動分享', icon: 'mdi-calendar' },
    { to: '/resource', text: '物資分享', icon: 'mdi-gift' },
    { to: '/', text: '管理', icon: 'mdi-cog' },
    {to:'/',text:'註冊/登入',icon:'mdi-account-plus'},
    ]


  const handleItemClick = (item) => {
  if (item.text === '註冊/登入') {
    dialogOpen.value = true
  } 
}

const closeDialog = () => {
  dialogOpen.value = false
  resetForm()
}

const toggleForm = (isRegister) => {
  isRegistering.value = isRegister
  resetForm()
}


const schema = yup.object({
  username:yup
    .string()
    .required('服務單位必填')
    .min(3,'服務單位長度不符')
    .max(20,'服務單位長度不符'),
  email:yup
    .string()
    .required('使用者信箱必填')
    .matches(     // 限制網域只能為org、edu、gov
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(org|edu|gov)$/,
      '必須為公務信箱， org、edu 或 gov 網域'
    )
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
    password: yup
    .string()
    .required('使用者密碼必填')
    .min(6, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符'),
    passwordConfirm: yup
      .string()
      // 代表此欄位值必須與 password 欄位的值一致
      // .oneOf(陣列, 錯誤訊息) 只允許符合陣列內其中一個值
      // .ref('password')  代表這個 schema 的 password 的欄位值
      .oneOf([yup.ref('password')], '密碼不一致')
})



const { handleSubmit, isSubmitting,resetForm } = useForm({
  validationSchema: schema,
  // 定義表單的初始值
  initialValues:{
    username:'',
    email:'',
    password:'',
    passwordConfirm:''
  }
})

const username = useField('username')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')


const submit = handleSubmit(async(values)=>{
  try{
    if (isRegistering.value) { // 更改 5: 根據當前表單類型調用不同的 API
      await api.post('/user', {
        username: values.username,
        email: values.email,
        password: values.password
      })
    } else {
      // await api.post('/user', {
      //   email: values.email,
      //   password: values.password
      // })
    }
    router.push('/')
  }catch(error){
    console.log(error)
    alert(error?.response?.data?.message||'發生錯誤')
  }
})


</script>
<style scoped>

.b-1{
  border: 1px solid #7a7a7a;
}
.v-text-field{
  margin: 8px 0 8px 0;
}
.v-footer{
  height: 50px;
  
}
.v-main {
  flex: 1; /* 使主要內容區域占據剩餘空間 */
}
</style>