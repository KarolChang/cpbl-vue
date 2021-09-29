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

<script>
import dataAPI from '../apis/data'

export default {
  name: 'FirstSnos',
  data() {
    return {
      isLoading: true,
      visitingFirstSno: [],
      homeFirstSno: []
    }
  },
  methods: {
    async fetchGameStatus(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'CurtGameDetailJson'
        }

        const { data } = await dataAPI.getData(gameInfos)

        const visitingFirstSno = []
        const homeFirstSno = []

        data.data.FirstSnos.forEach(player => {
          if(player.VisitingHomeType === '1') {
            visitingFirstSno[player.Lineup - 1] = player
          }
          if(player.VisitingHomeType === '2') {
            homeFirstSno[player.Lineup - 1] = player
          }
        })

        this.visitingFirstSno = visitingFirstSno
        this.homeFirstSno = homeFirstSno

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  created() {
    this.fetchGameStatus(this.$route.params)
    this.isLoading = false
    // 傳到 Record 父元件
    this.$emit('loading-finished', 'FirstSnos')
  }
}
</script>