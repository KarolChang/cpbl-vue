<template>
  <div class="game-detail mb-5">
    <h1 class="text-center bg-primary mb-3">比賽詳細戰況</h1>
    <!-- 文字轉播＆成績看板 按鈕 -->
    <div class="d-flex justify-content-evenly mb-3">
      <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'player'">成績看板</button>
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('player')">成績看板</button>
      </a>
      <a>
        <button class="btn btn-warning btn-lg" v-if="view === 'record'">文字轉播</button> 
        <button class="btn btn-secondary btn-lg" v-else @click="changeView('record')">文字轉播</button>
      </a>
    </div>
    <!-- 成績看板 -->
    <PlayerBoard :gameInfo="gameInfo" v-show="view === 'player'" @loading-finished="handleLoading" />
    <!-- 文字轉播 -->
    <LiveLog :gameInfo="gameInfo" v-show="view === 'record'" @loading-finished="handleLoading" />
  </div>
</template>

<script>
import LiveLog from '@/components/GameDetail/LiveLog.vue'
import PlayerBoard from '@/components/GameDetail/PlayerBoard.vue'

export default {
  name: 'GameDetail',
  components: {
    LiveLog,
    PlayerBoard
  },
  props: {
    gameInfoInit: {
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
      view: 'record',
      gameInfo: this.gameInfoInit,
      componentsLoading: []
    }
  },
  methods: {
    changeView(view) {
      this.view = view
    },
    // TODO: 確定 playerboard, livelog 都載入成功
    handleLoading(isLoading) {
      console.log('isLoading', isLoading)

      const componentsLoading = this.componentsLoading
      componentsLoading.push(isLoading)
      this.componentsLoading = componentsLoading
 
      if(this.componentsLoading.length === 2) {
        console.log('GameDetail ok')
        // 傳到 Record 父元件
        this.$emit('loading-finished', 'GameDetail')
      }
    }
  }
}
</script>