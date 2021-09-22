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
          <th scope="row">中信兄弟</th>
            <template v-if="visitingScores.length">
              <td 
                v-for="score in visitingScores" 
                :key="score.CreateTime">{{score}}
              </td> 
            </template>
            <template v-else>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </template>
          <td>{{visitingRuns}}</td>
          <td>{{visitingHits}}</td>
          <td>{{visitingErrors}}</td>
        </tr>
        <tr class="table-dark" id="home-score">
          <th scope="row">統一獅</th>
            <template v-if="visitingScores.length">
              <td 
                v-for="score in homeScores" 
                :key="score.CreateTime">{{score}}
              </td>   
            </template>
            <template v-else>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </template>
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
  name: 'ScoreBoard202',
  data() {
    return {
      visitingScores: [],
      homeScores: [],
      visitingRuns: 0,
      visitingHits: 0,
      visitingErrors: 0,
      homeRuns: 0,
      homeHits: 0,
      homeErrors: 0
    }
  },
  methods: {
    async fetchScoreBoard() {
      try {
        const { data } = await dataAPI.scoreBoard202()
  
        let visitingScoreMap = new Map()
        let homeScoreMap = new Map()
        data.forEach(item => {
          if(item.VisitingHomeType === '1') {
            // 1. get score
            visitingScoreMap.set(item.InningSeq, item.ScoreCnt)
            // 2. get R,H,E
            this.visitingRuns += item.ScoreCnt
            this.visitingHits += item.HittingCnt
            this.visitingErrors += item.ErrorCnt
          }
          if(item.VisitingHomeType === '2') {
            // 1. get score
            homeScoreMap.set(item.InningSeq, item.ScoreCnt)
            // 2. get R,H,E
            this.homeRuns += item.ScoreCnt
            this.homeHits += item.HittingCnt
            this.homeErrors += item.ErrorCnt
          }
        })

        // map to array
        this.visitingScores = Array.from(visitingScoreMap.values()).reverse()
        this.homeScores = Array.from(homeScoreMap.values()).reverse()

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  created() {
    this.fetchScoreBoard()
  }
}
</script>