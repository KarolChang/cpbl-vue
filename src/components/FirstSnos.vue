<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../apis/data'
const emit = defineEmits(['loading-finished'])
const route = useRoute()

// data
const isLoading = ref(true)
const visitingFirstSno = ref([])
const homeFirstSno = ref([])

// methods
const fetchGameStatus = async function(infos) {
  try {
    const gameInfos = {
      ...infos,
      dataType: 'CurtGameDetailJson'
    }

    const { data } = await dataAPI.getData(gameInfos)

    const visitingFirst = []
    const homeFirst = []

    data.data.FirstSnos.forEach(player => {
      if(player.VisitingHomeType === '1') {
        visitingFirst[player.Lineup - 1] = player
      }
      if(player.VisitingHomeType === '2') {
        homeFirst[player.Lineup - 1] = player
      }
    })

    visitingFirstSno.value = visitingFirst
    homeFirstSno.value = homeFirst
    
    isLoading.value = false
    // 傳到 Record 父元件
    emit('loading-finished', 'FirstSnos')

  } catch(error) {
    console.error('error', error)
  }
}

// created
fetchGameStatus(route.params)
</script>

<template>
  <div class="first-snos mb-5" v-if="!isLoading">
    <h1 class="text-center bg-success mb-3">先發打序</h1>
    <div class="d-flex">
      <table class="table table-striped table-bordered m-5">
        <thead>
          <tr>
            <th scope="col" class="text-center">先發棒次</th>
            <th scope="col" class="text-center">先發位置</th>
            <th scope="col" class="text-center">先發球員</th>
          </tr>
        </thead>
          <tbody>
            <tr v-for="player in visitingFirstSno" :key="player.Lineup">
              <th scope="row" class="text-center">{{player.Lineup}}</th>
              <td class="text-center">{{player.DefendStationCode}}</td>
              <td class="text-center">{{player.CHName}}</td>
            </tr>
          </tbody>
        </table>
      <table class="table table-striped table-bordered table-dark m-5">
        <thead>
          <tr>
            <th scope="col" class="text-center">先發棒次</th>
            <th scope="col" class="text-center">先發位置</th>
            <th scope="col" class="text-center">先發球員</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in homeFirstSno" :key="player.Lineup">
            <th scope="row" class="text-center">{{player.Lineup}}</th>
            <td class="text-center">{{player.DefendStationCode}}</td>
            <td class="text-center">{{player.CHName}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>