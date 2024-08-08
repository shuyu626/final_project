<template>
    <v-container>
        <breadcrumbs :title=webtitle></breadcrumbs>
        <v-row justify-center class="mt-5">
            <v-col cols="5" class="d-flex justify-center">
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEtCIj3EIjTq8B1SC1jrGfU0sLM9UjO4e10A&s" class="b-1" max-width="400" max-height="400" cover></v-img>
            </v-col>
            <v-col cols="5">
                <v-card variant="flat" id="resourceCard">
                    <v-card-title class="font-weight-black mb-2">{{provide.name}}</v-card-title>
                    <v-divider thickness="0"></v-divider>
                    <v-row>
                        <!-- 活動名稱 -->
                        <v-col cols="12" md="3" class="my-auto">
                            <label class="form-label">需求單位</label>
                        </v-col>
                        <v-col cols="12" md="9">
                            <p>中正萬華區身心障礙者資源中心</p>
                        </v-col>
                        <!-- 活動對象 -->
                        <v-col cols="12" md="3" class="my-auto ">
                        <label class="form-label">物資類別</label>
                        </v-col>
                        <v-col cols="12" md="9">
                            <p>日用品</p>
                        </v-col>
                        <!-- 需求量 -->
                        <v-col cols="12" md="3" class="my-auto ">
                            <label class="form-label">尺寸／品牌</label>
                        </v-col>
                        <v-col cols="12" md="9">
                            <p>L / 不限品牌</p>
                        </v-col>
                        <!-- 需求介紹 -->
                        <v-col cols="12" md="3">
                            <label class="form-label">需求介紹</label>
                        </v-col>
                        <v-col cols="12" md="9">
                            <p>
                                為罹癌臥床的頸髓會員募集成人紙尿布(全新、尺寸L)、看護墊(全新、尺寸XL)、純水濕紙巾(全新)，讓會員擁有更良好療養照顧及生活品質。
                            </p>
                        </v-col>
                        <!-- 所需數量 -->
                        <v-col cols="12" md="3" class="my-auto ">
                            <label class="form-label">所需數量</label>
                        </v-col>
                        <v-col cols="12" md="9" class="my-auto">
                            <p>2包</p> 
                        </v-col>
                    </v-row>
                    <!-- <v-card-text v-for="item in cardtext" :key="item">{{ item }}</v-card-text> -->
                    
                </v-card>
            </v-col>
        </v-row>

        <!-- 我要捐贈 - 對話框 -->
        <v-dialog max-width="700">
            <!-- activatorProps 是由 v-dialog 提供的綁定道具，確保觸發器按鈕與對話框的打開狀態相關聯 -->
            <template #activator="{ props: activatorProps }">
                <!-- @click="scrollTo('#msg')" 點擊跳到留言區(錨點) -->
                <AppButton text="我要留言" width="90" class="me-4 bg-third" @click="scrollTo('#msg')"></AppButton>
                <AppButton text="我要捐贈" width="90" class=" bg-third"  v-bind="activatorProps"></AppButton>
            </template>
                <!-- 定義了對話框打開時顯示的內容。插槽道具 { isActive } 用於控制對話框的打開和關閉狀態 -->
                <template #default="{ isActive }">
                    <v-card class="bg-third">
                        <v-container>
                            <!-- 關閉對話框的按鈕 -->
                            <v-card-actions class="pa-0">
                                <v-btn id="close" icon="$close" variant="text" @click="isActive.value = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-black text-left text-h5 py-0">物資名稱：成人紙尿褲</v-card-title>
                            <div class="b-1 bg-white rounded-sm pt-5 mt-1" >   
                                <v-card-text>
                                    <v-form>
                                        <v-row>
                                            <!-- 捐贈數量 -->
                                            <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">捐贈數量</label>
                                            </v-col>
                                            <v-col cols="12" md="9">
                                                <!-- 實驗中的元件，要記得import -->
                                                <v-number-input
                                                control-variant="stacked"
                                                variant="outlined"
                                                density="comfortable"
                                                inset
                                                label="輸入數量"
                                                hide-details
                                                ></v-number-input>
                                            </v-col>
                                            <!-- 活動對象 -->
                                            <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">單位／姓名</label>
                                            </v-col>
                                            <v-col cols="12" md="9">
                                                <inputText/>
                                            </v-col>
                                            <!-- 需求介紹 -->
                                            <v-col cols="12" md="3" class="my-auto text-center">
                                                <label class="form-label">聯絡電話</label>
                                            </v-col>
                                            <v-col cols="12" md="9">
                                                <inputText/>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions>
                                    <div class="mx-auto">
                                        <!-- @click="isActive.value = false"：點擊按鈕時，將 isActive.value 設置為 false，從而關閉對話框 -->
                                        <v-btn
                                        text="確認"
                                        variant="text"
                                        class="rounded-xl b-1 bg-primary"
                                        density="comfortable"
                                        @click="isActive.value = false"
                                        ></v-btn>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-container>
                    </v-card>
                </template>
            </v-dialog>



        <!-- 留言板 -->
        <v-row class="mt-10">
            <v-col>
                <div class="b-1 info-margin  text-center text-body-1 pa-2 bg-accent rounded-t-lg" style="width:150px;padding: 0;border-bottom: 0px;">留言板</div>
                <div class="b-1 pa-5 info-margin">
                <div class="pa-4 ">
                    <v-avatar color="primary b-1" class="me-3" size="large">
                        <v-img :src="provide.image"></v-img>
                    </v-avatar>
                    <span>照管中心</span>
                    <p class="ml-13 text-body-2">您好，請問周末親送過去可以嗎?</p>
                </div>
                <div class="pa-4">
                    <v-avatar color="secondary b-1" class="me-3" size="large">
                        <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqnRWICFHo49O2OyVoMHrqkQmAevK654iXKw&s"></v-img>
                    </v-avatar>
                    <span>家防中心</span>
                    <p class="ml-13 text-body-2">請問商品期限有限定嗎?</p>
                </div>
                <v-divider></v-divider>
                <!-- 留言發布 -->
                <div class="pa-4">
                    <v-textarea 
                    ref="textarea"
                    id="msg"
                    placeholder="請輸入您的留言或提問"
                    variant="outlined" 
                    width="600" 
                    maxlength="20" 
                    counter
                    >
                        <template v-slot:prepend>
                        <v-avatar color="primary " class="me-1 b-1" size="large">
                            <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKvt7MWE2LrmiZbNLMYdnwEW-OnNf1sam1g&s"></v-img>
                        </v-avatar>
                        </template>
                    </v-textarea>
                    <v-btn
                    variant="text"
                    class="rounded-md b-1 bg-accent mt-2"
                    density="comfortable"
                    :ripple="false"
                    id="submit"
                    >送出</v-btn>
                </div>
            </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { api } = useApi()
