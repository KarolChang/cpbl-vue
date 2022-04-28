<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import dataAPI from '../../apis/data'
import { teamEnglish } from '../../utils/teamEnglish'
const route = useRoute()
const emit = defineEmits(['loading-finished'])

// props
const props = defineProps({
  gameInfo: Object
})
console.log('props', props)

// data
const isLoading = ref(true)
const allScore = ref({})

// methods
const fetchPitcherScore = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'PitchingJson'
    }

    const { data } = await dataAPI.getData(gameInfos)
    
    const scores = {
      '1': [],
      '2': []
    }
    data.data.forEach(item => {
      scores[item.VisitingHomeType].push(item)
    })
    allScore.value = scores
    isLoading.value = false
    // 傳到 GameDetail 父元件
    emit('loading-finished', 'PitcherScore')
  } catch(error) {
    console.error('error', error)
  }
}

const sumData = (type, item) => {
  let data = 0
  if(item === 'InningPitchedCnt') {
    let div3 = 0
    allScore.value[type].forEach((pitcher) => {
      pitcher['InningPitchedDiv3Cnt']
      data += pitcher[item]
      div3 += pitcher.InningPitchedDiv3Cnt
    })
    if(div3 % 3 !== 0) {
      data = `${data} ${div3 % 3}/3`
    } else {
      data += (div3 / 3)
    }
  } else {
    allScore.value[type].forEach((pitcher) => {
      data += pitcher[item]
    })
  }
  return data
}

// created
fetchPitcherScore(route.params)
</script>

