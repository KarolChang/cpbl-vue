<template>
  <div class="score-board">
    <!-- 計分板 -->
    <h1>計分板</h1>
    <table class="table">
      <thead>
        <tr class="table-info">
          <th scope="col">#</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">R</th>
          <th scope="col">H</th>
          <th scope="col">E</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-dark" id="visiting-score" >
          <th scope="row">{{visitingTeam}}</th>
          <td 
            v-for="score in visitingScores" 
            :key="score.CreateTime">
              <span v-if="score !== 'now'">{{score}}</span>
          </td>    
          <td>{{visitingRuns}}</td>
          <td>{{visitingHits}}</td>
          <td>{{visitingErrors}}</td>
        </tr>
        <tr class="table-dark" id="home-score">
          <th scope="row">{{homeTeam}}</th>
          <td 
            v-for="score in homeScores" 
            :key="score.CreateTime">
              <span v-if="score !== 'now'">{{score}}</span>
          </td>  
          <td>{{homeRuns}}</td>
          <td>{{homeHits}}</td>
          <td>{{homeErrors}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dataAPI from '../apis/data'

export default {
  name: 'ScoreBoard',
  data() {
    return {
      visitingTeam: '',
      homeTeam: '',
      visitingScores: [],
      homeScores: [],
      visitingRuns: 0,
      visitingHits: 0,
      visitingErrors: 0,
      homeRuns: 0,
      homeHits: 0,
      homeErrors: 0,
      gameStatus: ''
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
        
        // 比賽隊伍
        this.visitingTeam = data.data.VisitingTeamName
        this.homeTeam = data.data.HomeTeamName
        
        // 比賽狀態
        this.gameStatus = data.data.GameStatusChi

      } catch(error) {
        console.error('error', error)
      }
    },
    async fetchScoreBoard(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'ScoreboardJson'
        }
        const { data } = await dataAPI.getData(gameInfos)
        // 1. get ScoreBoard
        let visitingScoreMap = new Map()
        let homeScoreMap = new Map()
        data['data'].forEach((item, index) => {
          // 如果最新一半局的分數是0，就先不要顯示
          let now = (index === 0 && item.ScoreCnt === 0 && this.gameStatus !== '比賽結束') ? 1 : 0
          if(item.VisitingHomeType === '1') {
            // (1) get score
            const score = now ? 'now' : item.ScoreCnt
            visitingScoreMap.set(item.InningSeq, score)
            // (2) get R,H,E
            this.visitingRuns += item.ScoreCnt
            this.visitingHits += item.HittingCnt
            this.visitingErrors += item.ErrorCnt
          }
          if(item.VisitingHomeType === '2') {
            // 1. get score
            const score = now ? 'now' : item.ScoreCnt
            homeScoreMap.set(item.InningSeq, score)
            // 2. get R,H,E
            this.homeRuns += item.ScoreCnt
            this.homeHits += item.HittingCnt
            this.homeErrors += item.ErrorCnt
          }
        })

        // 如果最後一局不用打，score 改成 X
        if(this.gameStatus === '比賽結束' && this.homeRuns > this.visitingRuns) {
          homeScoreMap.set(homeScoreMap.size, 'X')
        }

        // map to array
        let visitingScoreArr = Array.from(visitingScoreMap.values()).reverse()
        let homeScoreArr = Array.from(homeScoreMap.values()).reverse()

        if(visitingScoreArr.length < 9) {
          const count = 9 - visitingScoreArr.length
          visitingScoreArr = visitingScoreArr.concat(Array.from({length:count}, () => ''))
        }
        if(homeScoreArr.length < 9) {
          const count = 9 - homeScoreArr.length
          homeScoreArr = homeScoreArr.concat(Array.from({length:count}, () => ''))
        }

        this.visitingScores = visitingScoreArr
        this.homeScores = homeScoreArr

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  async created() {
    try {
      await this.fetchTeam(this.$route.params)
      await this.fetchScoreBoard(this.$route.params)
    } catch (error) {
      console.error('error', error)
    }
  }
}
</script>