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
          <th scope="col" class="text-center" v-for="inning in inningsArr" :key="inning">{{inning}}</th>
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
        </tr>
      </tbody>
      <tfoot style="background-color:#FFED97;">
        <td>Total</td>
        <td v-for="n in (inningsArr.length + 2)" :key="n"></td>
        <td class="text-center fw-bold" v-for="data in totalVisitingDatas" :key="data">{{data}}</td>
        <td></td>
      </tfoot>
    </table>
    <!-- 戰況表 home -->
    <table class="table table-striped" v-else>
      <thead class="table-dark">
        <tr>
          <th scope="col" class="text-center">{{gameInfo.homeTeam}}</th>
          <th scope="col" class="text-center">|</th>
          <th scope="col" class="text-center" v-for="inning in inningsArr" :key="inning">{{inning}}</th>
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
      visitingPlayerDatas: {},
      homePlayerDatas: {},
      visitingFirstSno: [],
      homeFirstSno: [],
      nowTeam: this.gameInfo.visitingTeam,
      inningsArr: []
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
        if(nowInning <= 9) {
          this.inningsArr = Array.from({length: 9}, (_, i) => i+1)
        } else {
          this.inningsArr = Array.from({length: nowInning}, (_, i) => i+1)
        }

        // 整理資料
        const visitingPlayerDatas = {}
        const homePlayerDatas = {}
        // const lastInningSeq = data.data[data.data.length-1].InningSeq

        data['data'].forEach(item => {
          if(!item.HitterName) return
          if(item.VisitingHomeType === '1') {
            if(!visitingPlayerDatas[item.HitterName]) {
              const arr = Array.from({length: this.inningsArr.length + 1}).fill('')
              arr[0] = '|'
              arr[item.InningSeq] = item.BattingActionName
              visitingPlayerDatas[item.HitterName] = arr
            } else {
              visitingPlayerDatas[item.HitterName][item.InningSeq] = item.BattingActionName
            }       
          } else {
            if(!homePlayerDatas[item.HitterName]) {
              const arr = Array.from({length: this.inningsArr.length + 1}).fill('')
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
        const visitingFirstSno = []
        const homeFirstSno = []
        data.data.forEach(item => {
          if(item.VisitingHomeType === '1' && item.Lineup !== 0) {
            visitingFirstSno.push({
              CHName: item.CHName,
              Lineup: item.Lineup,
              DefendStationCode: item.DefendStationCode,
              PinchHitterRunner: item.PinchHitterRunner
            })
          } else if(item.VisitingHomeType === '2' && item.Lineup !== 0) {
            homeFirstSno.push({
              CHName: item.CHName,
              Lineup: item.Lineup,
              DefendStationCode: item.DefendStationCode,
              PinchHitterRunner: item.PinchHitterRunner
            })
          }
        })

        // 處理重複資料 & 代號
        this.visitingFirstSno = this.listFirstSno(visitingFirstSno)
        this.homeFirstSno = this.listFirstSno(homeFirstSno)
        
      } catch (error) {
        console.error('error', error)
      }
    },
    listFirstSno(firstSno) {
      const players = firstSno

      for(let i = 0 ; i < players.length-1 ; i++) {
        // 棒次重複: 有換人
        if(players[i+1]) {
          if(players[i].Lineup === players[i+1].Lineup) {
            players[i+1].Lineup = 0
            if(players[i+1].PinchHitterRunner === '代跑') {
              players[i+1].DefendStationCode = '(PR)'
            }
            if(players[i+1].PinchHitterRunner === '代打') {
              players[i+1].DefendStationCode = '(PH)'
            }
            if(players[i+1].PinchHitterRunner === '') {
              players[i+1].DefendStationCode = `(${players[i+1].DefendStationCode})`
            }
          }
        }
        
        // 名字重複: 沒換人
        if(players[i].CHName === players[i+1].CHName) {
          // 第二個重複的
          if(players[i+1].DefendStationCode) {
            players[i].DefendStationCode += `(${players[i+1].DefendStationCode})`
          }
          players.splice(i+1, 1)
        }

      }
      return players
    },
    async fetchBattingJson(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'BattingJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
        
        let visitingPlayerDatas = this.visitingPlayerDatas
        let homePlayerDatas = this.homePlayerDatas
        
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
            let dataArr = []
            if(!visitingPlayerDatas[item.HitterName]) {
              if(visitingPlayerDatas['*' + item.HitterName]) {
                dataArr = visitingPlayerDatas['*' + item.HitterName]
              } else if(visitingPlayerDatas['◎' + item.HitterName]){
                dataArr = visitingPlayerDatas['◎' + item.HitterName]
              } else {
                const arr = Array.from({length: this.inningsArr.length + 1 }).fill('')
                arr[0] = '|'
                dataArr = arr
              }
            } else {
              dataArr = visitingPlayerDatas[item.HitterName]
            }

            dataArr.push('', item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            visitingPlayerDatas[item.HitterName] = dataArr
          } else {
            let dataArr = []
            if(!homePlayerDatas[item.HitterName]) {
              if(homePlayerDatas['*' + item.HitterName]) {
                dataArr = homePlayerDatas['*' + item.HitterName]
              } else if(homePlayerDatas['◎' + item.HitterName]){
                dataArr = homePlayerDatas['◎' + item.HitterName]
              } else {
                const arr = Array.from({length: this.inningsArr.length + 1 }).fill('')
                arr[0] = '|'
                dataArr = arr
              }
            } else {
              dataArr = homePlayerDatas[item.HitterName]
            }

            dataArr.push('', item.HitCnt, item.HittingCnt, item.HomeRunCnt, item.RunBattedINCnt, item.ScoreCnt, avg.toFixed(3))
            homePlayerDatas[item.HitterName] = dataArr
          }
        })

        this.visitingPlayerDatas = visitingPlayerDatas
        this.homePlayerDatas = homePlayerDatas

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
      await this.fetchLiveLog(this.$route.params)
      await this.fetchFirstSnoJson(this.$route.params)
      await this.fetchBattingJson(this.$route.params)
      
      this.isLoading = false

      // 傳到 GameDetail 父元件
      this.$emit('loading-finished', 'PlayerBoard')

    } catch (error) {
      console.error('error', error)
    }
  },
  computed: {
    totalVisitingDatas() {
      const datas = this.visitingPlayerDatas

      let totalDatas = {
        totalHitCnt: 0,
        totalHittingCnt: 0,
        totalHomeRunCnt: 0,
        totalRunBattedINCnt: 0,
        totalScoreCnt: 0
      }
      for(const key in datas) {
        totalDatas.totalHitCnt += datas[key][datas[key].length-6]
        totalDatas.totalHittingCnt += datas[key][datas[key].length-5]
        totalDatas.totalHomeRunCnt += datas[key][datas[key].length-4]
        totalDatas.totalRunBattedINCnt += datas[key][datas[key].length-3]
        totalDatas.totalScoreCnt += datas[key][datas[key].length-2]
      }
      return totalDatas
    },
    totalHomeDatas() {
      const datas = this.homePlayerDatas

      let totalDatas = {
        totalHitCnt: 0,
        totalHittingCnt: 0,
        totalHomeRunCnt: 0,
        totalRunBattedINCnt: 0,
        totalScoreCnt: 0
      }
      for(const key in datas) {
        totalDatas.totalHitCnt += datas[key][datas[key].length-6]
        totalDatas.totalHittingCnt += datas[key][datas[key].length-5]
        totalDatas.totalHomeRunCnt += datas[key][datas[key].length-4]
        totalDatas.totalRunBattedINCnt += datas[key][datas[key].length-3]
        totalDatas.totalScoreCnt += datas[key][datas[key].length-2]
      }
      return totalDatas
    }
  }
}

</script>