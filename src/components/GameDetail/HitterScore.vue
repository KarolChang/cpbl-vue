<script setup>
import { inject } from 'vue' 
import { teamEnglish } from '../../utils/teamEnglish'

// props
const props = defineProps({
  gameInfo: Object
})
console.log('props', props)

// inject
const hitters = inject('hitters')

// methods
const sumData = (type, item) => {
  let data = 0
  // console.log('hitters[type]', hitters.value[type])
  hitters.value[type].forEach(player => {
    data += player[item]
  })
  // console.log('data', data)
  return data
}
</script>

<template>
  <div class="score mb-5" v-if="hitters">
    <div class="d-flex mb-2 mx-1">
      <table class="table table-striped locked">
        <thead>
          <tr class="table-dark">
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.visitingTeam).color">{{teamEnglish(gameInfo.visitingTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hitters['1']" :key="hitter.name">
            <td class="name text-nowrap">
              <span v-if="hitter.lineUp">{{hitter.lineUp}}</span>
              <span v-else class="d-inline-block" style="width:10px;"></span>
              {{hitter.name}}, {{hitter.code}}</td>
          </tr>
          <tr class="table-warning">
            <th>Total</th>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped movable">
        <thead>
          <tr class="table-dark">
            <th scope="col">打數</th>
            <th scope="col">得分</th>
            <th scope="col">安打</th>
            <th scope="col">打點</th>
            <th scope="col">二安</th>
            <th scope="col">三安</th>
            <th scope="col">全壘打</th>
            <th scope="col">雙殺打</th>
            <th scope="col">四壞</th>
            <th scope="col">故四</th>
            <th scope="col">死球</th>
            <th scope="col">被三振</th>
            <th scope="col">犧打</th>
            <th scope="col">犧飛</th>
            <th scope="col">盜壘</th>
            <th scope="col">盜壘刺</th>
            <th scope="col">失誤</th>
            <th scope="col">打擊率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hitters['1']" :key="hitter.name">
            <td>{{hitter.HitCnt}}</td>
            <td>{{hitter.ScoreCnt}}</td>
            <td>{{hitter.HittingCnt}}</td>
            <td>{{hitter.RunBattedINCnt}}</td>
            <td>{{hitter.TwoBaseHitCnt}}</td>
            <td>{{hitter.ThreeBaseHitCnt}}</td>
            <td>{{hitter.HomeRunCnt}}</td>
            <td>{{hitter.DoublePlayBatCnt}}</td>
            <td>{{hitter.BasesONBallsCnt}}</td>
            <td>{{hitter.IntentionalBasesONBallsCnt}}</td>
            <td>{{hitter.HitBYPitchCnt}}</td>
            <td>{{hitter.StrikeOutCnt}}</td>
            <td>{{hitter.SacrificeHitCnt}}</td>
            <td>{{hitter.SacrificeFlyCnt}}</td>
            <td>{{hitter.StealBaseOKCnt}}</td>
            <td>{{hitter.StealBaseFailCnt}}</td>
            <td>{{hitter.ErrorCnt}}</td>
            <td>{{(Math.round(hitter.TotalHittingCnt / hitter.TotalHitCnt * 1000)/1000).toFixed(3)}}</td>
          </tr>
          <tr class="table-warning"> 
            <td>{{ sumData('1', 'HitCnt') }}</td>
            <td>{{ sumData('1', 'ScoreCnt') }}</td>
            <td>{{ sumData('1', 'HittingCnt') }}</td>
            <td>{{ sumData('1', 'RunBattedINCnt') }}</td>
            <td>{{ sumData('1', 'TwoBaseHitCnt') }}</td>
            <td>{{ sumData('1', 'ThreeBaseHitCnt') }}</td>
            <td>{{ sumData('1', 'HomeRunCnt') }}</td>
            <td>{{ sumData('1', 'DoublePlayBatCnt') }}</td>
            <td>{{ sumData('1', 'BasesONBallsCnt') }}</td>
            <td>{{ sumData('1', 'IntentionalBasesONBallsCnt') }}</td>
            <td>{{ sumData('1', 'HitBYPitchCnt') }}</td>
            <td>{{ sumData('1', 'StrikeOutCnt') }}</td>
            <td>{{ sumData('1', 'SacrificeHitCnt') }}</td>
            <td>{{ sumData('1', 'SacrificeFlyCnt') }}</td>
            <td>{{ sumData('1', 'StealBaseOKCnt') }}</td>
            <td>{{ sumData('1', 'StealBaseFailCnt') }}</td>
            <td>{{ sumData('1', 'ErrorCnt') }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex mx-1">
      <table class="table table-striped locked">
        <thead>
          <tr class="table-dark">
            <th scope="col" :class="'fw-bolder ' + teamEnglish(gameInfo.homeTeam).color">{{teamEnglish(gameInfo.homeTeam).nameEN}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hitters['2']" :key="hitter.name">
            <td class="name text-nowrap">
              <span v-if="hitter.lineUp">{{hitter.lineUp}}</span>
              <span v-else class="d-inline-block" style="width:10px;"></span>
              {{hitter.name}}, {{hitter.code}}</td>
          </tr>
          <tr class="table-warning">
            <th>Total</th>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped movable">
        <thead>
          <tr class="table-dark">
            <th scope="col">打數</th>
            <th scope="col">得分</th>
            <th scope="col">安打</th>
            <th scope="col">打點</th>
            <th scope="col">二安</th>
            <th scope="col">三安</th>
            <th scope="col">全壘打</th>
            <th scope="col">雙殺打</th>
            <th scope="col">四壞</th>
            <th scope="col">故四</th>
            <th scope="col">死球</th>
            <th scope="col">被三振</th>
            <th scope="col">犧打</th>
            <th scope="col">犧飛</th>
            <th scope="col">盜壘</th>
            <th scope="col">盜壘刺</th>
            <th scope="col">失誤</th>
            <th scope="col">打擊率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hitter in hitters['2']" :key="hitter.name">
            <td>{{hitter.HitCnt}}</td>
            <td>{{hitter.ScoreCnt}}</td>
            <td>{{hitter.HittingCnt}}</td>
            <td>{{hitter.RunBattedINCnt}}</td>
            <td>{{hitter.TwoBaseHitCnt}}</td>
            <td>{{hitter.ThreeBaseHitCnt}}</td>
            <td>{{hitter.HomeRunCnt}}</td>
            <td>{{hitter.DoublePlayBatCnt}}</td>
            <td>{{hitter.BasesONBallsCnt}}</td>
            <td>{{hitter.IntentionalBasesONBallsCnt}}</td>
            <td>{{hitter.HitBYPitchCnt}}</td>
            <td>{{hitter.StrikeOutCnt}}</td>
            <td>{{hitter.SacrificeHitCnt}}</td>
            <td>{{hitter.SacrificeFlyCnt}}</td>
            <td>{{hitter.StealBaseOKCnt}}</td>
            <td>{{hitter.StealBaseFailCnt}}</td>
            <td>{{hitter.ErrorCnt}}</td>
            <td>{{(Math.round(hitter.TotalHittingCnt / hitter.TotalHitCnt * 1000)/1000).toFixed(3)}}</td>
          </tr>
          <tr class="table-warning">
            <td>{{ sumData('2', 'HitCnt') }}</td>
            <td>{{ sumData('2', 'ScoreCnt') }}</td>
            <td>{{ sumData('2', 'HittingCnt') }}</td>
            <td>{{ sumData('2', 'RunBattedINCnt') }}</td>
            <td>{{ sumData('2', 'TwoBaseHitCnt') }}</td>
            <td>{{ sumData('2', 'ThreeBaseHitCnt') }}</td>
            <td>{{ sumData('2', 'HomeRunCnt') }}</td>
            <td>{{ sumData('2', 'DoublePlayBatCnt') }}</td>
            <td>{{ sumData('2', 'BasesONBallsCnt') }}</td>
            <td>{{ sumData('2', 'IntentionalBasesONBallsCnt') }}</td>
            <td>{{ sumData('2', 'HitBYPitchCnt') }}</td>
            <td>{{ sumData('2', 'StrikeOutCnt') }}</td>
            <td>{{ sumData('2', 'SacrificeHitCnt') }}</td>
            <td>{{ sumData('2', 'SacrificeFlyCnt') }}</td>
            <td>{{ sumData('2', 'StealBaseOKCnt') }}</td>
            <td>{{ sumData('2', 'StealBaseFailCnt') }}</td>
            <td>{{ sumData('2', 'ErrorCnt') }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table[class~="locked"] {
  /* table-layout: fixed; */
  width: 40%;
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
  /* white-space: nowrap; */
}
@media screen and (max-width: 800px) {
  th, td {
    font-size: 0.8em;
  }
}
</style>