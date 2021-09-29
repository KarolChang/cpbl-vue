<template>
  <div class="loading" v-show="!loadingFinished">
    <template v-for="num in 5" :key="num">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>
  </div>
  <div class="record m-3" v-show="loadingFinished">
    <h2 class="text-warning bg-dark p-2 text-center">比賽狀態：{{gameInfo.gameStatus}}</h2>
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
      v-if="gameInfo.gameStatus === '比賽結束' || gameInfo.gameStatus === '比賽中' || gameInfo.gameStatus === '先發打序'" 
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

<script>
import NowDuel from '@/components/NowDuel.vue'
import Mvp from '@/components/Mvp.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import GameDetail from '@/components/GameDetail.vue'
import FirstSnos from '@/components/FirstSnos.vue'

import dataAPI from '../apis/data'
import { teamPicture } from '../utils/teamPicture'

export default {
  name: 'Record',
  components: {
    NowDuel,
    Mvp,
    ScoreBoard,
    GameDetail,
    FirstSnos
  },
  data() {
    return {
      gameInfo: {},
      gameStatusComponents: {
        "尚未開始": [],
        "先發打序": ['ScoreBoard', 'FirstSnos'],
        "比賽中": ['NowDuel', 'ScoreBoard', 'GameDetail'],
        "比賽結束": ['Mvp', 'ScoreBoard', 'GameDetail'],
        "比賽結束/二軍": ['ScoreBoard', 'GameDetail']
      },
      componentsLoading: [],
      loadingFinished: false
    }
  },
  methods: {
    async fetchTeam(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'CurtGameDetailJson'
        }
        const { data } = await dataAPI.getData(gameInfos)

        this.gameInfo = {
          visitingTeam: data.data.VisitingTeamName,
          homeTeam: data.data.HomeTeamName,
          visitingPicture: teamPicture[data.data.VisitingTeamName],
          homePicture: teamPicture[data.data.HomeTeamName],
          gameStatus: data.data.GameStatusChi,
          gameSno: data.data.GameSno,
          MvpAcnt: data.data.MvpAcnt
        }

      } catch(error) {
        console.error('error', error)
      }
    },
    handleLoading(isLoading) {
      console.log('isLoading', isLoading)
       
      let gameStatus = this.gameInfo.gameStatus
      if(this.$route.params.kindCode === 'D') {
        gameStatus += '/二軍'
      }
      
      const needComponents = this.gameStatusComponents[gameStatus]

      const componentsLoading = this.componentsLoading
      componentsLoading.push(isLoading)
      this.componentsLoading = componentsLoading

      if(this.componentsLoading.length === needComponents.length) {
        console.log('Record ok')
        this.loadingFinished = true
      }
    }
  },
  async created() {
    try {
      await this.fetchTeam(this.$route.params)
      // 如果比賽尚未開始，就直接載入畫面
      if(this.gameInfo.gameStatus === '尚未開始') {
        this.loadingFinished = true
      }
    } catch (error) {
      console.error('error', error)
    }
  }
}
</script>