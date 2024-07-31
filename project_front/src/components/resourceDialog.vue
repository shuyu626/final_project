<template>
     <v-dialog max-width="600">
        <!-- activatorProps 是由 v-dialog 提供的綁定道具，確保觸發器按鈕與對話框的打開狀態相關聯 -->
        <template #activator="{ props: activatorProps }">
            <v-btn
            prepend-icon="mdi-plus"
            class="rounded-lg bg-info b-1 font-weight-black text-body-1 mt-10"
            variant="text"
            height="50"
            width="150"
            v-bind="activatorProps"
            id="create"
            >
                發布需求
            </v-btn>
        </template>
            <!-- 定義了對話框打開時顯示的內容。插槽道具 { isActive } 用於控制對話框的打開和關閉狀態 -->
            <template #default="{ isActive }">
                <v-card>
                    <v-container>
                        <v-card-title class="font-weight-black text-center text-h4">發布需求</v-card-title>   
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
                                    <label class="form-label">物資名稱</label>
                                    </v-col>
                                    <v-col cols="12" md="9">
                                        <inputText/>
                                    </v-col>
                                    <!-- 需求量 -->
                                    <v-col cols="12" md="3" class="my-auto text-center">
                                    <label class="form-label">需求量</label>
                                    </v-col>
                                    <v-col cols="12" md="9">
                                        <inputText/>
                                    </v-col>
                                     <!-- 活動對象 -->
                                     <v-col cols="12" md="3" class="my-auto text-center">
                                    <label class="form-label">物資類別</label>
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
                                    <!-- 需求介紹 -->
                                    <v-col cols="12" md="3" class="my-auto text-center">
                                        <label class="form-label" >需求介紹</label>
                                    </v-col>
                                    <v-col cols="12" md="9">
                                        <inputText/>
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
</template>

<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.form-label{
    font-size: 20px;
    font-weight: bold;
    color: rgb(80, 80, 80);
}
</style>