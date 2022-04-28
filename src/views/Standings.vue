<script setup>
import { ref, reactive } from 'vue'
import dataAPI from '../apis/data'
import Spinner from '@/components/Spinner.vue'
import { teamSmallPic } from '../utils/teamPicture'

// data
const isLoading = ref(true)
const standings = reactive({})

// methods
const fetchStandings = async function() {
  try {
    const upInfos = { kindCode: 'A', seasonCode: '1' }
    const downInfos = { kindCode: 'A', seasonCode: '2' }
    const allInfos = { kindCode: 'A', seasonCode: '0' }
    const upRes = await dataAPI.getStandings(upInfos)
    const downRes = await dataAPI.getStandings(downInfos)
    const allRes = await dataAPI.getStandings(allInfos)
    standings['上半季'] = upRes.data.data
    standings['下半季'] = downRes.data.data
    standings['全年度'] = allRes.data.data

    isLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}

// created
fetchStandings()

</script>

<template>
  <Spinner v-if="isLoading" />
  <div class="standings m-3" v-else>
    <header class="pb-3 mb-4 border-bottom">
      <span class="fs-3">戰績</span>
    </header>
    <template v-for="(standing, key) in standings" :key="key">
      <h3 class="text-center border-bottom pb-2">{{key}}</h3>
      <table class="table table-info table-striped mb-5">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center">排名</th>
            <th scope="col" class="text-center com-ui"></th>
            <th scope="col" class="text-center">球隊</th>
            <th scope="col" class="text-center">出賽數</th>
            <th scope="col" class="text-center">勝-和-敗</th>
            <th scope="col" class="text-center">勝率</th>
            <th scope="col" class="text-center">勝差</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in standing" :key="item.team">
            <td scope="row" class="text-center rank">{{item.rank}}</td>
            <td class="text-center">
              <img :src="teamSmallPic[item.team]" alt="small-logo" width="30" height="30">
            </td>
            <td class="text-center com-ui">{{item.team}}</td>
            <td v-for="data in item.allData" :key="data" class="text-center">{{data}}</td>
          </tr>
        </tbody>
      </table>   
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Salsa&display=swap');
@media screen and (max-width: 500px) {
  th {
    font-size: 0.5em;
  }

  td[class~="team"] {
    display: none;
  }

  .com-ui {
    display: none;
  }

  .rank {
    font-family: 'Chakra Petch', sans-serif;
  }

  td {
    font-family: 'Salsa', sans-serif;
  }
}
</style>