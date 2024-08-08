<template>
    <v-card width="280px" height="350px" variant="flat" color="third" class="b-1">
        <v-card-item class="p-5 text-left">
            <v-img :src="image" class="mt-2 mb-2 b-1 bg-white" height="200" rounded cover></v-img>
            <v-card-title class="font-weight-black " style="font-size: 1.1rem;width: 215px;word-wrap: break-word;">
                <router-link :to="'/event/'+ _id">
                    {{ title }}
                </router-link>
            </v-card-title>
            <v-card-subtitle style="width: 200px;" class="font-weight-black" >{{ organizer }}</v-card-subtitle>
            <v-chip density="compact" class="mt-2 me-1" v-for="item in category" :key="item">{{ item }}</v-chip>
            <v-btn
                color="medium-emphasis"
                icon="mdi-bookmark"
                size="large"
                variant="plain"
                :ripple="false"
            ></v-btn>
        </v-card-item>
    </v-card>

</template>
<script setup>
defineProps(['_id','title','date','address','category','organizer','description','image']);
// defineProps({
//   title:{ type:String, default:'七月徵才活動'}, 
//   subtitle:{ type:String, default:'新北市社會局'}, 
//   image: { type:String, default:'https://image.presslogic.com/girls.presslogic.com/wp-content/uploads/2020/08/0074KBdTgy1gh3katpy2sj30n00n0n05.jpg?auto=format&w=1053'},
//   chips: { type:Array, default:['就業','身障']}
// },['_d']);
</script>
<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.v-btn{
    position: absolute;
    right: 1%;
    bottom: 21%;
}
</style>