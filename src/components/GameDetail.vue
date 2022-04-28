<script setup>
import { ref, provide } from 'vue' 
import LiveLog from '@/components/GameDetail/LiveLog.vue'
import PlayerBoard from '@/components/GameDetail/PlayerBoard.vue'
import PitcherScore from '@/components/GameDetail/PitcherScore.vue'
import HitterScore from '@/components/GameDetail/HitterScore.vue'
const emit = defineEmits(['loading-finished'])

import { useRoute } from 'vue-router'
import dataAPI from '../apis/data'
const route = useRoute()

// props
const props = defineProps({
  gameInfoInit: Object
})

// data
const isLoading = ref(true)
const view = ref('record')
const gameInfo = ref(props.gameInfoInit)
const componentsLoading = ref([])
const hitters = ref({})

// methods
const changeView = function(newView) {
  view.value = newView
}

const handleLoading = function(isLoading) {
  console.log('isLoading', isLoading)

  const components = componentsLoading.value
  components.push(isLoading)
  componentsLoading.value = components

  if(componentsLoading.value.length === 2) {
    console.log('GameDetail ok')
    // 傳到 Record 父元件
    emit('loading-finished', 'GameDetail')
  }
}

// methods for HitterScore, PlayerBoard
const fetchHitterList = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'FirstSnoJson'
    }

    const { data } = await dataAPI.getData(gameInfos)

    const list = {
      '1': [],
      '2': []
    }
    let playerAcnt = ''
    let lineUp = [0, 0, 0]
    data.data.forEach(player => {
      if(player.DefendStationCode === 'P') return

      // 相同球員(改資料)
      if(player.Acnt === playerAcnt) {
        // 守位, 代打, 代跑
        let code = `(${player.DefendStationCode})`
        if(player.PinchHitterRunner === '代打') {
          code = '(PH)'
        }
        if(player.PinchHitterRunner === '代跑') {
          code = '(PR)'
        }
        list[player.VisitingHomeType][list[player.VisitingHomeType].length-1].code += code
      } else {
        // 新增資料
        const obj = {
          acnt: player.Acnt,
          lineUp: player.Lineup,
          name: player.CHName,
          code: player.DefendStationCode
        }

        // 相同棒次
        if(player.Lineup === lineUp[Number(player.VisitingHomeType)]) {
          // 棒次
          obj.lineUp = ''
          // 守位, 代打, 代跑
          let code = `(${player.DefendStationCode})`
          if(player.PinchHitterRunner === '代打') {
            code = '(PH)'
          }
          if(player.PinchHitterRunner === '代跑') {
            code = '(PR)'
          }
          obj.code = code
        }

        list[player.VisitingHomeType].push(obj)
      }  
      // 記錄上一個 player
      playerAcnt = player.Acnt
      lineUp[Number(player.VisitingHomeType)] = player.Lineup
    })

    hitters.value = list

  } catch(error) {
    console.error('error', error)
  }
}
const fetchBattingData = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'BattingJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    let list1 = hitters.value['1']
    let list2 = hitters.value['2']

    list1 = list1.map(hitter => {
      const player = data.data.find(item => item.HitterAcnt === hitter.acnt)
      return {
        ...hitter,
        ...player
      }
    })    
    list2 = list2.map(hitter => {
      const player = data.data.find(item => item.HitterAcnt === hitter.acnt)
      return {
        ...hitter,
        ...player
      }
    }) 
    hitters.value['1'] = list1
    hitters.value['2'] = list2
  } catch(error) {
    console.error('error', error)
  }
}


// created
async function showView() {
  await fetchHitterList(route.params)
  fetchBattingData(route.params)
  isLoading.value = false
}
showView()

// provide
provide('hitters', hitters)
</script>

<template>
  <div class="game-detail mb-5" v-if="!isLoading">
    <header class="mb-3">
      <span class="fs-3 text-primary">詳細戰況</span>
      <hr style="margin-top:0.5em;color:steelblue;" size="3">
    </header>
    <!-- 按鈕 -->
    <div class="d-flex justify-content-between mb-3">
      <a>
        <button class="btn btn-warning" v-if="view === 'player'">戰況表</button>
        <button class="btn btn-secondary" v-else @click="changeView('player')">戰況表</button>
      </a>
      <a>
        <button class="btn btn-warning" v-if="view === 'record'">文字轉播</button> 
        <button class="btn btn-secondary" v-else @click="changeView('record')">文字轉播</button>
      </a>
      <a>
        <button class="btn btn-warning" v-if="view === 'hitterScore'">打擊成績</button> 
        <button class="btn btn-secondary" v-else @click="changeView('hitterScore')">打擊成績</button>
      </a>
      <a>
        <button class="btn btn-warning" v-if="view === 'pitcherScore'">投手成績</button> 
        <button class="btn btn-secondary" v-else @click="changeView('pitcherScore')">投手成績</button>
      </a>
    </div>
    <!-- 戰況表 -->
    <PlayerBoard :gameInfo="gameInfo" :hitters="hitters" v-show="view === 'player'"/>
    <!-- 文字轉播 -->
    <LiveLog :gameInfo="gameInfo" v-show="view === 'record'" @loading-finished="handleLoading" />
    <!-- 打擊成績 -->
    <HitterScore :gameInfo="gameInfo" v-show="view === 'hitterScore'" @loading-finished="handleLoading" />
    <!-- 投手成績 -->
    <PitcherScore :gameInfo="gameInfo" v-show="view === 'pitcherScore'" @loading-finished="handleLoading" />
  </div>
</template>