<template>
  <div class="score mb-5" v-if="!isLoading">
    <div class="d-flex mx-1">
      <table class="table table-striped locked">
        <thead>
          <tr class="table-dark">
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.visitingTeam).color">{{teamEnglish(gameInfo.visitingTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pitcher, index) in allScore['1']" :key="pitcher.PitcherAcnt">
            <th class="name"><span style="color: grey;">{{index+1}}</span> {{pitcher.PitcherName}}</th>
          </tr>
          <tr class="table-warning">
            <th>Total</th>
          </tr>
        </tbody>
      </table>

      <table class="table table-striped movable">
        <thead>
          <tr class="table-dark">
            <th scope="col">投球局數</th>
            <th scope="col">面對打席</th>
            <th scope="col">投球數</th>
            <th scope="col">好球數</th>
            <th scope="col">安打</th>
            <th scope="col">全壘打</th>
            <th scope="col">四壞</th>
            <th scope="col">故四</th>
            <th scope="col">三振</th>
            <th scope="col">死球</th>
            <th scope="col">暴投</th>
            <th scope="col">投手犯規</th>
            <th scope="col">失分</th>
            <th scope="col">自責分</th>
            <th scope="col">失誤</th>
            <!-- <th scope="col">防禦率</th>
            <th scope="col">每局被上壘率</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="pitcher in allScore['1']" :key="pitcher.PitcherAcnt">
            <td>{{pitcher.InningPitchedCnt}}
              <template v-if="pitcher.InningPitchedDiv3Cnt !== 0">
                {{pitcher.InningPitchedDiv3Cnt + '/3'}}
              </template>
            </td>
            <td>{{pitcher.PlateAppearances}}</td>
            <td>{{pitcher.PitchCnt}}</td>
            <td>{{pitcher.StrikeCnt}}</td>
            <td>{{pitcher.HittingCnt}}</td>
            <td>{{pitcher.HomeRunCnt}}</td>
            <td>{{pitcher.BasesONBallsCnt}}</td>
            <td>{{pitcher.IntentionalBasesONBallsCnt}}</td>
            <td>{{pitcher.HitBYPitchCnt}}</td>
            <td>{{pitcher.StrikeOutCnt}}</td>     
            <td>{{pitcher.WildPitchCnt}}</td>
            <td>{{pitcher.BalkCnt}}</td>
            <td>{{pitcher.RunCnt}}</td>
            <td>{{pitcher.EarnedRunCnt}}</td>
            <td>{{pitcher.ErrorCnt}}</td>
          </tr>
          <tr class="table-warning">
            <td>{{ sumData('1', 'InningPitchedCnt') }}</td>
            <td>{{ sumData('1', 'PlateAppearances') }}</td>
            <td>{{ sumData('1', 'PitchCnt') }}</td>
            <td>{{ sumData('1', 'StrikeCnt') }}</td>
            <td>{{ sumData('1', 'HittingCnt') }}</td>
            <td>{{ sumData('1', 'HomeRunCnt') }}</td>
            <td>{{ sumData('1', 'BasesONBallsCnt') }}</td>
            <td>{{ sumData('1', 'IntentionalBasesONBallsCnt') }}</td>
            <td>{{ sumData('1', 'HitBYPitchCnt') }}</td>
            <td>{{ sumData('1', 'StrikeOutCnt') }}</td>
            <td>{{ sumData('1', 'WildPitchCnt') }}</td>
            <td>{{ sumData('1', 'BalkCnt') }}</td>
            <td>{{ sumData('1', 'RunCnt') }}</td>
            <td>{{ sumData('1', 'EarnedRunCnt') }}</td>
            <td>{{ sumData('1', 'ErrorCnt') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="d-flex">
      <table class="table table-striped locked">
        <thead>
          <tr class="table-dark">
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.homeTeam).color">{{teamEnglish(gameInfo.homeTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pitcher, index) in allScore['2']" :key="pitcher.PitcherAcnt">
            <th class="name"><span style="color: grey;">{{index+1}}</span> {{pitcher.PitcherName}}</th>
          </tr>
          <tr class="table-warning">
            <th scope="row">Total</th>
          </tr>
        </tbody>
      </table>

      <table class="table table-striped movable">
        <thead>
          <tr class="table-dark">
            <th scope="col">投球局數</th>
            <th scope="col">面對打席</th>
            <th scope="col">投球數</th>
            <th scope="col">好球數</th>
            <th scope="col">安打</th>
            <th scope="col">全壘打</th>
            <th scope="col">四壞</th>
            <th scope="col">故四</th>
            <th scope="col">三振</th>
            <th scope="col">死球</th>
            <th scope="col">暴投</th>
            <th scope="col">投手犯規</th>
            <th scope="col">失分</th>
            <th scope="col">自責分</th>
            <th scope="col">失誤</th>
            <!-- <th scope="col">防禦率</th>
            <th scope="col">每局被上壘率</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="pitcher in allScore['2']" :key="pitcher.PitcherAcnt">
            <td>{{pitcher.InningPitchedCnt}}
              <template v-if="pitcher.InningPitchedDiv3Cnt !== 0">
                {{pitcher.InningPitchedDiv3Cnt + '/3'}}
              </template>
            </td>
            <td>{{pitcher.PlateAppearances}}</td>
            <td>{{pitcher.PitchCnt}}</td>
            <td>{{pitcher.StrikeCnt}}</td>
            <td>{{pitcher.HittingCnt}}</td>
            <td>{{pitcher.HomeRunCnt}}</td>
            <td>{{pitcher.BasesONBallsCnt}}</td>
            <td>{{pitcher.IntentionalBasesONBallsCnt}}</td>
            <td>{{pitcher.HitBYPitchCnt}}</td>
            <td>{{pitcher.StrikeOutCnt}}</td>     
            <td>{{pitcher.WildPitchCnt}}</td>
            <td>{{pitcher.BalkCnt}}</td>
            <td>{{pitcher.RunCnt}}</td>
            <td>{{pitcher.EarnedRunCnt}}</td>
            <td>{{pitcher.ErrorCnt}}</td>
          </tr>
          <tr class="table-warning">
            <td>{{ sumData('2', 'InningPitchedCnt') }}</td>
            <td>{{ sumData('2', 'PlateAppearances') }}</td>
            <td>{{ sumData('2', 'PitchCnt') }}</td>
            <td>{{ sumData('2', 'StrikeCnt') }}</td>
            <td>{{ sumData('2', 'HittingCnt') }}</td>
            <td>{{ sumData('2', 'HomeRunCnt') }}</td>
            <td>{{ sumData('2', 'BasesONBallsCnt') }}</td>
            <td>{{ sumData('2', 'IntentionalBasesONBallsCnt') }}</td>
            <td>{{ sumData('2', 'HitBYPitchCnt') }}</td>
            <td>{{ sumData('2', 'StrikeOutCnt') }}</td>
            <td>{{ sumData('2', 'WildPitchCnt') }}</td>
            <td>{{ sumData('2', 'BalkCnt') }}</td>
            <td>{{ sumData('2', 'RunCnt') }}</td>
            <td>{{ sumData('2', 'EarnedRunCnt') }}</td>
            <td>{{ sumData('2', 'ErrorCnt') }}</td>
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
  text-align:start;
  white-space: nowrap;
}

@media screen and (max-width: 800px) {
  th, td {
    font-size: 0.8em;
  }
}
</style>