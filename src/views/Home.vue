<script setup>
import { ref } from 'vue'
import dataAPI from '../apis/data'
import Spinner from '@/components/Spinner.vue'
import { showTime } from '../utils/dateTime'
import { useStore } from '../store/index'
const store = useStore()

// data
const isLoading = ref(true)
const baseUrl = ref('https://www.cpbl.com.tw')
const playerUrl = ref('https://www.cpbl.com.tw/team/person?acnt=')
const nowDate = ref('')
const nowDateWithWeek = ref('')
let todayGames = ref({})
const level = ref('一軍')

// methods
const fetchTodayGame = async function(infos) {
  try {
    isLoading.value = true

    const { data } = await dataAPI.getTodayGame(infos)

    todayGames.value = data.data

    isLoading.value = false

  } catch(error) {
    console.error('error', error)
  }
}

const getToday = function(chosenDate = 0) {
  const changedDate = chosenDate ? new Date(chosenDate) : new Date()
  const year = changedDate.getFullYear()
  let month = changedDate.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let date = changedDate.getDate()
  date = date < 10 ? '0' + date : date
  const week = showDay(changedDate)

  nowDate.value = `${year}-${month}-${date}`
  nowDateWithWeek.value = `${year}-${month}-${date} ${week}`
}

const changeNowDate = function(op) {
  let changedDate = new Date(nowDate.value)
  if(op === '-') {
    changedDate.setDate(changedDate.getDate() - 1)
  }
  if(op === '+') {
    changedDate.setDate(changedDate.getDate() + 1)
  }
  getToday(changedDate)
}

const showDay = function(date) {
  switch (date.getDay()) {
    case 0:
      return '(日)'
    case 1:
      return '(一)'
    case 2:
      return '(二)'
    case 3:
      return '(三)'
    case 4:
      return '(四)'
    case 5:
      return '(五)'
    case 6:
      return '(六)'
  }
}

const changeLevel = function(nowLevel) {
  level.value = nowLevel
}

const getPlayersId = store.fetchPlayersId

// created
getToday()
getPlayersId()
fetchTodayGame({ gameDate: nowDate.value })

</script>

