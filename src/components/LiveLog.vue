<template>
  <h1>各局紀錄</h1>
  <hr>
  <ul class="list-group mb-3" v-for="inning in listedLogs" :key="inning[0][0].CreateTime">
    <h2 class="text-light bg-dark p-2 text-center">{{inning[0][0].InningSeq}}局{{inning[0][0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
    <li class="list-group-item" v-for="logs in inning" :key="logs[0].CreateTime">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} 
              <template v-if="logs[logs.length-1].Content !== '比賽結束'">
                {{logs[logs.length-1].Content}}
              </template>
              <template v-else>{{logs[logs.length-2].Content}}</template>
            </button>
          </h2>
          <!-- 好壞球 -->
          <div class="ms-3 my-2 d-flex justify-content-start">
            <!-- 好球 -->
            <div class="me-1" v-if="logs[logs.length-1].StrikeCnt >= 1"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
            <div class="me-1" v-if="logs[logs.length-1].StrikeCnt >= 2"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
            <div class="me-1" v-if="logs[logs.length-1].StrikeCnt >= 3"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>            
          </div>
          <!-- 壞球 -->
          <div class="ms-3 my-2 d-flex justify-content-start">
            <div class="me-1" v-if="logs[logs.length-1].BallCnt >= 1"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
            <div class="me-1" v-if="logs[logs.length-1].BallCnt >= 2"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
            <div class="me-1" v-if="logs[logs.length-1].BallCnt >= 3"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
            <div class="me-1" v-if="logs[logs.length-1].BallCnt >= 4"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
            <div class="me-1" v-else><i class="far fa-circle"></i></div>
          </div>
          <div :id="'id' + logs[0].MainEventNo" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <!-- 逐球紀錄 -->
            <div v-for="log in logs" :key="log.CreateTime" style="border-top:1px solid #8E8E8E;" class="accordion-body">
              <div class="d-flex justify-content-between">
                <span>{{log.Content}}</span>
                <span>{{log.BallCnt}}-{{log.StrikeCnt}}</span>
              </div>        
            </div>
          </div>
        </div>
      </div> 
    </li>
  </ul>
  <h2 class="text-warning bg-dark p-2 text-center">{{gameInfo.gameStatus}}</h2>
</template>

<script>
import dataAPI from '../apis/data'

export default {
  name: 'LiveLog',
  props: {
    gameInfo: {
      type: Object,
      default: () => {
        return {
          visitingTeam: '',
          homeTeam: '',
          visitingPicture: '',
          homePicture: '',
          gameStatus: ''
        }
      }
    }
  },
  data() {
    return {
      // listedDatas: [],
      listedLogs: {}
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
        let inningDatas = []
        let hitterDatas = []
        let lastPlayer = data['data'][0] ? data['data'][0].HitterName : ''
        let lastVisitingHomeType = data['data'][0] ? data['data'][0].VisitingHomeType : ''

        // 整理資料
        data['data'].forEach(item => {
          if(item.HitterName === lastPlayer) {
            hitterDatas.push(item)
          } else {
            inningDatas.push(hitterDatas)
            hitterDatas = [item]
          }

          if(item.VisitingHomeType !== lastVisitingHomeType) {
            listedDatas.push(inningDatas)
            inningDatas = []
          }
          // 紀錄上一筆資料的 HitterName & VisitingHomeType
          lastPlayer = item.HitterName
          lastVisitingHomeType = item.VisitingHomeType
        })
        // 代表最新的打席，只是該打席還未結束
        if(hitterDatas.length) {
          inningDatas.push(hitterDatas)
        }
        if(inningDatas.length) {
          listedDatas.push(inningDatas)
        }

        // this.listedDatas = listedDatas
        
        // 資料放入 listedLogs
        const objLogs = {}
        listedDatas.forEach(inningData => {
          const key = inningData[0][0].InningSeq + '-' + inningData[0][0].VisitingHomeType
          objLogs[key] = inningData
        })
        this.listedLogs = objLogs

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  created() {
    this.fetchLiveLog(this.$route.params)
  }
  // async created() {
  //   try {
  //     await this.fetchLiveLog(this.$route.params)
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }
}
</script>