<script setup>
import { ref, watch } from 'vue'
import dataAPI from '../apis/data'
import { showTime } from '../utils/dateTime'

// data
const isLoading = ref(true)
const isLoadingYear = ref(false)
const games = ref([])
const filteredGames = ref([])
const nowYear = ref(new Date().getYear()+1900)
const nowMonth = ref(new Date().getMonth()+1)
const kindCode = ref('A')
const codes = ref({
  'A': '一軍例行賽',
  'B': '一軍明星賽',
  'C': '一軍總冠軍賽', 
  'D': '二軍例行賽',
  'E': '一軍季後挑戰賽', 
  'F': '二軍總冠軍賽',
  'G': '一軍熱身賽'
})

const years = ref(Array.from({length: 5}, (_, i) => new Date().getFullYear()-i))
const months = ref(Array.from({length: 12}, (_, i) => i+1))
const baseUrl = ref('https://www.cpbl.com.tw')

// methods
const fetchSchedule = async function() {
  try {
    const infos = { kindCode: kindCode.value, year: nowYear.value }
    const { data } = await dataAPI.getSchedule(infos)
    
    // 照時間排序
    games.value = data.data.sort((a, b) => {
      return new Date(a.PreExeDate) - new Date(b.PreExeDate)
    })
  } catch (error) {
    console.error('error', error)
  }
}

const filterGamesByMonth = function() {
  filteredGames.value = games.value.filter(game => new Date(game.PreExeDate).getMonth()+1 === nowMonth.value)
}

const showDate = function(date) {
  const formatDate = new Date(date)
  let newDate = formatDate.getMonth()+1 + '/' + formatDate.getDate()
  
  switch (formatDate.getDay()) {
    case 0:
      return newDate + ' (日)'
    case 1:
      return newDate + ' (一)'
    case 2:
      return newDate + ' (二)'
    case 3:
      return newDate + ' (三)'
    case 4:
      return newDate + ' (四)'
    case 5:
      return newDate + ' (五)'
    case 6:
      return newDate + ' (六)'
  }
}

const changeNowYearMonth = function(op) {
  if(op === '-') {
    nowMonth.value = nowMonth.value === 1 ? 12 : nowMonth.value - 1
    nowYear.value = nowMonth.value === 12 ? nowYear.value - 1 : nowYear.value
  }
  if(op === '+') {
    nowMonth.value = nowMonth.value === 12 ? 1 : nowMonth.value + 1
    nowYear.value = nowMonth.value === 1 ? nowYear.value + 1 : nowYear.value
  }
}

// const toDate = function(date) {
//   return new Date(date)
// }

// created
const showView = async function() {
  await fetchSchedule()
  filterGamesByMonth()
  isLoading.value = false
}
showView()

// watch
watch(nowMonth, () => {
  filterGamesByMonth()
}) 

watch(nowYear, async() => {
  isLoadingYear.value = true
  await fetchSchedule()
  filterGamesByMonth()
  isLoadingYear.value  = false
})

watch(kindCode, async() => {
  await fetchSchedule()
  filterGamesByMonth()
})

</script>

