<template>
<v-expansion-panels>
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
        ></v-checkbox>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
  <script setup>
  import { ref, computed, watch } from 'vue';
  const categories = ref([
  { name: '大分類1', subcategories: ['小分類1-1', '小分類1-2', '小分類1-3'] },
  { name: '大分類2', subcategories: ['小分類2-1', '小分類2-2', '小分類2-3'] },
  { name: '大分類3', subcategories: ['小分類3-1', '小分類3-2', '小分類3-3'] }
]);

const selectedSubcategories = ref([]);
  </script>
  
  <style scoped>
  /* 添加樣式 */
  </style>
  








  