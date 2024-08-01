<template>
    <v-container>
    <breadcrumbs :title=title></breadcrumbs>
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


            <v-toolbar density="compact">
                <v-toolbar-title>
                        選擇服務
                </v-toolbar-title>
            </v-toolbar>
            <v-expansion-panels  variant="accordion">
                <v-expansion-panel
                v-for="(category, index) in categories"
                :key="index"
                >
                <v-expansion-panel-title>{{ category.name }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-checkbox
                    v-for="(subcategory, subIndex) in category.subcategories"
                    :key="subIndex"
                    v-model="selectedSubcategories"
                    :label="subcategory"
                    :value="subcategory"
                    hide-details
                    ></v-checkbox>
                </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

            <!-- <v-expansion-panels variant="accordion" >
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
            </v-expansion-panels> -->

        </v-card-item>
    </v-card>
      <!-- app 固定在頁腳 -->
  <v-footer color="info" height="60px" app></v-footer>
</v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const title=['資源地圖','服務查詢']
// const items=[
//     {title:'身障',category:['日照中心','全日型住宿機構','輔具中心']},
//     {title:'長照',category:['照管中心','共餐服務','輔具中心']},
//     {title:'兒少'},
//     {title:'婦女'},
//     {title:'社會救助'},
//     {title:'精神'}
// ]


  const categories = ref([
  { name: '身障', subcategories: ['日照中心','全日型住宿機構','輔具中心'] },
  { name: '長照', subcategories: ['照管中心','共餐服務','輔具中心'] },
  { name: '兒少', subcategories: ['青少年服務中心', '家扶中心', '少觀所'] },
  { name: '社會救助', subcategories: ['基金會','社會福利中心'] }
]);
const selectedSubcategories = ref([]);


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