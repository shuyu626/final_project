<template>
   <!-- 側邊欄 -->
  <v-navigation-drawer  class="b-1 text-center" width="250">
    <v-tabs
        v-model="tab"
        color="teal-darken-4"
        direction="vertical"
        show-arrows
      >
        <v-tab prepend-icon="mdi-account" text="基本資料" value="option-1" height="100" class="text-body-1 ms-1"></v-tab>
        <v-tab prepend-icon="mdi-lock" text="地標管理" value="option-2" height="100" class="text-body-1 ms-1"></v-tab>
        <v-tab prepend-icon="mdi-access-point" text="貼文管理" value="option-3" height="100" class="text-body-1 ms-1"></v-tab>
        <v-tab prepend-icon="mdi-bookmark" text="活動收藏" value="option-4" height="100" class="text-body-1 ms-1"></v-tab>
      </v-tabs>
  </v-navigation-drawer>
  
  <v-card>
    <div class="d-flex flex-row" >
      <v-container>


        <v-tabs-window v-model="tab" class="my-10">
          <v-tabs-window-item value="option-1">
          <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="profile"></breadcrumbs>
            <v-card flat >
              <v-card-text>
               <div id="profile" class="b-1 w-50 text-center mx-auto rounded-lg">
                <v-toolbar color="info" class="mb-10  rounded-t-lg" prominent >
                    <v-toolbar-title class="ms-0">基本資料</v-toolbar-title>
                </v-toolbar>
                <vue-file-agent
                    class="d-flex justify-center mb-5"
                    accept="image/jpeg,image/png"
                    deletable
                    max-size="1MB"
                    help-text="上傳大頭照"
                    :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
                ></vue-file-agent>
                  <v-container>
                    <v-row class="mb-5 px-15  text-left">
                       <template v-for="(item,index) in members" :key="index" >
                        <v-col md="2"></v-col>
                        <v-col cols="12" md="3" class="my-auto">
                          <label class="form-label" style="font-size:18px;">{{item.name}}</label>
                        </v-col>
                        <v-col cols="12" md="4" class="my-auto">
                            <p style="font-size:18px;">{{item.member}}</p>
                        </v-col>
                        <v-col md="3" class="ps-10">
                          <v-btn icon="mdi-pencil" variant="flat"></v-btn>
                        </v-col>
                      </template>
                  </v-row>
                  </v-container>
               </div>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2" >
            <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="mark"></breadcrumbs>
           <v-data-table-server
                :headers="event_tableHeaders"
                hover
                class="w-75 mx-auto b-1 rounded-lg "
              >
              <template #[`item.image`]="{ value }">
                <v-img :src="value" height="50px"></v-img>
              </template>
              <template #[`item.action`]="{ item }">
                <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" color="blue" @click="openDialog(item)"></v-btn>
              </template>
            </v-data-table-server>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-3">
          <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="post"></breadcrumbs>
           <h4 style="margin-left: 200px;" class="my-5">我要募資</h4>
           <v-data-table-server
                :headers="event_tableHeaders"
                hover
                class="w-75 mx-auto b-1 rounded-lg "
              >
              <template #[`item.image`]="{ value }">
                <v-img :src="value" height="50px"></v-img>
              </template>
              <template #[`item.action`]="{ item }">
                <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" color="blue" @click="openDialog(item)"></v-btn>
              </template>
            </v-data-table-server>



            <!-- 我要分享管理 -->
            <h4 style="margin-left: 200px;" class="my-5">我要分享</h4>
            <v-data-table-server
                v-model:items-per-page="share_tableItemsPerPage"
                v-model:sort-by="share_tableSortBy"
                v-model:page="share_tablePage"
                :items="share_tableItems"
                :headers="share_tableHeaders"
                :loading="share_tableLoading"
                :items-length="share_tableItemsLength"
                :search="share_tableSearch"
                @update:items-per-page="ShareTableLoadItems(false)"
                @update:sort-by="ShareTableLoadItems(false)"
                @update:page="ShareTableLoadItems(false)"
                hover
                class="w-75 mx-auto b-1 rounded-lg mb-15"
              >
              <!-- 搜尋欄位 -->
              <template #top>
                <search 
                  v-model="share_tableSearch"
                  @click-append="ShareTableLoadItems(true)"
                  @keydown.enter="ShareTableLoadItems(true)"
                  max-width="1200px"
                  ></search>
                  
              </template>
              <template #[`item.image`]="{ value }">
                <v-img :src="value" width="100px"></v-img>
              </template>
              <template #[`item.description`]="{ item }">
                <td style="width: 250px;" class="py-2">{{ item.description }}</td>
              </template>
              <template #[`item.action`]="{ item }">
                <td style="width: 80px;">{{ item.action }}
                  <v-btn icon="mdi-pencil" variant="text" color="blue" ></v-btn>
                  <v-btn icon="mdi-delete" variant="text" color="blue" ></v-btn>
                </td>
              </template>
            </v-data-table-server>









            <!-- 活動貼文管理 -->
            <h4 style="margin-left: 200px;" class="my-5">活動管理</h4>
            <v-data-table-server
                v-model:items-per-page="event_tableItemsPerPage"
                v-model:sort-by="event_tableSortBy"
                v-model:page="event_tablePage"
                :items="event_tableItems"
                :headers="event_tableHeaders"
                :loading="event_tableLoading"
                :items-length="event_tableItemsLength"
                :search="event_tableSearch"
                @update:items-per-page="EventTableLoadItems(false)"
                @update:sort-by="EventTableLoadItems(false)"
                @update:page="EventTableLoadItems(false)"
                hover
                class="w-75 mx-auto b-1 rounded-lg mb-15"
              >
              <!-- 搜尋欄位 -->
              <template #top>
                <search 
                  v-model="event_tableSearch"
                  @click-append="EventTableLoadItems(true)"
                  @keydown.enter="EventTableLoadItems(true)"
                  max-width="1200px"
                  ></search>
                  
              </template>
              <template #[`item.image`]="{ value }">
                <v-img :src="value" width="100px"></v-img>
              </template>
              <template #[`item.address`]="{ item }">
                <td style="width: 220px;">{{ item.address }}</td>
              </template>
              <template #[`item.description`]="{ item }">
                <td style="width: 250px;" class="py-2">{{ item.description }}</td>
              </template>
              <template #[`item.action`]="{ item }">
                <td style="width: 80px;">{{ item.action }}
                  <v-btn icon="mdi-pencil" variant="text" color="blue" ></v-btn>
                  <v-btn icon="mdi-delete" variant="text" color="blue" ></v-btn>
                </td>
              </template>
            </v-data-table-server>
           


          </v-tabs-window-item>

          <v-tabs-window-item value="option-4">
            <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="event"></breadcrumbs>
           <div class="w-66 mx-auto b-1 rounded-lg" v-for="(item,index) in eventmark" :key="index">
            <v-card variant="flat" class="rounded-lg">
                <v-row class="align-center my-4 ps-10" >
                    <v-col cols="4" class=" align-center">
                        <v-img :src="item.img" class="b-1 rounded-lg" width="250px" height="170px" cover></v-img>
                    </v-col>
                    <v-col cols="5" class=" align-self-start ">
                      <v-card-title>{{ item.name }}</v-card-title>
                      <v-card-subtitle>{{ item.organitation }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="3" class=" align-self-start mt-2">
                    <v-btn  text="取消收藏" prepend-icon="mdi-bookmark" variant="flat" style="background-color: #F5B4B4;"></v-btn>
                  </v-col>
                </v-row>                
            </v-card>
           </div>
           
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </div>
  </v-card>
</template>
<script setup>
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
definePage({
  meta: {
    title: ' | 會員管理'
  }
})
const profile=(['會員中心','基本資料'])
const mark=(['會員中心','地標管理'])
const post=(['會員中心','貼文管理'])
const event=(['會員中心','活動收藏'])
const tab = ref('option-1');
const members=ref([
  {name:'單位名稱',member:'新北市社會局身障科'},
  {name:'聯絡電話',member:'(02)29603456'},
  {name:'電子信箱',member:'a1234@ntpc.gov.tw'},
  {name:'密碼',member:'a123456789'}
])


const eventmark = ([
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfN0-csYdLsLYB82izZ75htQ_3XlrwQwgW7Q&s', name:'生活好便利~手機APP使用實務講座',organitation:'新北市樂智身心障礙者服務中心',number:''},
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jYNdL7EfoBGgHMaYkwvlXLCCyHJ26Wf8Zw&s', name:'溝通與應對技巧暨失智友善天使',organitation:'新北市家庭照顧者支持服務據點',number:''},
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt8pdrxch_n_mzicIbK-Wrtpin4V23Dd-Wkw&s', name:'遺物整理與悲傷輔導',organitation:'台北市攸惜關懷協會',number:''},
])





// 我的分享管理
const share_tableItemsPerPage = ref(8)
const share_tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const share_tablePage = ref(1)
const share_tableItems = ref([])
const share_tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: false, key: 'name' },
  { title: '數量', align: 'center', sortable: false, key: 'quantity' },
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '概況', align: 'center', sortable: false, key: 'description' },
  { title: '單位', align: 'center', sortable: false, key: 'organizer' },
  { title: '操作', align: 'center', sortable: false, key: 'action' }
]
const share_tableLoading = ref(true)
const share_tableItemsLength = ref(0)
const share_tableSearch = ref('')
const ShareTableLoadItems = async (reset) => {
  if (reset) share_tablePage.value = 1
  share_tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/material/all', {
      params: {
        page: share_tablePage.value,
        itemsPerPage: share_tableItemsPerPage.value,
        sortBy: share_tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: share_tableSortBy.value[0]?.order || 'desc',
        search: share_tableSearch.value
      }
    })
    share_tableItems.value.splice(0, share_tableItems.value.length, ...data.result.data)
    share_tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  share_tableLoading.value = false
}
ShareTableLoadItems()










