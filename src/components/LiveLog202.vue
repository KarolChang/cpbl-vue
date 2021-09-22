<template>
  <h1>各局紀錄</h1>
  <hr>
  <template v-for="log in logs" :key="log.CreateTime">
    <h5>{{log}}</h5>
    <hr>
  </template>
</template>

<script>
import dataAPI from '../apis/data'

export default {
  name: 'LiveLog202',
  data() {
    return {
      logs: []
    }
  },
  methods: {
   async fetchLiveLog() {
      try {
        const { data } = await dataAPI.liveLog202()
        console.log(data)
        let listedDatas = []
        let tempDatas = []
        let lastPlayer = ''

        // 將資料轉換成依打席區分
        data.forEach(item => {
          if(lastPlayer) {
            if(item.HitterName === lastPlayer) {
              tempDatas.push(item)
            } else {
              listedDatas.push(tempDatas)
              tempDatas = [item]
            }
          } else {
            tempDatas.push(item)
          }
          lastPlayer = item.HitterName
        })

        listedDatas.forEach(data => {
          const lastData = data[data.length-1]
          let log = `
            第${lastData.HitterLineup}棒 ${lastData.DefendStationCode} ${lastData.HitterName} ${lastData.Content}
          `
          this.logs.push(log)
        })



      } catch(error) {
        console.error('error', error)
      }
    }
  },
  created() {
    this.fetchLiveLog()
  }
}
</script>