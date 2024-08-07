<template>
        <!-- 新增活動對話框 -->
            <v-btn
                @click="openDialog(null)"
                class="bg-third b-1"
                size="65px"
                variant="text"
                id="create"
                >
                <v-icon size="x-large">mdi-plus</v-icon>
                <v-tooltip
                    activator="parent"
                    location="top"
                >
                新增活動
                </v-tooltip>
            </v-btn>
            <v-dialog max-width="700" v-model="dialog">
                <v-card>
                        <v-container>
                            <v-card-title class="font-weight-black text-center text-h4">新增活動</v-card-title>   
                            <v-card-text>
                                <v-form  @submit.prevent="submit" :disabled="isSubmitting">
                                    <v-row>
                                        <v-col >
                                            <!-- plugins > index.js 要先引入套件 -->
                                            <vue-file-agent
                                                v-model="fileRecords"
                                                v-model:raw-model-value="rawFileRecords"
                                                accept="image/jpeg,image/png"
                                                deletable
                                                max-size="1MB"
                                                help-text="選擇檔案或拖曳到這裡"
                                                :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
                                                ref="fileAgent"
                                                ></vue-file-agent>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <!-- 活動名稱 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                        <label class="form-label">活動名稱：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText  
                                            v-model="title.value.value"
                                            :error-messages="title.errorMessage.value"
                                            />
                                        </v-col>
                                        <!-- 活動地點 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">活動地點：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText 
                                            v-model=" address.value.value"
                                            :error-messages=" address.errorMessage.value"
                                            ></inputText>
                                        </v-col>
                                        <!-- 活動類別 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">活動類別：</label>
                                        </v-col>
                                        <v-col cols="12" md="3">
                                            <v-select
                                                v-model="category.value.value"
                                                :error-messages="category.errorMessage.value"
                                                label="選擇" 
                                                variant="outlined" 
                                                density="comfortable" 
                                                dense
                                                width="140"
                                                :items="chips"
                                                hide-details
                                            ></v-select>
                                        </v-col>
                                        <!-- 活動時間 -->
                                        <v-col cols="3" class="my-auto text-center px-0">
                                            <label class="form-label">活動時間：</label>
                                        </v-col>
                                        <v-col cols="3" class="">
                                            <!-- <v-date-input
                                            v-model="model"
                                            label="選擇日期"
                                            max-width="368px"
                                            variant="outlined"
                                            density="comfortable"
                                            hide-details
                                            ></v-date-input> -->
                                            <inputText
                                            v-model="date.value.value"
                                            :error-messages="date.errorMessage.value"
                                            />
                                        </v-col>
                                        

                                        <!-- 主辦單位 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">主辦單位：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText
                                            v-model="organizer.value.value"
                                            :error-messages="organizer.errorMessage.value"
                                            />
                                        </v-col>

                                        <!-- 活動介紹 -->
                                        <v-col cols="12" md="3" class="text-center">
                                        <label class="form-label">活動介紹：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-textarea
                                                label="輸入文字"
                                                variant="outlined" 
                                                clearable
                                                hide-details
                                                v-model="description.value.value"
                                                :error-messages="description.errorMessage.value"
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions>
                                <div class="mx-auto">
                                    <v-btn variant="text"class="rounded-xl b-1" density="comfortable" type="submit" :loading="isSubmitting">送出</v-btn>
                                    <v-btn
                                    text="取消"
                                    variant="text"
                                    class="rounded-xl b-1"
                                    density="comfortable"
                                    @click="closeDialog()"
                                    ></v-btn>
                                </div>
                            </v-card-actions>
                                </v-form>
                            </v-card-text>

                            
                        </v-container>
                    </v-card>
            </v-dialog>


        <!-- 搜尋欄 -->
         <v-container>
            <!-- 麵包屑 - 顯示目前頁面位置 -->
            <breadcrumbs :title="webtitle"></breadcrumbs>
            <search class="mx-auto" max-width="700px"></search>
            <div class="text-center">
                    <v-sheet
                    class="mx-auto d-inline-block"
                    max-width="900"
                    >
                        <v-slide-group
                            show-arrows
                            multiple
                        >
                            <v-slide-group-item
                            v-for="n in chips"
                            :key="n"
                            v-slot="{ isSelected, toggle }"
                            >
                            <v-chip
                            :style="{
                                backgroundColor: isSelected ? '#616161' : '#EEEEEE',
                                color: isSelected ? 'white' : 'black'
                            }"
                                class="ma-2"
                                @click="toggle"
                            >
                                {{ n }}
                            </v-chip>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                <v-row justify="center" v-for="r in 3" :key="r" class="my-3">
                    <v-col cols="12" md="4" lg="2" v-for="c in 4" :key="c">
                        <card class="cursor-pointer"></card>
                    </v-col>
                </v-row>
            </div>
            <!-- 上下頁 -->
            <div class="text-center my-5">
                <v-pagination
                v-model="page"
                :length="3"
                rounded="circle"
                ></v-pagination>
            </div>
        </v-container>

