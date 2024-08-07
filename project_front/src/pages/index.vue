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
            v-model="selectedCity"
            :items="cities"
            width="215px"
            label="縣市"
            class="d-inline-block mr-4"
            density="comfortable"
            variant="outlined"
            @change="onCityChange"
            >
            </v-select>
            <v-select  
            v-model="selectedArea"
            :items="areas"
            width="215px"
            label="鄉鎮市區"
            class="d-inline-block"
            density="comfortable"
            variant="outlined"
            ></v-select>


            <v-toolbar density="compact">
                <v-toolbar-title class="ms-5 text-body-1">
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
        </v-card-item>
    </v-card>
      <!-- app 固定在頁腳 -->
  <v-footer color="info" height="60px" app></v-footer>
</v-container>
</template>
<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    title: ' | 資源查詢'
  }
})
const title=['資源地圖','服務查詢']
// 服務篩選
  const categories = ref([
  { name: '身障', subcategories: ['日照中心','全日型住宿機構','輔具中心'] },
  { name: '長照', subcategories: ['照管中心','共餐服務','輔具中心'] },
  { name: '兒少', subcategories: ['青少年服務中心', '家扶中心', '少觀所'] },
  { name: '社會救助', subcategories: ['基金會','社會福利中心'] }
]);
const selectedSubcategories = ref([])
// 縣市篩選
const cities = ref([]);
const areas = ref([]);
const cityAreaMap = ref({});
const selectedCity = ref(null);
const selectedArea = ref(null);
// 設定需要的縣市
const requiredCities = ['台北市', '新北市'];
// 加載 JSON 資料
const loadData = async () => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/Wcc723/ac712d2bb5c4e61df99d7c5b7f3746e1/raw/2ebe2f94c3bbbeec254159b7dfe71a007f1696cd/tw-zipcode.json');
    // console.log('Data loaded:', response.data) // 確定有抓到檔案資料
    processData(response.data);
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
};

// 處理數據
const processData = (data) => {
const cityAreaMapping = {};
const cityList = [];

Object.keys(data).forEach(city => {
    if (requiredCities.includes(city)) {
    cityList.push(city);
    cityAreaMapping[city] = Object.keys(data[city]);
    }
});

  // console.log('Cities:', cityList); // 新北市、台北市
  // console.log('City Area Map:', cityAreaMapping); // 台北市、新北市的縣市區域
  cities.value = cityList;
  cityAreaMap.value = cityAreaMapping;
};


// 更新鄉鎮市區選項
const onCityChange = (city) => {
  console.log('Selected City:', city); // 輸出選擇的縣市
  areas.value = cityAreaMap.value[city] || [];
  selectedArea.value = null; // 重置鄉鎮市區選擇
};
watch(selectedCity, (newCity) => {
  onCityChange(newCity);
 })
// 組件掛載時加載數據
onMounted(() => {
  loadData();
});



</script>
<style scoped>
.v-card{
    height: 650px;
    position: absolute;
    top: 18%;
    right: 10%;
}

  </style>