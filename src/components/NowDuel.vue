<template>
  <div class="now-duel mb-5 row" v-if="!isLoading">
    <h1 class="text-center bg-primary">現在戰況</h1>
    <div class="d-flex justify-content-between row">
      <!-- 兩隊比分 -->
      <div class="d-flex justify-content-between flex-fill col-6">
        <img alt="visiting-logo" :src="gameInfo.visitingPicture" width="100" height="100" class="m-auto">
        <h1 class="fw-bolder m-auto">{{lastLog.VisitingScore}}  :  {{lastLog.HomeScore}}</h1>
        <img alt="home-logo" :src="gameInfo.homePicture" width="100" height="100" class="m-auto">
      </div>
      <!-- 當前對決 -->
      <div class="ms-3 flex-fill col-4">
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

<script>
import dataAPI from '../apis/data'

export default {
  props: {
    gameInfo: {
      type: Object,
      default: () => {
        return {
          visitingTeam: '',
          homeTeam: '',
          visitingPicture: '',
          homePicture: '',
          gameStatus: '',
          gameSno: ''
        }
      }
    }
  },
  data() {
    return {
      isLoading: true,
      lastLog: {}
    }
  },
  methods: {
    async fetchLastLiveLog(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'LiveLogJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
        let lastLog = data.data[data.data.length-1]
        if(lastLog.Content === '比賽結束') {
          lastLog = data.data[data.data.length-2]
        }

        this.lastLog = lastLog

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  async created() {
    try {
      await this.fetchLastLiveLog(this.$route.params)
      this.isLoading = false
      // 傳到 Record 父元件
      this.$emit('loading-finished', 'NowDuel')
    } catch (error) {
      console.error('error', error)
    }
  }
}
</script>