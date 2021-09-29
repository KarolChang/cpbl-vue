<template>
  <div class="score-board mb-5" v-if="!isLoading">
    <!-- 計分板 -->
    <h1 class="text-center bg-primary">計分板</h1>
    <table class="table">
      <thead>
        <tr class="table-info">
          <th scope="col">#{{gameInfo.gameSno}}</th>
          <th scope="col" v-for="inning in (boardInfo['1'].length-3)" :key="inning">{{inning}}</th>
          <th scope="col">R</th>
          <th scope="col">H</th>
          <th scope="col">E</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-dark" id="visiting-score" v-for="(scores, key) in boardInfo" :key="scores">
          <th scope="row" v-if="key === '1'">{{gameInfo.visitingTeam}}</th>
          <th scope="row" v-else>{{gameInfo.homeTeam}}</th>
          <td v-for="score in scores" :key="score">{{score}}</td>    
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dataAPI from '../apis/data'

export default {
  name: 'ScoreBoard',
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
      // 1: visiting, 2: home
      boardInfo: {
        '1': [],
        '2': []
      }
    }
  },
  methods: {
    async fetchScoreBoard(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'ScoreboardJson'
        }

        const { data } = await dataAPI.getData(gameInfos)

        // boardInfo
        const innings = data.data[0].InningSeq <= 9 ? 9 : data.data[0].InningSeq

        const boardInfo = {
          '1': Array.from({ length: innings }).fill(''),
          '2': Array.from({ length: innings }).fill('')
        }
        boardInfo['1'].push(0, 0, 0)
        boardInfo['2'].push(0, 0, 0)

        data.data.forEach((item, index) => {
          // R, H, E
          boardInfo[item.VisitingHomeType][boardInfo[item.VisitingHomeType].length-3] += item.ScoreCnt
          boardInfo[item.VisitingHomeType][boardInfo[item.VisitingHomeType].length-2] += item.HittingCnt
          boardInfo[item.VisitingHomeType][boardInfo[item.VisitingHomeType].length-1] += item.ErrorCnt
          
          // 如果最新一半局的分數是0 & '比賽中' 就先不要顯示
          if(index === 0 && item.ScoreCnt === 0 && this.gameInfo.gameStatus === '比賽中') {
            return
          }

          // Scores
          boardInfo[item.VisitingHomeType][item.InningSeq-1] = item.ScoreCnt
   
        })

        // 如果最後一局不用打，score 改成 X
        if(this.gameInfo.gameStatus === '比賽結束' && boardInfo['2'][boardInfo['2'].length-3] > boardInfo['1'][boardInfo['1'].length-3]) {
          boardInfo['2'][boardInfo['2'].length-4] = 'X'
        }

        this.boardInfo = boardInfo

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  async created() {
    try {
      await this.fetchScoreBoard(this.$route.params)
      this.isLoading = false
      // 傳到 Record 父元件
      this.$emit('loading-finished', 'ScoreBoard')
    } catch (error) {
      console.error('error', error)
    }
  }
}
</script>