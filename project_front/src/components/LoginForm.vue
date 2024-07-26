<template>
    <v-form @submit.prevent="submit">
        <v-text-field 
              label="公務信箱"
              type="email"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="密碼"
              type="password"
              minlength="6"
              maxlength="20"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              counter
            ></v-text-field>
    </v-form>
</template>


<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'





const loginSchema = yup.object({
  email: yup
    .string()
    .required('使用者信箱必填')
    .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(org|edu|gov)$/, // 限制網域只能為org、edu、gov
    '使用者信箱必須是 org、edu 或 gov 網域'
    )
    .test('isEmail', '信箱格式錯誤', (value) => validator.isEmail(value)),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(6, '密碼長度不符')
    .max(20, '密碼長度不符'),
})


const {handleSubmit, isSubmitting}=useForm({
  validationSchema: loginSchema
})

const email = useField('email')
const password = useField('password')


const submit = handleSubmit(async(values)=>{
  try{
    if (isRegistering.value) { // 更改 5: 根據當前表單類型調用不同的 API
      await api.post('/user', {
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
  border: 1px solid black;
}

</style>