<template>
  <div class="player-board mb-5" v-if="!isLoading">
    <h1 class="text-center bg-success mb-3">成績看板</h1>
    <!-- 隊伍 -->
    <div class="d-flex mb-3">
      <template v-if="nowTeam === gameInfo.visitingTeam">
        <div class="bg-warning flex-fill" style="cursor:pointer;" @click="changeNowTeam(gameInfo.visitingTeam)">
          <h4 class="text-center mt-2" >{{gameInfo.visitingTeam}}</h4>
        </div>
        <div class="bg-secondary flex-fill" style="cursor:pointer;" @click="changeNowTeam(gameInfo.homeTeam)">
          <h4 class="text-center mt-2">{{gameInfo.homeTeam}}</h4>
        </div>
      </template>
      <template v-else>
        <div class="bg-secondary flex-fill" style="cursor:pointer;" @click="changeNowTeam(gameInfo.visitingTeam)">
          <h4 class="text-center mt-2">{{gameInfo.visitingTeam}}</h4>
        </div>
        <div class="bg-warning flex-fill" style="cursor:pointer;" @click="changeNowTeam(gameInfo.homeTeam)">
          <h4 class="text-center mt-2">{{gameInfo.homeTeam}}</h4>
        </div>
      </template>
    </div>
    <!-- 戰況表 visiting -->
    <table class="table table-striped" v-if="nowTeam === gameInfo.visitingTeam">
      <thead class="table-dark">
        <tr>
          <th scope="col" class="text-center">{{gameInfo.visitingTeam}}</th>
          <th scope="col" class="text-center">|</th>
          <th scope="col" class="text-center" v-for="inning in innings" :key="inning">{{inning}}</th>
          <th scope="col" class="text-center"></th>
          <th scope="col" class="text-center">打數</th>
          <th scope="col" class="text-center">安打</th>
          <th scope="col" class="text-center">全壘打</th>
          <th scope="col" class="text-center">打點</th>
          <th scope="col" class="text-center">得分</th>
          <th scope="col" class="text-center">打擊率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in visitingFirstSno" :key="player">
          <th scope="row">
            <span v-if="player.Lineup !== 0">{{player.Lineup}}</span>
            <span v-else style="padding-left:13px;"></span>
            {{player.CHName}}, {{player.DefendStationCode}}
          </th>
          <td class="text-center" v-for="data in visitingPlayerDatas[player.CHName]" :key="data">
            <span>{{data}}</span>
          </td>
          <td></td>
          <td class="text-center" v-for="data in visitingBattingDatas[player.CHName]" :key="data">
            <span>{{data}}</span>
          </td>
        </tr>
      </tbody>
      <tfoot style="background-color:#FFED97;">
        <td>Total</td>
        <td v-for="n in (innings + 2)" :key="n"></td>
        <td class="text-center fw-bold" v-for="(data, key) in totalVisitingDatas" :key="key">{{data}}</td>
        <td></td>
      </tfoot>
    </table>
    <!-- 戰況表 home -->
    <table class="table table-striped" v-else>
      <thead class="table-dark">
        <tr>
          <th scope="col" class="text-center">{{gameInfo.homeTeam}}</th>
          <th scope="col" class="text-center">|</th>
          <th scope="col" class="text-center" v-for="inning in innings" :key="inning">{{inning}}</th>
          <th scope="col" class="text-center"></th>
          <th scope="col" class="text-center">打數</th>
          <th scope="col" class="text-center">安打</th>
          <th scope="col" class="text-center">全壘打</th>
          <th scope="col" class="text-center">打點</th>
          <th scope="col" class="text-center">得分</th>
          <th scope="col" class="text-center">打擊率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in homeFirstSno" :key="player">
          <th scope="row">
            <span v-if="player.Lineup !== 0">{{player.Lineup}}</span>
            <span v-else style="padding-left:13px;"></span>
            {{player.CHName}}, {{player.DefendStationCode}}
          </th>
          <td class="text-center" v-for="data in homePlayerDatas[player.CHName]" :key="data">
            <span>{{data}}</span>
          </td>
          <td></td>
          <td class="text-center" v-for="data in homeBattingDatas[player.CHName]" :key="data">
            <span>{{data}}</span>
          </td>
        </tr>
      </tbody>
      <tfoot style="background-color:#FFED97;">
        <td>Total</td>
        <td v-for="n in 11" :key="n"></td>
        <td class="text-center fw-bold" v-for="data in totalHomeDatas" :key="data">{{data}}</td>
        <td></td>
      </tfoot>
    </table>
  </div>
</template>

<script>
import dataAPI from '../../apis/data'