const route = useRoute()
const createSnackbar = useSnackbar()
const webtitle=['物資分享','我要募資','物資詳情']
definePage({
  meta: {
    title: 'keeperS | 物資',
    login: false,
    admin: false
  }
})

const provide = ref({
  _id: '',
  name: '',
  quantity: 0, // 預設0
  category: '',
  description: '',
  image: '',
})




const textarea = ref(null);


const load = async () => {
  try { // 透過'/material/' + route.params.id 來取得特定商品的資料
    const { data } = await api.get('/material/' + route.params.id)
    provide.value._id = data.result._id
    provide.value.name = data.result.name
    provide.value.quantity = data.result.quantity
    provide.value.category = data.result.category
    provide.value.description = data.result.description
    provide.value.image = data.result.image
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








// 點擊我要留言按鈕跳到留言板
function scrollTo(selector) { // 找到想滾動到的元素css選擇器
    const element = document.querySelector(selector);
    if (element) { 
        // scrollIntoView 方法使該元素滾動到視窗內部
        // behavior: 'smooth' 使滾動效果平滑過渡，而不是瞬間跳轉
        element.scrollIntoView({ behavior: 'smooth' });
        nextTick(() => { // 滾動後再執行
            textarea.value.focus();
        });
    }
}
</script>


<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.v-container{
    padding:0.5rem 3rem 3rem 3rem;
}
.v-card-title{
    padding-left: 9px;
    font-size: 30px;
}
#resourceCard{
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
    .form-label{
    font-size: 20px;
    font-weight: bold;
    color:#87b3b0;
    margin-left: 0.8rem;
}
}
.info-margin{
    margin: 0 6rem 0 6rem ;
}
#submit{
    position: relative;
    left: 37.5%;
    padding: 0;
}
.v-btn{
    position: relative;
    left: 70%;
}
.form-label{
    font-size: 20px;
    font-weight: bold;
}
#close{
    position: relative;
    left: 95%;
}
p{
    font-size: 18px;
}

</style>