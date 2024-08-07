<template>
    <v-container>
    <breadcrumbs :title=title></breadcrumbs>
    <leaflet-map/>
    <v-card width="500px" variant="outlined" class="overflow-y-auto">
        <v-toolbar color="secondary" prominent >
            <v-toolbar-title>
                新增資源
            </v-toolbar-title>
        </v-toolbar>
        <div class="px-6">
            <search class="mx-auto"></search>
            <v-row>
                <!-- 物資名稱 -->
                <v-col cols="12" md="3" class="my-auto text-left ps-6">
                <label class="form-label">服務名稱</label>
                </v-col>
                <v-col cols="12" md="9">
                    <inputText/>
                </v-col>
                <!-- 需求量 -->
                <v-col cols="12" md="3" class="my-auto text-left ps-6">
                <label class="form-label">服務電話</label>
                </v-col>
                <v-col cols="12" md="9">
                    <inputText/>
                </v-col>
                    <!-- 物資類別 -->
                    <v-col cols="12" md="3" class="text-left ps-6">
                <label class="form-label">服務項目</label>
                </v-col>
                <v-col cols="12" md="9">
                    <v-expansion-panels variant="accordion">
                        <v-expansion-panel title="選擇標籤">
                            <v-expansion-panel-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <p>服務對象</p>
                                            <div>
                                                <v-chip-group
                                                    v-model="clients"
                                                    column
                                                    multiple
                                                >
                                                    <v-chip
                                                    v-for="item in client"
                                                    :text="item"
                                                    filter
                                                    density="compact"
                                                    ></v-chip>
                                                </v-chip-group>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <p>社會救助</p>
                                            <div>
                                                <v-chip-group
                                                    v-model="assistances"
                                                    column
                                                    multiple
                                                >
                                                    <v-chip
                                                    v-for="item in assistance"
                                                    :text="item"
                                                    filter
                                                    density="compact"
                                                    ></v-chip>
                                                </v-chip-group>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <p>跨域網絡</p>
                                            <div>
                                                <v-chip-group
                                                    v-model="safetyNets"
                                                    column
                                                    multiple
                                                >
                                                    <v-chip
                                                    v-for="item in safetyNet"
                                                    :text="item"
                                                    filter
                                                    density="compact"
                                                    ></v-chip>
                                                </v-chip-group>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <p>其他</p>
                                            <v-chip-group
                                                    column
                                                    multiple
                                                >
                                                <v-chip
                                                text="其他"
                                                filter
                                                density="compact"
                                                ></v-chip>
                                            </v-chip-group>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <!-- 需求介紹 -->
                <v-col cols="12" md="3" class="text-left ps-6">
                    <label class="form-label">服務介紹</label>
                </v-col>
                <v-col cols="12" md="9">
                    <v-textarea variant="outlined" clearable></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center" >
                    <submitButton class="b-1 bg-accent  mb-8"></submitButton>
                </v-col>
            </v-row>
        </div>
    </v-card>
      <!-- app 固定在頁腳 -->
  <v-footer color="info" height="60px" app></v-footer>
</v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { definePage } from 'vue-router/auto'
const title=['資源地圖','新增資源']

const client = ['長期照顧','身心障礙','婦女','兒童及少年','保護性服務']
const clients= ref('[1, 4]')
const assistances= ref('[1, 4]')
const assistance = ['經濟補助','待用餐']
const safetyNets= ref('[1, 4]')
const safetyNet = ['衛政','社政','警政','勞政','司法','教育']

definePage({
  meta: {
    title: ' | 新建資源'
  }
})


</script>
<style scoped>
.b-1{
border: 1px solid #7a7a7a;
}
.v-card{
    height: 650px;
    position: absolute;
    top: 18%;
    right: 10%;
}
::v-deep .v-expansion-panel__shadow{
    box-shadow:none;
}
.v-expansion-panel{
    border: 1px solid rgb(180, 180, 180);
    .v-chip{
    color:rgb(94, 94, 94);
}
}
::v-deep .v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
    min-height: 48px;
}
::v-deep .v-expansion-panel-title{
    padding: 12px 16px;
    color:gray;
    letter-spacing: 1.2px;
}
::v-deep .v-expansion-panel-text__wrapper{
    padding: 0 8px 0 8px ;
}
p{
    color:rgb(94, 94, 94);
}
.v-col{
    padding: 5px 10px 5px 10px;
}

</style>