export default {
  name: 'PlayerBoard',
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
      playDatas: {
        '1': {},
        '2': {}
      },
      visitingPlayerDatas: {},
      homePlayerDatas: {},
      visitingFirstSno: {},
      homeFirstSno: {},
      nowTeam: this.gameInfo.visitingTeam,
      innings: 0,
      visitingBattingDatas: {},
      homeBattingDatas: {}
    }
  },
  methods: {
    async fetchLiveLog(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'LiveLogJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
        
        // 局數（ 9 ~ 12）
        const nowInning = data.data[data.data.length-1].InningSeq
        this.innings = nowInning <= 9 ? 9 : nowInning
        
        // 整理資料
        const visitingPlayerDatas = {}
        const homePlayerDatas = {}
        // const lastInningSeq = data.data[data.data.length-1].InningSeq

        data['data'].forEach(item => {
          if(!item.HitterName) return
          if(item.VisitingHomeType === '1') {
            if(!visitingPlayerDatas[item.HitterName]) {
              const arr = Array.from({length: this.innings + 1}).fill('')
              arr[0] = '|'
              arr[item.InningSeq] = item.BattingActionName
              visitingPlayerDatas[item.HitterName] = arr
            } else {
              visitingPlayerDatas[item.HitterName][item.InningSeq] = item.BattingActionName
            }       
          } else {
            if(!homePlayerDatas[item.HitterName]) {
              const arr = Array.from({length: this.innings + 1}).fill('')
              arr[0] = '|'
              arr[item.InningSeq] = item.BattingActionName
              homePlayerDatas[item.HitterName] = arr
            } else {
              homePlayerDatas[item.HitterName][item.InningSeq] = item.BattingActionName
            } 
          }
          
          this.visitingPlayerDatas = visitingPlayerDatas
          this.homePlayerDatas = homePlayerDatas

        })
      } catch(error) {
        console.error('error', error)
      }
    },
    async fetchFirstSnoJson(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'FirstSnoJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
         
        // 戰況表 player
        const pushedLineUp = {'1': [], '2': []}
        const visitingFirstSno = {}
        const homeFirstSno = {}
        data.data.forEach(item => {
          if(item.Lineup === 0) { return }
          if(item.VisitingHomeType === '1') {
            // defendStationCode, lineup
            let defendStationCode = item.DefendStationCode
            let lineUp = item.Lineup
            // 不是先發 或 先發換守備位置
            if(pushedLineUp[item.VisitingHomeType].includes(item.Lineup)) {
              // 代打 & 代跑
              if(item.PinchHitterRunner === '代打') {
                defendStationCode = '(PH)'
              }
              if(item.PinchHitterRunner === '代跑') {
                defendStationCode = '(PR)'
              }
              if(item.PinchHitterRunner === '') {
                defendStationCode = `(${defendStationCode})`
              }
              lineUp = 0
            }
            // 放入 visitingFirstSno
            if(visitingFirstSno[item.CHName]) {
              visitingFirstSno[item.CHName].DefendStationCode += `${defendStationCode}`
            } else {
              visitingFirstSno[item.CHName] = {
                Lineup: lineUp,
                CHName: item.CHName,
                DefendStationCode: defendStationCode
              }
              if(lineUp === 0) { return }
              pushedLineUp[item.VisitingHomeType].push(lineUp)
            }
          } else {
            // defendStationCode, lineup
            let defendStationCode = item.DefendStationCode
            let lineUp = item.Lineup
            // 不是先發 或 先發換守備位置
            if(pushedLineUp[item.VisitingHomeType].includes(item.Lineup)) {
              // 代打 & 代跑
              if(item.PinchHitterRunner === '代打') {
                defendStationCode = '(PH)'
              }
              if(item.PinchHitterRunner === '代跑') {
                defendStationCode = '(PR)'
              }
              if(item.PinchHitterRunner === '') {
                defendStationCode = `(${defendStationCode})`
              }
              lineUp = 0
            }
            // 放入 visitingFirstSno
            if(homeFirstSno[item.CHName]) {
              homeFirstSno[item.CHName].DefendStationCode += `${defendStationCode}`
            } else {
              homeFirstSno[item.CHName] = {
                Lineup: lineUp,
                CHName: item.CHName,
                DefendStationCode: defendStationCode
              }
              if(lineUp === 0) { return }
              pushedLineUp[item.VisitingHomeType].push(lineUp)
            }
          }
        })

        this.visitingFirstSno = visitingFirstSno
        this.homeFirstSno = homeFirstSno

      } catch (error) {
        console.error('error', error)
      }
    },
    async fetchBattingJson(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'BattingJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
        
        // let visitingPlayerDatas = this.visitingPlayerDatas
        // let homePlayerDatas = this.homePlayerDatas
        let visitingBattingDatas = {}
        let homeBattingDatas = {}
        
        // 刪除重複的資料（網站 bug?）
        const players = [data['data'][0].HitterName]
        const playersData = [data['data'][0]]
        data['data'].forEach(item => {
          if(!players.includes(item.HitterName)) {
            players.push(item.HitterName)
            playersData.push(item)
          }
        })

        playersData.forEach(item => {
          const avg = Math.round((item.TotalHittingCnt/item.TotalHitCnt).toFixed(3) * 1000) / 1000

          if(item.VisitingHomeType === '1') {
            const dataArr = []
            dataArr.push(item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            visitingBattingDatas[item.HitterName] = dataArr

            
            // let dataArr = []
            // if(!visitingPlayerDatas[item.HitterName]) {
            //   if(visitingPlayerDatas['*' + item.HitterName]) {
            //     dataArr = visitingPlayerDatas['*' + item.HitterName]
            //   } else if(visitingPlayerDatas['◎' + item.HitterName]){
            //     dataArr = visitingPlayerDatas['◎' + item.HitterName]
            //   } else {
            //     const arr = Array.from({length: this.innings + 1 }).fill('')
            //     arr[0] = '|'
            //     dataArr = arr
            //   }
            // } else {
            //   dataArr = visitingPlayerDatas[item.HitterName]
            // }

            // dataArr.push('', item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            // visitingPlayerDatas[item.HitterName] = dataArr
          } else {
            const dataArr = []
            dataArr.push(item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            homeBattingDatas[item.HitterName] = dataArr
            // let dataArr = []
            // if(!homePlayerDatas[item.HitterName]) {
            //   if(homePlayerDatas['*' + item.HitterName]) {
            //     dataArr = homePlayerDatas['*' + item.HitterName]
            //   } else if(homePlayerDatas['◎' + item.HitterName]){
            //     dataArr = homePlayerDatas['◎' + item.HitterName]
            //   } else {
            //     const arr = Array.from({length: this.innings + 1 }).fill('')
            //     arr[0] = '|'
            //     dataArr = arr
            //   }
            // } else {
            //   dataArr = homePlayerDatas[item.HitterName]
            // }

            // dataArr.push('', item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            // homePlayerDatas[item.HitterName] = dataArr
          }
        })

        // this.visitingPlayerDatas = visitingPlayerDatas
        // this.homePlayerDatas = homePlayerDatas

        this.visitingBattingDatas = visitingBattingDatas
        this.homeBattingDatas = homeBattingDatas

      } catch (error) {
        console.error('error', error)
      }   
    },
    changeNowTeam(team) {
      this.nowTeam = team
    }
  },
  async created() {
    try {
      this.fetchLiveLog(this.$route.params)
      this.fetchBattingJson(this.$route.params)
      await this.fetchFirstSnoJson(this.$route.params)
      
      this.isLoading = false

      // 傳到 GameDetail 父元件
      this.$emit('loading-finished', 'PlayerBoard')

    } catch (error) {
      console.error('error', error)
    }
  },
  computed: {
    totalVisitingDatas() {
      const datas = this.visitingBattingDatas

      let totalDatas = {
        totalHitCnt: 0,
        totalHittingCnt: 0,
        totalHomeRunCnt: 0,
        totalRunBattedINCnt: 0,
        totalScoreCnt: 0
      }
      for(const key in datas) {
        totalDatas.totalHitCnt += datas[key][0]
        totalDatas.totalHittingCnt += datas[key][1]
        totalDatas.totalHomeRunCnt += datas[key][2]
        totalDatas.totalRunBattedINCnt += datas[key][3]
        totalDatas.totalScoreCnt += datas[key][4]
      }
      return totalDatas
    },
    totalHomeDatas() {
      const datas = this.homeBattingDatas

      let totalDatas = {
        totalHitCnt: 0,
        totalHittingCnt: 0,
        totalHomeRunCnt: 0,
        totalRunBattedINCnt: 0,
        totalScoreCnt: 0
      }
      for(const key in datas) {
        totalDatas.totalHitCnt += datas[key][0]
        totalDatas.totalHittingCnt += datas[key][1]
        totalDatas.totalHomeRunCnt += datas[key][2]
        totalDatas.totalRunBattedINCnt += datas[key][3]
        totalDatas.totalScoreCnt += datas[key][4]
      }
      return totalDatas
    }
  }
}

</script>