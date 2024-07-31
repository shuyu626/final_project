
<template>
        <!-- 麵包屑 - 顯示目前頁面位置 -->
        <div>
            <v-breadcrumbs 
            :items="title"
            class="ml-15 mt-5"
            >
                <template v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
            </v-breadcrumbs>
        </div> 

        <!-- 物資card -->
        <v-container>
            <v-row class="mx-5">
                <v-col
                v-for="item in filteredItems"
                :key="item.id"
                cols="12"
                sm="6">
                    <v-card width="550px" height="300px" variant="flat">
                        <v-row class="align-content-center">
                            <v-col cols="6 ml-15 ">
                                <v-img src="https://image.presslogic.com/girls.presslogic.com/wp-content/uploads/2020/08/0074KBdTgy1ghkwku1dy5j30dn0dnq4e.jpg?auto=format&w=1053" class="b-1" cover></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-card-title>{{ item.name }}</v-card-title>
                                <v-card-subtitle>{{ item.organitation }}</v-card-subtitle>
                                <v-card-text >需求量：{{ item.number }}</v-card-text>
                                <submitButton text="詳細說明" class="bg-third"></submitButton>
                            </v-col>
                        </v-row>                
                    </v-card>
                </v-col>
            </v-row>
        </v-container>



        <!-- 側邊欄 -->
        <v-navigation-drawer class="bg-primary b-1 text-center" width="300">
            <!-- 新增需求對話框 -->
            <resourceDialog></resourceDialog>
            <search class="bg-white mx-auto mt-5" width="250"></search>
            <v-list-item class="text-h5 font-weight-black text-left ml-2">物資類別</v-list-item>
            <v-divider thickness="2" length="250" class="mx-auto"></v-divider>
            <v-container>
                <v-checkbox
                    v-model="allSelected"
                    label="所有物品"
                    @change="selectAll"
                    hide-details
                    density="comfortable"
                ></v-checkbox>

                <v-checkbox
                    v-for="category in categories"
                    :key="category.name"
                    v-model="category.selected"
                    :label="category.name"
                    @change="filterItems"
                    hide-details
                    class="ml-5 "
                    density="comfortable"
                ></v-checkbox>
            </v-container>
        </v-navigation-drawer>
        






</template>
<script setup>
import { ref, computed, watch } from 'vue';
  


const title=['物資分享','我要募資']

const categories = ref([
    { name: '食品', selected: false },
    { name: '服飾配件', selected: false },
    { name: '日用品', selected: false },
    { name: '家具', selected: false },
    { name: '輔具', selected: false },
    { name: '教育用品', selected: false },
    { name: '嬰幼兒用品', selected: false },
    { name: '休閒用品', selected: false }
    // 添加其他分類
  ]);
  
  const items = ref([
    { id: 1, name: '白米', organitation:'新北市社會局',number:1 , category: '食品' },
    { id: 2, name: '衣服', organitation:'新北市社會局', number:2, category: '服飾配件' },
    { id: 3, name: '牙膏', organitation:'新北市社會局', number:5, category: '日用品' },
    { id: 4, name: '衣櫃', organitation:'新北市社會局', number:1, category: '家具' },
    { id: 5, name: '助行器', organitation:'新北市社會局', number:1, category: '輔具' },
    { id: 6, name: '尿布', organitation:'新北市社會局', number:5, category: '嬰幼兒用品' },
    { id: 6, name: '褲子', organitation:'台北市社會局', number:3, category: '服飾配件' },
    { id: 6, name: '洗髮精', organitation:'新北市社會局', number:10, category: '日用品' }
    // 添加其他物品
  ]);
  
  const allSelected = ref(true);
  const filteredItems = ref([]);
  
  const filterItems = () => {
    if (allSelected.value) {
      filteredItems.value = items.value;
    } else {
      filteredItems.value = items.value.filter((item) =>
        categories.value.some(
          (category) => category.selected && category.name === item.category
        )
      );
    }
  };
  
  watch(
    () => categories.value.map((category) => category.selected),
    () => {
      filterItems();
      allSelected.value = categories.value.every((category) => category.selected);
    },
    { deep: true }
  );
  
  const selectAll = () => {
    categories.value.forEach((category) => {
      category.selected = allSelected.value;
    });
    filterItems();
  };
  
  // 初始篩選
  filterItems();





</script>
<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.v-breadcrumbs{
    position: relative;
    top: 9%;
    left: 1%;
}
.v-row{
    height: 300px;
}
#button{
    position: relative;
    top: 35%;
    left: 60%;
}
</style>