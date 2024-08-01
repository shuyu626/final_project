<template>
   <!-- 側邊欄 -->
  <v-navigation-drawer class="bg-primary b-1 text-center" width="200">
    <v-tabs
        v-model="tab"
        color="teal-darken-4"
        direction="vertical"
        show-arrows
      >
        <v-tab prepend-icon="mdi-account" text="基本資料" value="option-1" height="100"></v-tab>
        <v-tab prepend-icon="mdi-lock" text="地標管理" value="option-2" height="100"></v-tab>
        <v-tab prepend-icon="mdi-access-point" text="貼文管理" value="option-3" height="100"></v-tab>
        <v-tab prepend-icon="mdi-home" text="活動收藏" value="option-3" height="100"></v-tab>
      </v-tabs>
  </v-navigation-drawer>
  
  <v-card>
    <div class="d-flex flex-row" style="height: 100vh;">
      <v-container>
        <!-- 麵包屑 - 顯示目前頁面位置 -->
        <breadcrumbs :title="title"></breadcrumbs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="option-1">
            <v-card flat>
              <v-card-text>
               <div id="profile" class="b-1 w-75 text-center mx-auto">
                <v-toolbar color="info" class="mb-10" prominent >
                    <v-toolbar-title class="ms-0">基本資料</v-toolbar-title>
                </v-toolbar>
                  <v-avatar color="info" size="100" class="my-5 b-1"></v-avatar>
                  <template>
                    <v-data-table
                      :headers="headers"
                      :items="plants"
                      density="compact"
                      item-key="name"
                    ></v-data-table>
                  </template>
               </div>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-3">
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
            
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </div>
  </v-card>
</template>
  <script setup>
import { ref } from 'vue';
  const categories = ref([
  { name: '大分類1', subcategories: ['小分類1-1', '小分類1-2', '小分類1-3'] },
  { name: '大分類2', subcategories: ['小分類2-1', '小分類2-2', '小分類2-3'] },
  { name: '大分類3', subcategories: ['小分類3-1', '小分類3-2', '小分類3-3'] }
]);
const title=ref(['會員中心','基本資料'])
const selectedSubcategories = ref([]);
const tab = ref('option-1');

  </script>
  
<style scoped>
 .b-1{
  border: 1px solid #7a7a7a;
}

  </style>
  








  