<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../../apis/data'
const route = useRoute()
const emit = defineEmits(['loading-finished'])
import { teamEnglish } from '../../utils/teamEnglish'

// props
const props = defineProps({
  gameInfo: Object,
  hitters: Object
})
console.log('props', props)

// data
const isLoading = ref(true)
const hittersPlay = ref({})
const innings = ref()
const inningsForV = ref([])
const inningsForH = ref([])
const checkScore = ref({})

// methods
const fetchPlayerHit = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'LiveLogJson'
    }

    const { data } = await dataAPI.getData(gameInfos)

    innings.value = data.data[data.data.length-1].InningSeq
    
    let playerData = {}
    let lastPlayerAcnt = ''
    let inningSetForV = -1
    let inningSetForH = -1
    data.data.forEach(item => {
      if(lastPlayerAcnt === item.HitterAcnt) return
      if(item.VisitingHomeType === '1') {
        if(!playerData[item.HitterAcnt]) {
          const arr = Array.from({ length: innings.value }).fill('')
          arr[item.InningSeq+inningSetForV] = item.BattingActionName
          playerData[item.HitterAcnt] = arr
        } else {
          // 判斷同一局,同一人有2次打擊結果
          if(playerData[item.HitterAcnt][item.InningSeq+inningSetForV]) {
            inningSetForV += 1
            playerData[item.HitterAcnt][item.InningSeq+inningSetForV] = item.BattingActionName
            // inningsForV 也要保留空格
            if(!inningsForV.value.length) {
              const inningsArr = Array.from({length: innings.value }, (_, i) => i+1)
              inningsArr.splice(item.InningSeq+inningSetForV, 0, '') 
              inningsForV.value = inningsArr
            } else {
              const inningsArr = inningsForV.value
              inningsArr.splice(item.InningSeq+inningSetForV, 0, '') 
              inningsForV.value = inningsArr
            }
          } else {
            playerData[item.HitterAcnt][item.InningSeq+inningSetForV] = item.BattingActionName
          }
        }
      } else {
        if(!playerData[item.HitterAcnt]) {
          const arr = Array.from({ length: innings.value }).fill('')
          arr[item.InningSeq+inningSetForH] = item.BattingActionName
          playerData[item.HitterAcnt] = arr
        } else {
          // 判斷同一局,同一人有2次打擊結果
          if(playerData[item.HitterAcnt][item.InningSeq+inningSetForH]) {
            inningSetForH += 1
            playerData[item.HitterAcnt][item.InningSeq+inningSetForH] = item.BattingActionName
            // inningsForH 也要保留空格
            if(!inningsForH.value.length) {
              const inningsArr = Array.from({length: innings.value }, (_, i) => i+1)
              inningsArr.splice(item.InningSeq+inningSetForH, 0, '') 
              console.log('inningsArr', inningsArr)
              inningsForH.value = inningsArr
              console.log('inningsForH.value', inningsForH.value)
            } else {
              const inningsArr = inningsForV.value
              inningsArr.splice(item.InningSeq+inningSetForH, 0, '') 
              inningsForH.value = inningsArr
            }
          } else {
            playerData[item.HitterAcnt][item.InningSeq+inningSetForH] = item.BattingActionName
          }
        }
      }
      lastPlayerAcnt = item.HitterAcnt
    })
    
    let list1 = props.hitters['1']
    let list2 = props.hitters['2']
    list1 = list1.map(player => {
      return {
        ...player,
        playData: playerData[player.acnt] ? playerData[player.acnt] : Array.from({ length: innings.value }).fill('')
      }
    })
    list2 = list2.map(player => {
      return {
        ...player,
        playData: playerData[player.acnt] ? playerData[player.acnt] : Array.from({ length: innings.value }).fill('')
      }
    })
    hittersPlay.value = {
      '1': list1,
      '2': list2
    }
    isLoading.value = false
    // 傳到 GameDetail 父元件
    emit('loading-finished', 'PitcherScore')
  } catch(error) {
    console.error('error', error)
  }
}