// 活動管理
// 一頁10個
const event_tableItemsPerPage = ref(10)
// 可以一次支援很多欄位去做排序，前端要支援這個功能的話後端的api就要把這個功能寫出來(這裡只舉一個欄位做排序)
const event_tableSortBy = ref([
  { key: 'createdAt', order: 'desc' } // createdAt建立的日期 ， order代表正序或倒序(desc 倒序)
])
const event_tablePage = ref(1) // 表格被翻到哪一頁，預設在第一頁
const event_tableItems = ref([])
const event_tableHeaders = [ // 因為欄位是固定的，所以不用ref
// align 靠哪邊排，sortable 欄位可不可以排序，key 要跟資料庫的欄位對到(會自動把符合的key的值帶進這個欄位)

// 圖片會直接以文字的方法顯示(直接把image的資料放上來)，因為他會當成是一般的文字，不會顯示圖片
// 可以在上面 template 上面定義資料的顯示方式
{ title: '圖片', align: 'center', sortable: false, key: 'image' }, 
  { title: '活動名稱', align: 'center', sortable: false, key: 'title' },
  { title: '活動地點', align: 'center', sortable: false, key: 'address' },
  { title: '活動類別', align: 'center', sortable: true, key: 'category' },
  { title: '活動時間', align: 'center', sortable: true, key: 'date' },
  { title: '主辦單位', align: 'center', sortable: false, key: 'organizer' },
  { title: '活動介紹', align: 'center', sortable: false, key: 'description' },
  { title: '操作', align: 'center', sortable: false, key: 'action' }
]
const event_tableLoading = ref(true) // 進來頁面時是讀取狀態
const event_tableItemsLength = ref(0) // 全部有多少筆資料
const event_tableSearch = ref('') // 搜尋的文字

