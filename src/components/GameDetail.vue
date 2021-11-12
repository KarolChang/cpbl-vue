<script setup>
import { ref } from 'vue' 
import LiveLog from '@/components/GameDetail/LiveLog.vue'
// import PlayerBoard from '@/components/GameDetail/PlayerBoard.vue'
import PitcherScore from '@/components/GameDetail/PitcherScore.vue'
const emit = defineEmits(['loading-finished'])

// props
const props = defineProps({
  gameInfoInit: Object
})

// data
const view = ref('record')
const gameInfo = ref(props.gameInfoInit)
const componentsLoading = ref([])

// methods
const changeView = function(newView) {
  view.value = newView
}

const handleLoading = function(isLoading) {
  console.log('isLoading', isLoading)

  const components = componentsLoading.value
  components.push(isLoading)
  componentsLoading.value = components

  if(componentsLoading.value.length === 1) {
    console.log('GameDetail ok')
    // 傳到 Record 父元件
    emit('loading-finished', 'GameDetail')
  }
}
</script>

<template>
  <div class="game-detail mb-5">
    <h1 class="text-center bg-primary mb-3">比賽詳細戰況</h1>
    <!-- 文字轉播＆成績看板 按鈕 -->
    <div class="d-flex justify-content-evenly mb-3">
      <!-- <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'player'">成績看板</button>
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('player')">成績看板</button>
      </a> -->
      <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'record'">文字轉播</button> 
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('record')">文字轉播</button>
      </a>
      <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'hitterScore'">打擊成績</button> 
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('hitterScore')">打擊成績</button>
      </a>
      <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'pitcherScore'">投手成績</button> 
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('pitcherScore')">投手成績</button>
      </a>
    </div>
    <!-- 成績看板 -->
    <!-- <PlayerBoard :gameInfo="gameInfo" v-show="view === 'player'" @loading-finished="handleLoading" /> -->
    <!-- 文字轉播 -->
    <LiveLog :gameInfo="gameInfo" v-show="view === 'record'" @loading-finished="handleLoading" />
    <!-- 打擊成績 -->
    <!-- <PitcherScore :gameInfo="gameInfo" v-show="view === 'pitcherScore'" /> -->
    <!-- 投手成績 -->
    <PitcherScore :gameInfo="gameInfo" v-show="view === 'pitcherScore'" />
  </div>
</template>