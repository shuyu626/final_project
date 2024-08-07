<template>
    <v-container>
      <div id="map" ref="map"></div>
    </v-container>
  </template>
  

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import 'leaflet.markercluster'

const initialMap = ref(null);

onMounted(() => {
  // 使用 async 函數來處理異步操作
  const fetchDataAndInitializeMap = async () => {
    // 初始化地圖
    initialMap.value = L.map('map').setView([25.044323702498108, 121.41975163438377], 12);

    // 添加地圖圖層
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(initialMap.value);

    // 自定義地標圖標
    const greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker([25.044323702498108, 121.41975163438377],{icon:greenIcon})
    .addTo(initialMap.value)
    .bindPopup('<h2>泰山職訓局</h2><p>243新北市泰山區貴子里致遠新村55之1號</p>') // 點擊跳出視窗 
    .openPopup() // 直接打開視窗



    // 使用 Axios 請求 JSON 文件
    try {
      const response = await axios.get('/api/public/js/mapdata.json');
      const data = response.data;

      // 將 JSON 資料中的每個地標添加到地圖
    data.forEach((item) => {
      // 先確保經緯度是有效的數字(json格式有誤)
      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lng);

      // 確保經緯度在有效範圍內
      if (isFinite(lat) && isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        L.marker([lat, lng], { icon: greenIcon })
          .addTo(initialMap.value)
          .bindPopup(`<h2>${item.name}</h2>`);
      } else {
        console.warn(`Invalid coordinates for item: ${JSON.stringify(item)}`);
      }
    });
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
};

  fetchDataAndInitializeMap();
});


</script>

<style scoped>
#map {
  width: 1000px;
  height: 650px;
  border: 1px solid #000;
  border-radius: 25px;
  position: absolute;
  top: 18%;
  left: 6%;
}

</style>
