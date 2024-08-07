<template>

  
  <!-- permanent 永久固定在邊邊 -->
  <v-navigation-drawer color="info" class="b-1">
    <v-list>
      <v-list-item>
        <v-list-item :prepend-avatar="avatar" class="text-h6 font-weight-black">管理者</v-list-item>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item
      class="text-body-1"
      v-for="item in navItems" 
      :key="item.to"
      :prepend-icon="item.icon" 
      :to="item.to"
      :title="item.text" 
      :active="false"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  
  <!-- 主要內容區域 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>






  const menuItems=[
    { to: '/event', text: '資源地圖', icon: 'mdi-map-search' },
    { to: '/findResource', text: '物資分享', icon: 'mdi-gift' }
  ]
  const navItems=[
    { to: '/findEvent', text: '用戶管理', icon: 'mdi-account-edit'},
    { to: '/admin', text: '頁面管理', icon: 'mdi-book-open-page-variant' },
    { to:'/',text:'資源地圖',icon:'mdi-map-marker-right'},
    { to:'/',text:'活動分享',icon:'mdi-calendar-edit'},
    { to:'/',text:'物資分享',icon:'mdi-archive-edit'}
  ]

  const avatar = computed(() => {
  return `https://api.multiavatar.com/222.png`
})
</script>