const EventTableLoadItems = async (reset) => {
  if (reset) event_tablePage.value = 1 // 重置當前頁碼，重新整理時從第一頁開始
  event_tableLoading.value = true
  try {
    // 取得表格資料
    // get(網址參數，請求的設定)
    const { data } = await apiAuth.get('/event/all', { // 發送請求從後端取得特定資料
      
      // 設定路由的參數
      params: {
        page: event_tablePage.value,
        itemsPerPage: event_tableItemsPerPage.value,
        sortBy: event_tableSortBy.value[0]?.key || 'createdAt', // 要寫?，因為排序是可以取消的
        sortOrder: event_tableSortBy.value[0]?.order || 'desc',
        search: event_tableSearch.value
      }
      
    })
    // console.log(data)
    event_tableItems.value.splice(0, event_tableItems.value.length, ...data.result.data) // 清空所有資料，再從後端取得新資料
    event_tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  event_tableLoading.value = false
}
EventTableLoadItems() // 第一次進來要呼叫一次



</script>
  
<style scoped>
 .b-1{
  border: 1px solid #7a7a7a;
}
.v-data-table__thead{
  background-color:#000;
}
/* ::v-deep [data-v-9f35885f] .grid-block-wrapper .grid-block .file-preview {
  width: 100px;
  height: 100px;
} */
::v-deep .file-preview-wrapper{
border-radius: 50%;
overflow: hidden;
border: 1px solid #7a7a7a;

}
::v-deep .vue-file-agent.file-input-wrapper{
    border: none;
}
::v-deep .grid-block-wrapper .grid-block {
    min-width: 125px;
}
/* table header */
::v-deep .v-data-table__thead{
  background: #D9D9D9
}
::v-deep element {
    height: 100%;
}
  </style>
  








  