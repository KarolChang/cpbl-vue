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
  name: 'LiveLog',
  data() {
    return {
      logs: []
    }
  },
  methods: {
   async fetchLiveLog(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'LiveLogJson'
        }

        const { data } = await dataAPI.getData(gameInfos)
        // console.log('data', data)
        let listedDatas = []
        let tempDatas = []
        let lastPlayer = data['data'][0].HitterName

        // 將資料轉換成依打席區分
        data['data'].forEach(item => {
          if(item.HitterName === lastPlayer) {
            tempDatas.push(item)
          } else {
            listedDatas.push(tempDatas)
            tempDatas = [item]
          }
          lastPlayer = item.HitterName
        })
        // 代表最新的打席，只是該打席還未結束
        if(tempDatas.length) {
          listedDatas.push(tempDatas)
        }

        console.log('listedDatas', listedDatas)

        // logs 放入文字敘述
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
    this.fetchLiveLog(this.$route.params)
  }
}
</script>