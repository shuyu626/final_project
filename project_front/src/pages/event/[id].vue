<template>
    <v-container>
        <breadcrumbs :title=webtitle></breadcrumbs>
        <v-row justify-center>
            <v-col cols="5" class="d-flex justify-center">
                <v-img :src="event.image" class="b-1" max-width="450" max-height="500" cover></v-img>
            </v-col>
            <v-col cols="5">
                <v-card variant="flat">
                    <v-card-title class="font-weight-black">{{ event.title }}</v-card-title>
                    <v-divider thickness="0"></v-divider>
                    <v-card-text>活動時間</v-card-text>
                    <v-card-text>{{ event.date }}</v-card-text>
                    <v-card-text>活動地點</v-card-text>
                    <v-card-text>{{event.address}}</v-card-text>
                    <v-card-text>活動類別</v-card-text>
                    <v-card-text>{{event.category}}</v-card-text>
                    <v-card-text>主辦單位</v-card-text>
                    <v-card-text>{{ event.organizer }}</v-card-text>
                    <v-card-text></v-card-text>
                    <AppButton prepend-icon="mdi-bookmark" text="我要收藏" class="me-15 bg-third"></AppButton>
                </v-card>
            </v-col>
        </v-row justify-center class="flex-column">
            <v-col>
                <h2 class="info">活動介紹</h2>
            </v-col>
            <v-col>
                <div class="b-1 info pa-4">
                  <!-- white-space: pre-line 換行 -->
                    <p style="white-space: pre-line;" class="text-body-1 w-75">
                      {{ event.description }}
                    </p>
                </div>
            </v-col>
        <v-row>
            
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: 'keeperS | 活動',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const route = useRoute()
const createSnackbar = useSnackbar()

const webtitle=['活動分享','活動詳情']
// 商品欄位
const event = ref({
  _id: '',
  title: '',
  date: '',
  address: '',
  category: '',
  organizer:'',
  description: '',
  image: ''
})

// 從後端加載商品的資料到前端去
const load = async () => {
  try { // 透過'/event/' + route.params.id 來取得特定商品的資料
    const { data } = await api.get('/event/' + route.params.id)
    event.value._id = data.result._id
    event.value.title = data.result.title
    event.value.date = data.result.date
    event.value.address = data.result.address
    event.value.category = data.result.category
    event.value.organizer = data.result.organizer
    event.value.description = data.result.description
    event.value.image = data.result.image
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
load()



const cardtext = [
    '活動時間',
    '2024-07-13(六)9:30~11:30',
    '活動地點',
    '新北市立圖書館總館 5樓研習教室 (新北市板橋區貴興路139號)',
    '活動對象',
    '設籍且實際居住新北市，6歲以上身心障礙者，限20位',
    '主辦單位',
    '新北市樂智身心障礙者服務中心',
    '報名方式',
    '來電報名，電話(02)2960-1071'
]
</script>


<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.v-container{
    padding: 0 5rem 0 5rem;
}
.v-card-title{
    padding-left: 9px;
    font-size: 30px;
}
.v-card-text{
    padding: 9px;
    &:nth-child(even){
        color:#87b3b0;
        font-size: 20px;
        }
    &:nth-child(odd){
    font-size: 16px;
    }
}
.info{
    margin: 0 6rem 0 6rem ;
}
.v-btn{
    position: absolute;
    right: 4%;
    bottom: 1%;
}

</style>