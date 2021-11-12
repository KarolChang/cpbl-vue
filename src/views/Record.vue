<script setup>
import { ref, reactive } from 'vue' 
import { useRoute } from 'vue-router'
import NowDuel from '@/components/NowDuel.vue'
import Mvp from '@/components/Mvp.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameDetail from '@/components/GameDetail.vue'
import FirstSnos from '@/components/FirstSnos.vue'
import dataAPI from '../apis/data'
const route = useRoute()

// variables
const gameStatusComponents = {
  "尚未開始": [],
  "先發打序": ['FirstSnos'],
  "比賽中": ['NowDuel', 'ScoreBoard', 'GameDetail'],
  "比賽結束": ['Mvp', 'ScoreBoard', 'GameDetail'],
  "比賽結束/二軍": ['ScoreBoard', 'GameDetail']
}
const componentsLoading = []
const baseUrl = 'https://www.cpbl.com.tw'

// data
const gameInfo = reactive({
  visitingTeam: '',
  homeTeam: '',
  visitingBigPic: '',
  visitingSmallPic: '',
  homeBigPic: '',
  homeSmallPic: '',
  gameStatus: '',
  gameSno: '',
  MvpAcnt: ''
})
const loadingFinished = ref(false)

// methods
const fetchGameInfo = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'CurtGameDetailJson'
    }
    const { data } = await dataAPI.getData(gameInfos)
    
    gameInfo.visitingTeam = data.data.VisitingTeamName
    gameInfo.homeTeam = data.data.HomeTeamName
    gameInfo.visitingBigPic = baseUrl + data.data.VisitingClubBigImgPath
    gameInfo.visitingSmallPic = baseUrl + data.data.VisitingClubSmallImgPath
    gameInfo.homeBigPic = baseUrl + data.data.HomeClubBigImgPath
    gameInfo.homeSmallPic = baseUrl + data.data.HomeClubSmallImgPath
    gameInfo.gameStatus = data.data.GameStatusChi
    gameInfo.gameSno = data.data.GameSno
    gameInfo.MvpAcnt = data.data.MvpAcnt

  } catch(error) {
    console.error('error', error)
  }
}

const handleLoading = function(isLoading) {
  console.log('isLoading', isLoading)
    
  let gameStatus = gameInfo.gameStatus
  if(route.params.kindCode === 'D' && gameStatus === '比賽結束') {
    gameStatus += '/二軍'
  }
  
  const needComponents = gameStatusComponents[gameStatus]
  componentsLoading.push(isLoading)

  if(componentsLoading.length === needComponents.length) {
    console.log('Record ok')
    loadingFinished.value = true
  }
}

// created
const showView = async function() {
  await fetchGameInfo(route.params)
  console.log('gameStatus', gameInfo.gameStatus)
  // 如果比賽尚未開始，就直接載入畫面
  if(gameInfo.gameStatus === '尚未開始' || gameInfo.gameStatus === '取消') {
    loadingFinished.value = true
  }
}
showView()
</script>

<template>
  <div class="loading text-center mt-3" v-show="!loadingFinished">
    <img class="rounded" src="../assets/puipui2.gif" alt="loading..." v-show="!loadingFinished">
  </div>

  <div class="record m-3" v-show="loadingFinished">
    <h2 class="text-warning bg-dark p-2 text-center">{{gameInfo.gameStatus}}</h2>
    <NowDuel 
      v-if="gameInfo.gameStatus === '比賽中'"
      :gameInfo="gameInfo" 
      @loading-finished="handleLoading"
    />

    <Mvp 
      v-if="gameInfo.gameStatus === '比賽結束' && gameInfo.MvpAcnt"
      @loading-finished="handleLoading"
    />
 
    <ScoreBoard
      v-if="gameInfo.gameStatus === '比賽結束' || gameInfo.gameStatus === '比賽中'" 
      :gameInfo="gameInfo"
      @loading-finished="handleLoading"
    />

    <FirstSnos 
      v-if="gameInfo.gameStatus === '先發打序'"
      @loading-finished="handleLoading"
    />

    <GameDetail 
      v-if="gameInfo.gameStatus === '比賽結束' || gameInfo.gameStatus === '比賽中'"
      :gameInfoInit="gameInfo"
      @loading-finished="handleLoading"
    />

  </div>
</template>
