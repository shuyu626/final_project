<template>
        
        <!-- 類別側邊欄 -->
        <v-navigation-drawer location="right"  v-model="drawer" class="bg-third b-1">
            <v-list-item title="My Application" subtitle="Vuetify" ></v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="List Item 1"></v-list-item>
            <v-list-item link title="List Item 2"></v-list-item>
            <v-list-item link title="List Item 3"></v-list-item>
        </v-navigation-drawer>

        <!-- 新增商品對話框 -->
        <v-dialog max-width="700">
            <!-- activatorProps 是由 v-dialog 提供的綁定道具，確保觸發器按鈕與對話框的打開狀態相關聯 -->
            <template #activator="{ props: activatorProps }">
                <v-btn
                    class="bg-third b-1"
                    size="65px"
                    variant="text"
                    v-bind="activatorProps"
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
            </template>
                <!-- 定義了對話框打開時顯示的內容。插槽道具 { isActive } 用於控制對話框的打開和關閉狀態 -->
                <template #default="{ isActive }">
                    <v-card>
                        <v-container>
                            <v-card-title class="font-weight-black text-center text-h4">新增活動</v-card-title>   
                            <v-card-text>
                                <v-form>
                                    <v-row>
                                        <v-col >
                                            <!-- plugins > index.js 要先引入套件 -->
                                            <vue-file-agent
                                                accept="image/jpeg,image/png"
                                                deletable
                                                max-size="1MB"
                                                help-text="選擇檔案或拖曳到這裡"
                                                :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
                                            ></vue-file-agent>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <!-- 活動名稱 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                        <label class="form-label">活動名稱：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText/>
                                        </v-col>
                                        <!-- 活動地點 -->
                                        <v-col cols="3" class="my-auto text-center">
                                            <label class="form-label">活動地點：</label>
                                        </v-col>
                                        <v-col cols="3">
                                            <inputText width="250px"></inputText>
                                        </v-col>
                                        <!-- 活動時間 -->
                                        <v-col cols="3" class="my-auto text-center">
                                            <label class="form-label">活動時間：</label>
                                        </v-col>
                                        <v-col cols="3">
                                            <inputText width="250px"></inputText>
                                        </v-col>
                                        <!-- 活動對象 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                        <label class="form-label">活動對象：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-select
                                                label="選擇" 
                                                variant="outlined" 
                                                density="comfortable" 
                                                dense
                                                :items="['選項1', '選項2', '選項3']"
                                                hide-details
                                            ></v-select>
                                        </v-col>

                                        <!-- 主辦單位 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">主辦單位：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText/>
                                        </v-col>

                                        <!-- 報名方式 -->
                                        <v-col cols="12" md="3" class="my-auto text-center">
                                            <label class="form-label">報名方式：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <inputText/>
                                        </v-col>
                                        <!-- 活動介紹 -->
                                        <v-col cols="12" md="3" class="text-center">
                                        <label class="form-label">活動介紹：</label>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-textarea
                                                variant="outlined" 
                                                clearable
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <div class="mx-auto">
                                    <submitButton></submitButton>
                                    <!-- 關閉對話框的按鈕 -->
                                    <!-- @click="isActive.value = false"：點擊按鈕時，將 isActive.value 設置為 false，從而關閉對話框 -->
                                    <v-btn
                                    text="取消"
                                    variant="text"
                                    class="rounded-xl b-1"
                                    density="comfortable"
                                    @click="isActive.value = false"
                                    ></v-btn>
                                </div>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </template>
            </v-dialog>


        <!-- 搜尋欄 -->
        <search class="mx-auto" max-width="700px"></search>
        <div class="text-center">
            <!-- <span class="me-3">
                熱門搜尋
            </span> -->
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

            <!-- <v-btn
                class="b-1 mx-3 rounded-xl bg-third"
                variant="text"
                density="comfortable"
                width="65px"
                @click="drawer = !drawer"
                >
                <span>類別</span>
                <v-icon>mdi-filter</v-icon>
            </v-btn> -->
            <!-- card -->
            <v-row justify="center" v-for="r in 3" :key="r" class="my-3">
                <v-col cols="12" md="4" lg="2" v-for="c in 4" :key="c">
                    <card></card>
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

    <!-- <div id="create">
    <v-btn
        class="bg-third b-1"
        icon="mdi-plus"
        size="50px"
        variant="text"
        v-bind="activatorProps"
        >
    </v-btn>
    </div> -->
</template>

<script setup>
import { ref } from 'vue'
const drawer =ref(false)
const chips=['兒少','長照','精神','照顧者','就業','育兒','身障','育兒','照顧者','就業','婦女','身障','就業','婦女','其他']

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

</style>