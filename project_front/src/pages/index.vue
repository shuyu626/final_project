<template>
    <leaflet-map/>
    <v-card width="500px" variant="outlined" class="overflow-y-auto">
        <v-toolbar color="secondary" prominent >
            <v-toolbar-title>
                服務查詢
            </v-toolbar-title>
        </v-toolbar>
        <v-card-item>
            <search/>
            <v-select  
            width="215px"
            label="縣市"
            class="d-inline-block mr-4"
            density="comfortable"
            :items="city"
            variant="outlined"
            >
            </v-select>
            <v-select  
            width="215px"
            label="鄉鎮市區"
            class="d-inline-block"
            density="comfortable"
            :items="area"
            variant="outlined"
            ></v-select>


            <v-expansion-panels variant="accordion" >
                <v-expansion-panel
                    title="選擇服務"
                >
                <v-expansion-panel-text>
                
                    <v-select
                    v-for="item in items"
                    :label="item.title"
                    :items="item.category"
                    >
                    </v-select>
                </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card-item>
    </v-card>
      <!-- app 固定在頁腳 -->
  <v-footer color="info" height="60px" app></v-footer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const items=[
    {title:'身障',category:['日照中心','全日型住宿機構','輔具中心']},
    {title:'長照',category:['照管中心','共餐服務','輔具中心']},
    {title:'兒少'},
    {title:'婦女'},
    {title:'社會救助'},
    {title:'精神'}
]

const city = ['臺北市','新北市']

</script>
<style scoped>
.v-card{
    height: 650px;
    position: absolute;
    top: 18%;
    right: 10%;
}
  </style>