const checkInning = async (infos) => {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'ScoreboardJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    const score = {
      '1': 0,
      '2': 0
    }
    data.data.forEach((record, index) => {
      if(index === 0) return 
      score[record.VisitingHomeType] += record.ScoreCnt
    })
    checkScore.value = score
  } catch (error) {
    console.log('error', error)
  }
}

// created
fetchPlayerHit(route.params)
checkInning(route.params)
</script>

<template>
  <div class="player-board mb-5">
    <!-- 隊伍 -->
    <!-- <div class="d-flex mb-3">
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
    </div> -->
    <!-- 戰況表 visiting -->
    <div class="d-flex mx-1 mb-2">
      <table class="table table-striped locked">
        <thead class="table-dark">
          <tr>
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.visitingTeam).color">{{teamEnglish(gameInfo.visitingTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hittersPlay['1']" :key="hitter.acnt">
            <td class="name">
              <span v-if="hitter.lineUp">{{hitter.lineUp}}</span>
              <span v-else class="d-inline-block" style="width:10px;"></span>
              {{hitter.name}}, {{hitter.code}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped movable">
        <thead class="table-dark">
          <tr>
            <template v-if="inningsForV.length">
              <th scope="col" class="text-center" v-for="inning in inningsForV" :key="inning">{{inning}}</th>
            </template>
            <template v-else>
              <th scope="col" class="text-center" v-for="inning in innings" :key="inning">{{inning}}</th>
            </template>
            <th scope="col">打數</th>
            <th scope="col">安打</th>
            <th scope="col">全壘打</th>
            <th scope="col">打點</th>
            <th scope="col">得分</th>
            <th scope="col">打擊率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hittersPlay['1']" :key="hitter.acnt">
            <td v-for="data in hitter.playData" :key="data">{{data}}</td>
            <td>{{hitter.HitCnt}}</td>
            <td>{{hitter.HittingCnt}}</td>
            <td>{{hitter.HomeRunCnt}}</td>
            <td>{{hitter.RunBattedINCnt}}</td>
            <td>{{hitter.ScoreCnt}}</td>
            <td>{{(Math.round(hitter.TotalHittingCnt / hitter.TotalHitCnt * 1000)/1000).toFixed(3)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 戰況表 home -->
    <div class="d-flex mx-1">
      <table class="table table-striped locked">
        <thead class="table-dark">
          <tr>
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.homeTeam).color">{{teamEnglish(gameInfo.homeTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hittersPlay['2']" :key="hitter.acnt">
            <td class="name">
              <span v-if="hitter.lineUp">{{hitter.lineUp}}</span>
              <span v-else class="d-inline-block" style="width:10px;"></span>
              {{hitter.name}}, {{hitter.code}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped movable">
        <thead class="table-dark">
          <tr>
            <template v-if="inningsForH.length">
              <th scope="col" class="text-center" v-for="inning in inningsForH" :key="inning">{{inning}}</th>
            </template>
            <template v-else>
              <th scope="col" class="text-center" v-for="inning in innings" :key="inning">{{inning}}</th>
            </template>
            <th scope="col">打數</th>
            <th scope="col">安打</th>
            <th scope="col">全壘打</th>
            <th scope="col">打點</th>
            <th scope="col">得分</th>
            <th scope="col">打擊率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hittersPlay['2']" :key="hitter.acnt">
            <td v-for="data in hitter.playData" :key="data">{{data}}</td>
            <td v-if="checkScore['2'] > checkScore['1']"></td>
            <td>{{hitter.HitCnt}}</td>
            <td>{{hitter.HittingCnt}}</td>
            <td>{{hitter.HomeRunCnt}}</td>
            <td>{{hitter.RunBattedINCnt}}</td>
            <td>{{hitter.ScoreCnt}}</td>
            <td>{{(Math.round(hitter.TotalHittingCnt / hitter.TotalHitCnt * 1000)/1000).toFixed(3)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table[class~="locked"] {
  /* table-layout: fixed; */
  width: 30%;
}

table[class~="movable"] {
  display: block;
  overflow: auto;
  /* width: 70%; */
}
th, td {
  text-align: center;
  white-space: nowrap;
  border: 0;
}
.name {
  text-align: start;
  white-space: nowrap;
}
@media screen and (max-width: 800px) {
  th, td {
    font-size: 0.8em;
  }
}
</style>