<template>
  <Spinner v-if="isLoading" />
  <div class="home container py-4" v-else>
    <header class="pb-3 mb-4 border-bottom d-flex justify-content-between">
      <span class="fs-3">今日賽事</span>
      <div>
        <template v-if="level === '一軍'">
          <button class="btn btn-success me-2" type="button" @click="changeLevel('一軍')">一軍</button>
          <button class="btn btn-outline-success" type="button" @click.prevent="changeLevel('二軍')">二軍</button>
        </template>
        <template v-else>
          <button class="btn btn-outline-success me-2" type="button" @click="changeLevel('一軍')">一軍</button>
          <button class="btn btn-success" type="button" @click="changeLevel('二軍')">二軍</button>
        </template>
      </div>
    </header>

    <div class="shadow-none p-3 mb-5 bg-light rounded d-flex justify-content-around">
      <div class="d-flex justify-content-between">
        <a @click.prevent="changeNowDate('-'); fetchTodayGame({gameDate: nowDate})">
          <i class="fas fa-arrow-circle-left fa-3x text-warning"></i>
        </a>
        <h2 class="text-center my-auto m-4">{{nowDateWithWeek}}</h2>
        <a @click.prevent="changeNowDate('+'); fetchTodayGame({gameDate: nowDate})">
          <i class="fas fa-arrow-circle-right fa-3x text-warning"></i>
        </a>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6 mb-2" v-for="game in todayGames[level]" :key="game.GameSno">
        <div class="h-100 p-4 bg-light border rounded-3">
          <div class="row">
            <div class="col-3 my-auto">
              <div class="bg-primary text-white text-center mx-4" style="border-radius:8%;">{{game.GameSno}}</div>
              <div class="text-center fw-bold fs-5">{{game.FieldAbbe}}</div>
              <div v-if="game.GameStatus === 1" class="text-center fw-bold fs-5">{{showTime(game.PreExeDate)}}</div>

              <div v-else-if="game.GameStatus === 2" class="text-center fw-bold fs-5 bg-danger text-white">比賽中</div>
              <div v-else-if="game.GameStatus === 3" class="text-center fw-bold fs-5 bg-success text-white">比賽結束</div>
              <div v-else-if="game.GameStatus === 4" class="text-center fw-bold fs-5 bg-primary text-white">先發打序</div>
              <div v-else-if="game.GameStatus === 5" class="text-center fw-bold fs-5 bg-secondary text-warning">取消比賽</div>
              <div v-else-if="game.GameStatus === 6" class="text-center fw-bold fs-5 bg-dark text-danger">延賽</div>
            </div>
            <div class="col-3 text-center">
              <img :src="baseUrl + game.VisitingClubBigImgPath" alt="v-pic" width="100" height="100">
            </div>

            <div class="col-3 text-center fw-bold fs-2 mt-4" v-if="game.GameStatus === 2">
              {{game.CurtBatting.VisitingScore}} : {{game.CurtBatting.HomeScore}}
            </div>
            <div class="col-3 text-center fw-bold fs-2 mt-4" v-else-if="game.GameStatus === 3">
              {{game.VisitingScore}} : {{game.HomeScore}}
            </div>
            <div class="col-3 text-center fw-bold fs-4 mt-5" v-else>vs.</div>

            <div class="col-3 text-center">
              <img :src="baseUrl + game.HomeClubBigImgPath" alt="h-pic" width="100" height="100">
            </div>
          </div>
          <hr>
          <div class="row">
            <template v-if="game.GameStatus === 2">
              <div class="col-4">
                <div class="bg-info text-white text-center p-1 m-2" style="border-radius:5%;">打擊</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="v-pic" width="30" height="30" v-if="game.CurtBatting.VisitingHomeType === '1'">
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="h-pic" width="30" height="30" v-else>
                  <a :href="playerUrl + game.CurtBatting.HitterAcnt" class="player" target="_blank">
                    {{game.CurtBatting.HitterName}}
                  </a>
                </div>
              </div>
              <div class="col-4">
                <div class="bg-danger text-white text-center p-1 m-2" style="border-radius:5%;">投手</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="v-pic" width="30" height="30" v-if="game.CurtBatting.VisitingHomeType === '2'">
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="v-pic" width="30" height="30" v-else>
                  <a :href="playerUrl + game.CurtBatting.PitcherAcnt" class="player" target="_blank">
                    {{game.CurtBatting.PitcherName}}
                  </a>
                </div>
              </div>
            </template>
            <template v-else-if="game.GameStatus === 3">
              <div class="col-4">
                <div class="bg-info text-white text-center p-1 m-2" style="border-radius:5%;">勝投</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="v-pic" width="30" height="30" v-if="game.WinningType === '1'">
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="v-pic" width="30" height="30" v-else>
                  <a :href="playerUrl + game.WinningPitcherAcnt" class="player" target="_blank">
                    {{game.WinningPitcherName}}
                  </a>
                </div>
              </div>
              <div class="col-4">
                <div class="bg-danger text-white text-center p-1 m-2" style="border-radius:5%;">敗投</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="v-pic" width="30" height="30" v-if="game.WinningType === '2'">
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="v-pic" width="30" height="30" v-else>
                  <a :href="playerUrl + game.LosePitcherAcnt" class="player" target="_blank">
                    {{game.LosePitcherName}}
                  </a>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="col-4">
                <div class="bg-success text-white text-center p-1 m-2" style="border-radius:5%;">客場先發</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.VisitingClubSmallImgPath" alt="v-pic" width="30" height="30">
                  <a :href="playerUrl + game.VisitingFirstAcnt" class="player" target="_blank">
                    {{game.VisitingFirstMover}}
                  </a>
                </div>
              </div>
              <div class="col-4">
                <div class="bg-success text-white text-center p-1 m-2" style="border-radius:5%;">主場先發</div>
                <div class="d-flex justify-content-center text-center">
                  <img :src="baseUrl + game.HomeClubSmallImgPath" alt="v-pic" width="30" height="30">
                  <a :href="playerUrl + game.HomeFirstAcnt" class="player" target="_blank">
                    {{game.HomeFirstMover}}
                  </a>
                </div>
              </div>
            </template>
            <div class="col-4 my-auto text-center">
              <router-link
                :to="{ name: 'Record', params: { gameSno: game.GameSno, kindCode: game.KindCode, year: game.Year }}" class="text-decoration-none text-white">
                <button class="btn btn-outline-warning" type="button">詳細賽況</button>
              </router-link>
            </div>
            <div class="d-flex mt-3 bg-white justify-content-center" v-if="game.CurtBatting">
              <hr>
              <div class="fs-3 my-auto mx-4 text-primary">
                {{game.CurtBatting.InningSeq}}
                <i class="fas fa-sort-up" v-if="game.CurtBatting.VisitingHomeType === '1'"></i>
                <i class="fas fa-sort-down" v-else></i>
              </div>
              <!-- 好壞球 -->
              <div class="me-3">
                <!-- 好球 -->
                <div class="my-2 d-flex justify-content-start">
                  <strong class="me-1">S</strong>
                  <div class="me-1" v-if="game.CurtBatting.StrikeCnt >= 1"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.StrikeCnt >= 2"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.StrikeCnt >= 3"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>            
                </div>
                <!-- 壞球 -->
                <div class="my-2 d-flex justify-content-start">
                  <strong class="me-1">B</strong>
                  <div class="me-1" v-if="game.CurtBatting.BallCnt >= 1"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.BallCnt >= 2"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.BallCnt >= 3"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.BallCnt >= 4"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                </div>
                <!-- 出局數 -->
                <div class="my-2 d-flex justify-content-start">
                  <strong class="me-1">O</strong>
                  <div class="me-1" v-if="game.CurtBatting.OutCnt >= 1"><i class="fas fa-circle" style="color:red;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                  <div class="me-1" v-if="game.CurtBatting.OutCnt >= 2"><i class="fas fa-circle" style="color:red;"></i></div>
                  <div class="me-1" v-else><i class="far fa-circle"></i></div>
                </div>
              </div>
              <!-- 壘包 -->
              <div>
                <img v-if="!game.CurtBatting.FirstBase && !game.CurtBatting.SecondBase && !game.CurtBatting.ThirdBase" src="../assets/0.png" alt="base" width="100" hright="100">
                <img v-if="game.CurtBatting.FirstBase && !game.CurtBatting.SecondBase && !game.CurtBatting.ThirdBase" src="../assets/1.png" alt="base" width="100" hright="100">
                <img v-if="!game.CurtBatting.FirstBase && game.CurtBatting.SecondBase && !game.CurtBatting.ThirdBase" src="../assets/2.png" alt="base" width="100" hright="100">
                <img v-if="!game.CurtBatting.FirstBase && !game.CurtBatting.SecondBase && game.CurtBatting.ThirdBase" src="../assets/3.png" alt="base" width="100" hright="100">
                <img v-if="game.CurtBatting.FirstBase && game.CurtBatting.SecondBase && !game.CurtBatting.ThirdBase" src="../assets/1-2.png" alt="base" width="100" hright="100">
                <img v-if="game.CurtBatting.FirstBase && !game.CurtBatting.SecondBase && game.CurtBatting.ThirdBase" src="../assets/1-3.png" alt="base" width="100" hright="100">
                <img v-if="!game.CurtBatting.FirstBase && game.CurtBatting.SecondBase && game.CurtBatting.ThirdBase" src="../assets/2-3.png" alt="base" width="100" hright="100">
                <img v-if="game.CurtBatting.FirstBase && game.CurtBatting.SecondBase && game.CurtBatting.ThirdBase" src="../assets/1-2-3.png" alt="base" width="100" hright="100">
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>

    <div class="p-3 mt-4 bg-light rounded-3" v-if="!todayGames[level]">
      <div class="container-fluid">
        <h3 class="display-5 fw-bold text-center">今日無賽事 只好烏波鳥波叫</h3>
        <img class="rounded mx-auto d-block pt-2" src="https://imgur.dcard.tw/WKc9cNt.gif" alt="wopo">
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  color: #000000;
  text-decoration: none;
}

.player:hover {
  color: orange;
}

/* @media screen and (max-width: 500px) {
  #logo-big {
    display: none;
  }
} */
</style>