<template>
  <div class="text-center mt-3" v-if="isLoading">
    <img class="rounded" src="../assets/capo-loading.gif" alt="loading..." width="360">
  </div>   
  <div class="schedule m-3" v-else>
    <header class="pb-3 mb-4 border-bottom">
      <span class="fs-3">賽程</span>
    </header>
    <!-- 年份＆月份 -->
    <div class="d-flex justify-content-around my-4 mb-3">
      <div>
        <select class="form-select" v-model="kindCode">
          <option v-for="(code, key) in codes" :key="key" :value="key" selected>{{code}}</option>
        </select>
      </div>
      <div>
        <select class="form-select" v-model.lazy="nowYear">
          <option v-for="year in years" :key="year" :value="year">{{year}}年</option>
        </select>
      </div>
      <div>
        <select class="form-select" v-model.lazy="nowMonth">
          <option v-for="month in months" :key="month" :value="month">{{month}}月</option>
        </select>
      </div>
    </div>

    <div class="shadow-none p-3 mb-3 bg-light rounded d-flex justify-content-around">
      <a @click.prevent="changeNowYearMonth('-')">
        <i class="fas fa-arrow-circle-left fa-3x text-warning"></i>
      </a>
      <h2 class="text-center my-auto">{{nowYear}}-{{nowMonth}}</h2>
      <a @click.prevent="changeNowYearMonth('+')">
        <i class="fas fa-arrow-circle-right fa-3x text-warning"></i>
      </a>
    </div>

    <!-- loading -->
    <div class="text-center mt-3" v-if="isLoadingYear">
      <img class="rounded" src="../assets/loading-jm.gif" alt="loading..." width="250" height="350">
    </div>

    <!-- table -->
    <table v-else class="table table-dark table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center">日期</th>
          <th scope="col" class="text-center">場次</th>
          <th scope="col" class="text-center">對戰組合</th>
          <th scope="col" class="text-center">場地/時間</th>
          <!-- <th scope="col" class="text-center">比賽狀態</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in filteredGames" :key="game.GameSno" :class="game.GameResult === '0' ? 'table-secondary' : 'table-warning'">
          <th scope="row" class="text-center date">{{showDate(game.PreExeDate)}} 
          </th>
          <td class="text-center align-middle">
            <router-link 
              :to="{ name: 'Record', params: { gameSno: game.GameSno, kindCode: game.KindCode, year: game.Year }}">
              {{game.GameSno}}
            </router-link>
          </td>
          <!-- 比賽尚未結束 -->
          <template v-if="game.GameResult === '0'">
            <td class="align-middle px-3"> 
              <div class="row">
                <div class="col-3 col-sm-5 text-end">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="visiting-logo" width="25" height="25">
                  <span class="team-name">{{game.VisitingTeamName}}</span>
                </div>
                <div class="col-6 col-sm-2 text-center">
                  <span class="fw-bolder fs-5">{{game.VisitingScore}}</span> :  
                  <span class="fw-bolder fs-5">{{game.HomeScore}}</span>
                </div>
                <div class="col-3 col-sm-5">
                  <span class="team-name">{{game.HomeTeamName}}</span>
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="home-logo" width="25" height="25">
                </div>
              </div>
            </td>
          </template>
          <!-- 比賽結束 -->
          <template v-else>
            <td class="align-middle px-3">   
              <div class="row">
                <div class="col-3 col-sm-5 text-end">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="visiting-logo" width="25" height="25">
                  <span class="team-name">{{game.VisitingTeamName}}</span>
                </div>
                <div class="col-6 col-sm-2 text-center vs">VS.</div>
                <div class="col-3 col-sm-5">
                  <span class="team-name">{{game.HomeTeamName}}</span>
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="home-logo" width="25" height="25">
                </div>
              </div>
            </td>
          </template>
          <th class="area-time">
            <div class="row">
              <div class="col-12 col-sm-6 text-end area-time">{{game.FieldAbbe}}</div>
              <div class="col-12 col-sm-6 area-time">{{showTime(game.PreExeDate)}}</div>
            </div>
          </th>
          <!-- <td class="text-center text-danger" v-if="game.GameResult === '' && new Date() >= toDate(game.GameDateTimeS) ">比賽中</td>
          <td class="text-center" v-else-if="game.GameResult === ''">未開賽</td>
          <td class="text-center text-primary" v-else-if="game.GameResult === '0'">比賽結束</td>
          <td class="text-center text-danger" v-else-if="game.GameResult === '1'">延賽</td>
          <td class="text-center text-danger" v-else-if="game.GameResult === '2'">比賽保留</td>
          <td class="text-center text-danger" v-else-if="game.GameResult === '4'">比賽暫停中</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@media screen and (max-width: 500px) {
  span[class~="team-name"] {
    display: none;
  }

  div[class~="area-time"] {
    text-align-last: center;
  }

  th {
    font-size: small;
  }

  div[class~="vs"] {
    font-size: 0.5em;
    margin-top: 1em;
  }

  th[class~="date"] {
    width: 60px;
  }

  th[class~="area-time"] {
    width: 80px;
  }
}
</style>