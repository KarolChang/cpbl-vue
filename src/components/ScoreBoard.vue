<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../apis/data'
const route = useRoute()
const emit = defineEmits(['loading-finished'])

// props
const props = defineProps({
  gameInfo: Object
})

// data
const isLoading = ref(true)
// 1: visiting, 2: home
const boardInfo = ref({
  '1': [],
  '2': []
})

// methods
const fetchScoreBoard = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'ScoreboardJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    
    // board
    const innings = data.data[0].InningSeq <= 9 ? 9 : data.data[0].InningSeq

    const board = {
      '1': Array.from({ length: innings }).fill(''),
      '2': Array.from({ length: innings }).fill('')
    }
    board['1'].push(0, 0, 0)
    board['2'].push(0, 0, 0)

    data.data.forEach((item, index) => {
      // R, H, E
      board[item.VisitingHomeType][board[item.VisitingHomeType].length-3] += item.ScoreCnt
      board[item.VisitingHomeType][board[item.VisitingHomeType].length-2] += item.HittingCnt
      board[item.VisitingHomeType][board[item.VisitingHomeType].length-1] += item.ErrorCnt
      
      // 如果最新一半局的分數是0 & '比賽中' 就先不要顯示
      if(index === 0 && item.ScoreCnt === 0 && props.gameInfo.gameStatus === '比賽中') {
        return
      }

      // Scores
      board[item.VisitingHomeType][item.InningSeq-1] = item.ScoreCnt

    })

    // 如果最後一局不用打，score 改成 X
    // visitingScore => 1~(9-12)局的總分,  homeScore => 1~(8-11)局的總分
    const visitingScore =  board['1'].slice(0, board['1'].length-3).reduce((a, b) => a + b)
    const homeScore = board['2'].slice(0, board['2'].length-4).reduce((a, b) => a + b)
    if(props.gameInfo.gameStatus === '比賽結束' && (homeScore > visitingScore)) {
      board['2'][board['2'].length-4] = 'X'
    }

    boardInfo.value = board
    isLoading.value = false
    
    // 傳到 Record 父元件
    emit('loading-finished', 'ScoreBoard')

  } catch(error) {
    console.error('error', error)
  }
}

// created
fetchScoreBoard(route.params)
</script>

<template>
  <div class="score-board mb-3" v-if="!isLoading">
    <!-- 計分板 -->
    <header class="mb-3">
      <span class="fs-3 text-primary">計分板</span>
      <hr style="margin-top:0.5em;color:steelblue;" size="3">
    </header>
    <div class="d-flex justify-content-center">
      <table class="table locked">
        <thead>
          <tr class="table-info">
            <th scope="col">#{{gameInfo.gameSno}}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-dark">
            <th scope="row" class="com">{{gameInfo.visitingTeam}}</th>
            <th scope="row" class="mobile" style="padding:5px;">
              <img :src="gameInfo.visitingSmallPic" alt="visiting-logo" width="25" height="25">
            </th>
          </tr>
          <tr class="table-dark">
            <th scope="row" class="com">{{gameInfo.homeTeam}}</th>
            <th scope="row" class="mobile" style="padding:5px;">
              <img :src="gameInfo.homeSmallPic" alt="home-logo" width="25" height="25">
            </th>
          </tr>
        </tbody>
      </table>

      <table class="table movable">
        <thead>
          <tr class="table-info">
            <th scope="col" v-for="inning in (boardInfo['1'].length-3)" :key="inning">{{inning}}</th>
            <th scope="col">R</th>
            <th scope="col">H</th>
            <th scope="col">E</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-dark" id="visiting-score" v-for="scores in boardInfo" :key="scores">
            <td v-for="score in scores" :key="score">{{score}}</td>    
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
th, td {
  text-align: center;
  min-width: 50px;
  white-space: pre;
}

@media screen and (max-width: 500px) {
  table[class~="locked"] {
    min-width: 20%;
  }
  table[class~="movable"] {
    display: block;
    overflow: auto;
    min-width: 70%;
  }
  th[class~="com"] {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  table[class~="locked"] {
    min-width: 10%;
  }
  table[class~="movable"] {
    display: block;
    overflow: auto;
    min-width: 70%;
  }
  th[class~="mobile"] {
    display: none;
  }
}
</style>