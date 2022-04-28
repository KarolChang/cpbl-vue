<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../apis/data'
import { teamBigPic } from '../utils/teamPicture'
const route = useRoute()
const emit = defineEmits(['loading-finished'])

// props
defineProps({
  gameInfo: Object
})

// data
const isLoading = ref(true)
const lastLog = ref({})
const teamImg = ref(teamBigPic)

// methods
const fetchLastLiveLog = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'LiveLogJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    let log = data.data[data.data.length-1]
    if(log.Content === '比賽結束') {
      log = data.data[data.data.length-2]
    }

    lastLog.value = log
    isLoading.value = false

    // 傳到 Record 父元件
    emit('loading-finished', 'NowDuel')

  } catch(error) {
    console.error('error', error)
  }
}

// created
fetchLastLiveLog(route.params)
</script>


<template>
  <div class="now-duel mb-3 row" v-if="!isLoading">
    <header class="mb-3">
      <span class="fs-3 text-primary">現在戰況</span>
      <hr style="margin-top:0.8em;color:steelblue;" size="3">
    </header>
    <div class="d-flex justify-content-between row">
      <!-- 兩隊比分 -->
      <div class="d-flex justify-content-between flex-fill col-12 col-sm-4 mb-3">
        <img alt="visiting-logo" :src="teamImg[gameInfo.visitingTeam]" width="100" height="100" class="m-auto">
        <h1 class="fw-bolder m-auto">{{lastLog.VisitingScore}}  :  {{lastLog.HomeScore}}</h1>
        <img alt="home-logo" :src="teamImg[gameInfo.homeTeam]" width="100" height="100" class="m-auto">
      </div>
      <!-- 當前對決 -->
      <div class="ms-3 flex-fill col-12 col-sm-6 mt-3">
        <p>
          <span class="bg-info rounded-pill d-inline-block p-2">P {{lastLog.PitcherName}}</span> vs  
          <span class="bg-success rounded-pill d-inline-block p-2 text-light">H {{lastLog.HitterName}}</span>
        </p>
        <!-- 好壞球＆壘包 -->
        <div class="d-flex">
          <!-- 好壞球 -->
          <div class="me-5">
            <!-- 好球 -->
            <div class="my-2 d-flex justify-content-start">
              <strong class="me-1">S</strong>
              <div class="me-1" v-if="lastLog.StrikeCnt >= 1"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.StrikeCnt >= 2"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.StrikeCnt >= 3"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>            
            </div>
            <!-- 壞球 -->
            <div class="my-2 d-flex justify-content-start">
              <strong class="me-1">B</strong>
              <div class="me-1" v-if="lastLog.BallCnt >= 1"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.BallCnt >= 2"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.BallCnt >= 3"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.BallCnt >= 4"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
            </div>
            <!-- 出局數 -->
            <div class="my-2 d-flex justify-content-start">
              <strong class="me-1">O</strong>
              <div class="me-1" v-if="lastLog.OutCnt >= 1"><i class="fas fa-circle" style="color:red;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
              <div class="me-1" v-if="lastLog.OutCnt >= 2"><i class="fas fa-circle" style="color:red;"></i></div>
              <div class="me-1" v-else><i class="far fa-circle"></i></div>
            </div>
          </div>
          <!-- 壘包 -->
          <div>
            <img v-if="!lastLog.FirstBase && !lastLog.SecondBase && !lastLog.ThirdBase" src="../assets/0.png" alt="base" width="100" hright="100">
            <img v-if="lastLog.FirstBase && !lastLog.SecondBase && !lastLog.ThirdBase" src="../assets/1.png" alt="base" width="100" hright="100">
            <img v-if="!lastLog.FirstBase && lastLog.SecondBase && !lastLog.ThirdBase" src="../assets/2.png" alt="base" width="100" hright="100">
            <img v-if="!lastLog.FirstBase && !lastLog.SecondBase && lastLog.ThirdBase" src="../assets/3.png" alt="base" width="100" hright="100">
            <img v-if="lastLog.FirstBase && lastLog.SecondBase && !lastLog.ThirdBase" src="../assets/1-2.png" alt="base" width="100" hright="100">
            <img v-if="lastLog.FirstBase && !lastLog.SecondBase && lastLog.ThirdBase" src="../assets/1-3.png" alt="base" width="100" hright="100">
            <img v-if="!lastLog.FirstBase && lastLog.SecondBase && lastLog.ThirdBase" src="../assets/2-3.png" alt="base" width="100" hright="100">
            <img v-if="lastLog.FirstBase && lastLog.SecondBase && lastLog.ThirdBase" src="../assets/1-2-3.png" alt="base" width="100" hright="100">
          </div>
        </div>
        <p>{{lastLog.Content}}</p>
      </div>
    </div>
  </div>
</template>