</template>

<script setup>
import { ref, computed } from 'vue'
import { definePage } from 'vue-router/auto'
// import { VDateInput } from 'vuetify/labs/VDateInput'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const webtitle=ref(['活動分享','活動查詢'])
const chips=['兒童','青少年','育兒','長照','精神','照顧','就學','就業','身障','親職教育','早療','紓壓','居住','醫療','司法','社工','其他']
const selectedChips = ref([]);
const page=ref(1)
const model = ref(null);
const fileAgent = ref(null)
const dialog = ref(false)

definePage({
  meta: {
    title: ' | 活動查詢'
  }
})

const openDialog = (item) => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord() 
}


const schema = yup.object({
  title: yup
    .string()
    .required('活動標題必填'),
  date: yup
    .string()
    .required('活動日期必填'),
  address: yup
    .string()
    .required('活動地點必填'),
  category: yup
    .string()
    .required('活動分類必填')
    // 自訂驗證規則，檢查分類是否在預定一的 categories 中
    // isCategory 驗證名稱可自定義，第二個是錯誤訊息，第三個是驗證的function
    .test('isCategory', '商品分類錯誤', value => {
      return chips.includes(value) // 分類的陣列有沒有包含這個值
    }),
  organizer: yup
    .string()
    .required('主辦單位必填'),
  description: yup
    .string()
    .required('活動介紹必填'),
})


const { handleSubmit, isSubmitting, resetForm } = useForm({
  // validationSchema 用於驗證表單的各個字段，確保所有字段都符合預期的格式和要求
  // 定義表單的驗證格式是上面定義的東東
  validationSchema: schema,
  // initialValues  定義表單的初始值(表單在第一次渲染時會有預設的值)
  initialValues: {
    title: '', 
    date: '', // 初始值是0
    address:'',
    category: '',
    organizer:'',
    description: ''
  }
})

const title = useField('title')
const date = useField('date')
const address = useField('address')
const category = useField('category')
const organizer = useField('organizer')
const description = useField('description')

const fileRecords = ref([]) // 綁定處理後的文件記錄
const rawFileRecords = ref([]) // 綁定原始文件記錄





const submit = handleSubmit(async (values) => {
  // 如果 vue.file.agent 這個元件選到的檔案有 error 的話就 return，[0]代表第一個檔案，如果第一個檔案有error就return
  // ?.沒選檔案的時候是undefined，if不會過 > return
  if (fileRecords.value[0]?.error) return 
  if (fileRecords.value.length < 1) return
  // 建立 FormData 物件並添加要上傳的資料
  
  try {
    // 要先建立 FormData 物件，然後把東西放進去
    // 用append方法把要放進formdata的資料放進去
    const fd = new FormData()
    // fd.append(key, value)
    fd.append('title', values.title)
    fd.append('date', values.date)
    fd.append('address', values.address)
    fd.append('category', values.category)
    fd.append('organizer', values.organizer)
    fd.append('description', values.description)
    // 如果有選擇圖片，將圖片添加到 FormData
    // 如果大於0，才要把檔案放進去
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }
    // console.log(fd)
    await apiAuth.post('/event', fd) 
    createSnackbar({
      text: '新增成功' ,
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})


</script>
<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
#create{
    position: fixed;
    right: 8%;
    bottom: 4%;
    border-radius: 50%;
}
.v-overlay__content{
    background-color: #fff;
}
.form-label{
    font-size: 20px;
    font-weight: bold;
}
::v-deep .v-input__prepend{
    margin-right: 5px;
}

::v-deep .v-field__input{
    padding: 12px 10px 12px 10px;
    width: 120px;
}
</style>