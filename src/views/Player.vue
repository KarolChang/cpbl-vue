<script setup>
import { ref, watch } from 'vue'
import dataAPI from '../apis/data'
import Spinner from '@/components/Spinner.vue'

// data
const isLoading = ref(true)
const playerTrans = ref({})
const years = ref(Array.from({length: 5}, (_, i) => new Date().getFullYear()-i))
const months = ref(({length: 12}, (_, i) => i+1))
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

// methods
const fetchPlayerTrans = async function(year, month) {
  try {
    isLoading.value = true
    const { data } = await dataAPI.getPlayerTrans({ year, month })
    const formatData = []
    for (let key in data) {
      formatData.unshift([key, data[key]])
    }
    playerTrans.value = formatData
    isLoading.value = false
  } catch(error) {
    console.error('error', error)
  }
}

// created
fetchPlayerTrans(year.value, month.value)

// watch
watch(year, () => {
  fetchPlayerTrans(year.value, month.value)
}) 

watch(month, async() => {
  fetchPlayerTrans(year.value, month.value)
})
</script>

<template>
  <Spinner v-if="isLoading" />
  <div class="player m-3" v-else>
    <header class="pb-3 mb-4 border-bottom">
      <span class="fs-3">球員異動</span>
    </header>
    <!-- dropdown -->
    <div class="row justify-content-around my-4 mb-3">
      <div class="col-4">
        <select class="form-select" v-model="year">
          <option v-for="year in years" :key="year" :value="year">{{year}}年</option>
        </select>
      </div>
      <div class="col-4">
        <select class="form-select" v-model.lazy="month">
          <option v-for="month in months" :key="month" :value="month">{{month}}月</option>
        </select>
      </div>
    </div>
    <!-- table -->
    <div class="mx-4">
      <table class="table table-bordered border-primary">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="day">日期</th>
            <th scope="col" class="com">球員</th>
            <th scope="col" class="com">球隊</th>
            <th scope="col" class="mobile">球員/球隊</th>
            <th scope="col">原因</th>
          </tr>
        </thead>
        <tbody>
          <!-- com -->
          <template v-for="players in playerTrans" :key="players[0]">
            <tr v-for="(player, index) in players[1]" :key="index" class="com">
              <td :rowspan="players[1].length" v-if="index === 0">{{players[0]}}</td>
              <td>{{player[0]}}</td>
              <td>{{player[1]}}</td>
              <td>{{player[2]}}</td>
            </tr>
          </template>
          <!-- mobile -->
          <template v-for="players in playerTrans" :key="players[0]">
            <tr v-for="(player, index) in players[1]" :key="index" class="mobile">
              <td :rowspan="players[1].length" v-if="index === 0">{{players[0].slice(5)}}</td>
              <td>
                <div>{{player[0]}}</div>
                <div style="font-size:0.5em;">({{player[1]}})</div>
              </td>
              <td>{{player[2]}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
th, td {
  text-align: center;
}

@media screen and (max-width: 500px) {
  th[class~="com"] {
    display: none;
  }
  tr[class~="com"] {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  th[class~="mobile"] {
    display: none;
  }
  tr[class~="mobile"] {
    display: none;
  }
}
</style>