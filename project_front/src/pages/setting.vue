<template>
   <!-- 側邊欄 -->
  <v-navigation-drawer elevation="" class="b-1 text-center" width="250">
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
    <div class="d-flex flex-row" style="height: 100vh;">
      <v-container>


        <v-tabs-window v-model="tab" class="my-10">
          <v-tabs-window-item value="option-1">
          <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="profile"></breadcrumbs>
            <v-card flat>
              <v-card-text>
               <div id="profile" class="b-1 w-50 text-center mx-auto rounded-lg">
                <v-toolbar color="info" class="mb-10  rounded-t-lg" prominent >
                    <v-toolbar-title class="ms-0">基本資料</v-toolbar-title>
                </v-toolbar>
                <vue-file-agent
                    accept="image/jpeg,image/png"
                    deletable
                    max-size="1MB"
                    help-text="上傳大頭照"
                    :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
                ></vue-file-agent>
                  <v-container>
                    <v-row class="mb-5 px-15  text-left">
                      <!-- 活動名稱 -->
                       <template v-for="(item,index) in members" :key="index" >
                        <v-col md="2"></v-col>
                        <v-col cols="12" md="3" class="my-auto">
                          <label class="form-label text-h6 ">{{item.name}}</label>
                        </v-col>
                        <v-col cols="12" md="4" class="my-auto">
                            <p class="text-h6">{{item.member}}</p>
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

          <v-tabs-window-item value="option-2">
            <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="mark"></breadcrumbs>
           <v-data-table-server
                :headers="tableHeaders"
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
                :headers="tableHeaders"
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
            <h4 style="margin-left: 200px;" class="my-5">我要分享</h4>
           <v-data-table-server
                :headers="tableHeaders"
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
            <h4 style="margin-left: 200px;" class="my-5">活動管理</h4>
           <v-data-table-server
                :headers="tableHeaders"
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

          <v-tabs-window-item value="option-4">
            <!-- 麵包屑 - 顯示目前頁面位置 -->
           <breadcrumbs :title="event"></breadcrumbs>
           <div class="w-66 mx-auto b-1 rounded-lg" v-for="(item,index) in eventmark" :key="index">
            <v-card variant="flat" class="rounded-lg">
                <v-row class="align-center my-4 ps-10">
                    <v-col cols="4" class=" align-center">
                        <v-img :src="item.img" class="b-1 rounded-lg" width="250px" height="170px" cover></v-img>
                    </v-col>
                    <v-col cols="5" class=" align-self-start ">
                      <v-card-title>{{ item.name }}</v-card-title>
                      <v-card-subtitle>{{ item.organitation }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="2" class=" align-self-start mt-2">
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


const tableHeaders = [
  { title: '服務名稱', align: 'center', key: 'image' },
  { title: '服務項目', align: 'center', key: 'name' },
  { title: '編輯', align: 'center', key: 'price' }
]

const eventmark = ([
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfN0-csYdLsLYB82izZ75htQ_3XlrwQwgW7Q&s', name:'生活好便利~手機APP使用實務講座',organitation:'新北市樂智身心障礙者服務中心',number:''},
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jYNdL7EfoBGgHMaYkwvlXLCCyHJ26Wf8Zw&s', name:'溝通與應對技巧暨失智友善天使',organitation:'新北市家庭照顧者支持服務據點',number:''},
  {img:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt8pdrxch_n_mzicIbK-Wrtpin4V23Dd-Wkw&s', name:'遺物整理與悲傷輔導',organitation:'台北市攸惜關懷協會',number:''},
])

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
  </style>
  








  