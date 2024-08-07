<template>
    <v-container>
        <breadcrumbs :title=title></breadcrumbs>
        <v-row justify-center>
            <v-col cols="5" class="d-flex justify-center">
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNlVaFU3cBbdbxTq418H6qsT1F9NB_eem9_Q&s" class="b-1" max-width="450" max-height="500" cover></v-img>
            </v-col>
            <v-col cols="5">
                <v-card variant="flat">
                    <v-card-title class="font-weight-black">生活好便利~手機APP使用實務講座</v-card-title>
                    <v-divider thickness="0"></v-divider>
                    <v-card-text v-for="item in cardtext" :key="item">{{ item }}</v-card-text>
                    <AppButton prepend-icon="mdi-bookmark" text="我要收藏" class="me-15 bg-third"></AppButton>
                </v-card>
            </v-col>
        </v-row justify-center class="flex-column">
            <v-col>
                <h2 class="info">活動介紹</h2>
            </v-col>
            <v-col>
                <div class="b-1 info pa-4">
                    <p >   
                        現在『QRcode』越來越普及，大家知道怎麼掃描查看訊息嗎？出門擔心迷路、不會看地圖、不知道怎麼到達目的地、該搭哪班公車回家......讓我們來認識外出好幫手『Google 地圖』吧！<br>
                        ｜活動時間｜113 / 08 / 20 (二) 14:00 ~ 16:30<br>
                        ｜活動對象｜設籍且實際居住新北市，6歲以上身心障礙者，限20位。<br>
                        ｜活動地點｜新北市立圖書館總館 5樓研習教室 (新北市板橋區貴興路139號)。<br>
                        ｜活動費用｜免費，參加者會贈送小禮物！<br>
                        需自備智慧型手機，且手機內下載/更新完成Google地圖<br>
                        ｜活動流程｜<br>
                        14:00~14:15 報到時間<br>
                        14:15~14:30 福利宣導時間<br>
                        14:30~16:30 課程教學<br>
                        電話報名：(02)2960-1071<br>
                        網路報名：https://reurl.cc/xaReQe
                    </p>
                </div>
            </v-col>
        <v-row>
            
        </v-row>
    </v-container>
</template>
<script setup>
    const title=['活動分享','活動詳情']
    const cardtext = [
        '活動時間',
        '2024-07-13(六)9:30~11:30',
        '活動地點',
        '新北市立圖書館總館 5樓研習教室 (新北市板橋區貴興路139號)',
        '活動對象',
        '設籍且實際居住新北市，6歲以上身心障礙者，限20位',
        '主辦單位',
        '新北市樂智身心障礙者服務中心',
        '報名方式',
        '來電報名，電話(02)2960-1071'
    ]
</script>


<style scoped>
.b-1{
  border: 1px solid #7a7a7a;
}
.v-container{
    padding: 0 5rem 0 5rem;
}
.v-card-title{
    padding-left: 9px;
    font-size: 30px;
}
.v-card-text{
    padding: 9px;
    &:nth-child(even){
        color:#87b3b0;
        font-size: 20px;
        }
    &:nth-child(odd){
    font-size: 16px;
    }
}
.info{
    margin: 0 6rem 0 6rem ;
}
.v-btn{
    position: absolute;
    right: 4%;
    bottom: 1%;
}

</style>