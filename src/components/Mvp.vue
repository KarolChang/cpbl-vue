<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../apis/data'
const route = useRoute()
const emit = defineEmits(['loading-finished'])

// data
const isLoading = ref(true)
const mvpInfo = ref({})

// methods
const fetchAfterGameInfo = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'CurtGameDetailJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    
    // 處理比賽時間
    // let gameDuringTime = data.data.GameDuringTime
    // gameDuringTime = `${gameDuringTime[1]}小時${gameDuringTime[2]}${gameDuringTime[3]}分鐘`

    // this.afterGameInfo = {
    //   AudienceCnt: data.data.AudienceCnt,
    //   Briefing: data.data.Briefing,
    //   FieldAbbe: data.data.FieldAbbe,
    //   GameDuringTime: gameDuringTime
    // }

    mvpInfo.value = {
      MvpCnt: data.data.MvpCnt,
      // 打者
      HitterName: data.data.HitterName,
      HittingCnt: data.data.HittingCnt,
      RunBattedInCnt: data.data.RunBattedInCnt,
      ScoreCnt: data.data.ScoreCnt,
      HitCnt: data.data.HitCnt,
      HomeRunCnt: data.data.HomeRunCnt,
      // 投手
      PitcherName: data.data.PitcherName,
      InningPitchedCnt: data.data.InningPitchedCnt,
      InningPitchedDiv3Cnt: data.data.InningPitchedDiv3Cnt,
      StrikeOutCnt: data.data.StrikeOutCnt,
      RunCnt: data.data.RunCnt
    }

    isLoading.value = false

    // 傳到 Record 父元件
    emit('loading-finished', 'Mvp')

  } catch(error) {
    console.error('error', error)
  }  
}

// created
fetchAfterGameInfo(route.params)
</script>


<template>
  <div class="mvp mb-5" v-if="!isLoading">
    <h1 class="text-center bg-primary">MVP</h1>
    <div class="d-flex justify-content-between row mx-1">
      <!-- 投手 -->
      <div v-if="mvpInfo.PitcherName" class="flex-fill col-4 border border-2">
        <h2 class="text-center text-success mt-2">{{mvpInfo.PitcherName}}</h2>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>當年度獲選MVP次數</div>
          <div>{{mvpInfo.MvpCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>投球局數</div>
          <div v-if="mvpInfo.InningPitchedDiv3Cnt">{{mvpInfo.InningPitchedCnt}} {{mvpInfo.InningPitchedDiv3Cnt + '/3'}}</div>
          <div v-else>{{mvpInfo.InningPitchedCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>奪三振數</div>
          <div>{{mvpInfo.StrikeOutCnt}}</div>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <div>失分數</div>
          <div>{{mvpInfo.RunCnt}}</div>
        </div>
      </div>
      <!-- 打擊者 -->
      <div v-else class="flex-fill col-4 border border-2">
        <h2 class="text-center text-success mt-2">{{mvpInfo.HitterName}}</h2>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>當年度獲選MVP次數</div>
          <div>{{mvpInfo.MvpCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>打數</div>
          <div>{{mvpInfo.HitCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>打點</div>
          <div>{{mvpInfo.RunBattedInCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>得分</div>
          <div>{{mvpInfo.ScoreCnt}}</div>
        </div>
        <div class="d-flex justify-content-between border-bottom mb-2">
          <div>安打</div>
          <div>{{mvpInfo.HittingCnt}}</div>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <div>全壘打</div>
          <div>{{mvpInfo.HomeRunCnt}}</div>
        </div>
      </div>
        <!-- 比賽時間/觀眾人數 -->
        <!-- <div class="flex-fill col-4 border border-2">
          <p>比賽時間: {{afterGameInfo.GameDuringTime}}</p>
          <p>觀眾人數: {{afterGameInfo.AudienceCnt}}</p>
        </div> -->
      <!-- 賽後簡報 -->
      <!-- <div class="flex-fill col-4 border border-2">
        <h1>賽後簡報</h1>
        <div v-html="afterGameInfo.Briefing"></div>
      </div> -->
    </div>
  </div>
</template>