<template>
  <!-- 側邊欄 -->
  <v-navigation-drawer v-if="mobile" v-model="drawer" color="primary" class="b-1">
    <v-list nav>
      <v-list-item
      v-for="item in navItems" 
      :key="item.to"
      :prepend-icon="item.icon" 
      :to="item.to"
      :title="item.text" 
      :active="false"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialogOpen" persistent width="600">
      <!-- <template v-slot:extension> -->
        <v-tabs
        v-model="tabs"
        grow
        class="bg-secondary b-1"
        >
          <v-tab
          :value="1">
          <p class="text-h6">註冊</p>
          </v-tab>
          <v-tab
          :value="2">
          <p class="text-h6">登入</p>
          </v-tab>
        </v-tabs>
      <v-tabs-window v-model="tabs">
        <RegisterForm :closeDialog="closeDialog" @notify="showSnackbar"/>
        <LoginForm :closeDialog="closeDialog" @notify="showSnackbar"/>
      </v-tabs-window>
  </v-dialog>



  <!-- 導覽列 -->
  <v-app-bar color="primary" scroll-behavior="elevate" class="b-1">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">logo</v-btn>
      <v-spacer></v-spacer>
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <template v-for="menu in menus" :key="menu.title">
        <v-menu open-on-hover transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-if="menu.show" v-bind="props" :ripple="false" :prepend-icon="menu.icon" class="font-weight-black pe-1">
              {{ menu.title }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <template v-for="(item, i) in menu.items" :key="i">
              <v-list-item
                v-if="item.show"  
                :to="item.to"
                link
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>


      <template v-for="item in navItems" >
        <v-btn 
        v-if="item.show"
        :key="item.to" 
        :prepend-icon="item.icon" 
        :to="item.to"
        :active="false"
        class="mx-1 font-weight-black pe-1"
        @click="handleItemClick(item)"
        >{{ item.text }}</v-btn>
      </template>
      <v-btn class="ms-8 bg-accent b-1" elevation="2" prepend-icon="mdi-account-arrow-right" v-if="user.isLogin" @click="logout">登出</v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'
const createSnackbar = useSnackbar()
const drawer = ref(false)
const dialogOpen = ref(false)
const tabs = ref(1)

const user = useUserStore()

const menus = computed(() => {
  return [
    {
      title: "資源地圖", icon: 'mdi-map-search', show:user.isLogin,
      items: [
        { to: "/", text: "資源查詢", show:user.isLogin },
        { to: "/map/createMark", text: "新增資源", show: user.isLogin},
      ],
    },
    {
      title: "物資分享", icon: 'mdi-package-variant' , show: user.isLogin,
      items: [
        { to: "/material/find/findMaterial", text: "我要募資" , show:user.isLogin},
        { to: "/material/share/shareMaterial", text: "我要分享" , show:user.isLogin},
      ],
    },
  ];
});



  const navItems=[
    { to: '/', text: '資源地圖', icon: 'mdi-map-search', show:!user.isLogin },
    { to: '/event/findEvent', text: '活動分享', icon: 'mdi-calendar', show:true},
    { to: '/setting', text: '管理', icon: 'mdi-cog', show:user.isLogin },
    { to:'',text:'註冊/登入',icon:'mdi-account-plus', show:!user.isLogin},
    ]

  const handleItemClick = (item) => {
  if (item.text === '註冊/登入') {
    dialogOpen.value = true
  } 
}

const closeDialog = () => {
  dialogOpen.value = false
}


const showSnackbar = (message, color) => {
  createSnackbar({
    text: message,
    snackbarProps: {
      color
    }
  })
}

const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
}

</script>
<style scoped>

.b-1{
  border: 1px solid #7a7a7a;
}
.v-text-field{
  margin: 8px 0 8px 0;
}
.v-footer{
  height: 50px;
  
}
.v-main {
  flex: 1; /* 使主要內容區域占據剩餘空間 */
}
</style>