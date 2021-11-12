<script setup>
import { ref } from 'vue' 
import { useRoute } from 'vue-router'
import dataAPI from '../../apis/data'
const route = useRoute()
const emit = defineEmits(['loading-finished'])

// props
const props = defineProps({
  gameInfo: Object
})

// data
const isLoading = ref(true)
const listedLogs = ref({})
const filteredInningLog = ref([])
// 目前總共打到幾局
const innings = ref(0)
// user選擇的局數
const chosenInning = ref(0)
const baseUrl = ref('https://www.cpbl.com.tw')

// methods
const fetchLiveLog = async function(infos) {
  try {
    
    const gameInfos = {
      ...infos,
      dataType: 'LiveLogJson'
    }

    const { data } = await dataAPI.getData(gameInfos)

    // 紀錄現在打到第幾局
    const inning = data.data[data.data.length-1].InningSeq
    innings.value = inning
    // 如果比賽結束， chosenInning = 1
    chosenInning.value = props.gameInfo.gameStatus === '比賽結束' ? 1 : inning

    // 整理資料
    const logs = {}
    for(let i = 1; i <= innings.value; i++) {
      logs[i.toString()] = {'1': [], '2': []}
    }

    const datas = data.data
    let lastHitterAcnt = datas[0].HitterAcnt
    let tempArr = []
    datas.forEach((item, index) => {
      if(item.IsChangePlayer === '1') {
        // push 上一筆資料
        const lastData = datas[index-1]
        if(tempArr.length) {
          logs[lastData.InningSeq][lastData.VisitingHomeType].push(tempArr)
          tempArr = []
        }
        // push 這一筆資料
        logs[item.InningSeq][item.VisitingHomeType].push([item])
        lastHitterAcnt = item.HitterAcnt
        return 
      }
      if(item.HitterAcnt === lastHitterAcnt) {
        tempArr.push(item)
      } else {
        const lastData = datas[index-1]
        logs[lastData.InningSeq][lastData.VisitingHomeType].push(tempArr)
        tempArr = [item]
      }
      lastHitterAcnt = item.HitterAcnt
    })

    // 最後一筆資料也放進去
    if(tempArr.length) {
      logs[tempArr[0].InningSeq][tempArr[0].VisitingHomeType].push(tempArr)
    }

    listedLogs.value = logs
    filterInningLog(chosenInning.value)
  
  } catch(error) {
    console.error('error', error)
  }
}

const filterInningLog = function(inning) {
  chosenInning.value = inning
  filteredInningLog.value = listedLogs.value[inning.toString()]
}

const showActionColor = function(action) {
  switch(action) {
    case '一安':
      return 'btn btn-primary ms-3'
    case '二安':
      return 'btn btn-primary ms-3'
    case '三安':
      return 'btn btn-primary ms-3'
    case '內安':
      return 'btn btn-primary ms-3'
    case '場安':
      return 'btn btn-primary ms-3'
    case '全打':
      return 'btn btn-primary ms-3'
    case '左飛':
      return 'btn btn-secondary ms-3'
    case '中飛':
      return 'btn btn-secondary ms-3'
    case '右飛':
      return 'btn btn-secondary ms-3'
    case '內飛':
      return 'btn btn-secondary ms-3'
    case '一飛':
      return 'btn btn-secondary ms-3'
    case '二飛':
      return 'btn btn-secondary ms-3'
    case '三飛':
      return 'btn btn-secondary ms-3'
    case '游飛':
      return 'btn btn-secondary ms-3'
    case '界飛':
      return 'btn btn-secondary ms-3'
    case '投滾':
      return 'btn btn-secondary ms-3'
    case '捕滾':
      return 'btn btn-secondary ms-3'
    case '一滾':
      return 'btn btn-secondary ms-3'
    case '二滾':
      return 'btn btn-secondary ms-3'
    case '三滾':
      return 'btn btn-secondary ms-3'
    case '游滾':
      return 'btn btn-secondary ms-3'
    case '四壞':
      return 'btn btn-success ms-3'
    case '故四':
      return 'btn btn-success ms-3'
    case '犧飛':
      return 'btn btn-success ms-3'
    case '犧短':
      return 'btn btn-success ms-3'
    case '死球':
      return 'btn btn-success ms-3'
    case '投失':
      return 'btn btn-warning ms-3'
    case '二失':
      return 'btn btn-warning ms-3'
    case '三失':
      return 'btn btn-warning ms-3'
    case '游失':
      return 'btn btn-warning ms-3'
    case '犧選':
      return 'btn btn-warning ms-3'
    case '三振':
      return 'btn btn-danger ms-3'
    case '雙殺':
      return 'btn btn-danger ms-3'
  }
}

// created
async function showView() {
  await fetchLiveLog(route.params)
  isLoading.value = false
  // 傳到 GameDetail 父元件
  emit('loading-finished', 'LiveLog')
}
showView()
// methods not use
// const filterInningLog = function(inning) {
//   // 按鈕換顏色 
//   this.nowInning = inning
//   // 拿資料
//   const upInning = inning.toString() + '-' + '1'
//   const downInning = inning.toString() + '-' + '2'
//   let filteredInningLog = []
//   if(this.listedLogs[upInning]) {
//     filteredInningLog.push(this.listedLogs[upInning])
//   }
//   if(this.listedLogs[downInning]) {
//     filteredInningLog.push(this.listedLogs[downInning])
//   }

//   this.filteredInningLog = filteredInningLog

// }

// const fetchLiveLog = async function(infos) {
//   try {
//     const gameInfos = {
//       ...infos,
//       dataType: 'LiveLogJson'
//     }

//     const { data } = await dataAPI.getData(gameInfos)
    
//     // 紀錄現在打到第幾局
//     const nowInning = data.data[data.data.length-1].InningSeq
//     this.nowInning = nowInning
//     this.innings = nowInning
//     // 如果比賽結束，nowInning = 1
//     this.nowInning = this.gameInfo.gameStatus === '比賽結束' ? 1 : this.nowInning

//     // 整理資料
//     const listedLogs = {}
//     for(let i = 1; i < 13; i++) {
//       listedLogs[i.toString()] = [[], []]
//     }
//     const keywords = ['全壘打', '安打', '出局', '四壞球', '觸身死球', '失誤']

//     data.data.forEach(item => {
//       if(item.Content.includes('盜壘刺 2人出局')) {
//         return
//       }
//       for(let i = 0; i < keywords.length; i++) {
//         if(item.Content.includes(keywords[i])) {
//           if(item.VisitingHomeType === '1') {
//             listedLogs[item.InningSeq][0].push(item)
//           } else {
//             listedLogs[item.InningSeq][1].push(item)
//           }
//           return
//         }
//       }
//     })

//     this.listedLogs = listedLogs

//   } catch(error) {
//     console.error('error', error)
//   }
// }

// const fetchLiveLog = async function(infos) {
//   try {
//     const gameInfos = {
//       ...infos,
//       dataType: 'LiveLogJson'
//     }

//     const { data } = await dataAPI.getData(gameInfos)
    
//     // 紀錄現在打到第幾局
//     const nowInning = data.data[data.data.length-1].InningSeq
//     this.nowInning = nowInning
//     this.innings = nowInning
//     // 如果比賽結束，nowInning = 1
//     this.nowInning = this.gameInfo.gameStatus === '比賽結束' ? 1 : this.nowInning

//     // 整理資料
//     let listedDatas = []
//     let inningDatas = []
//     let hitterDatas = []
//     let lastPlayer = data['data'][0] ? data['data'][0].HitterName : ''
//     let lastVisitingHomeType = data['data'][0] ? data['data'][0].VisitingHomeType : ''

//     data['data'].forEach(item => {
//       if(item.HitterName === lastPlayer) {
//         hitterDatas.push(item)
//       } else {
//         inningDatas.push(hitterDatas)
//         hitterDatas = [item]
//       }

//       if(item.VisitingHomeType !== lastVisitingHomeType) {
//         listedDatas.push(inningDatas)
//         inningDatas = []
//       }
//       // 紀錄上一筆資料的 HitterName & VisitingHomeType
//       lastPlayer = item.HitterName
//       lastVisitingHomeType = item.VisitingHomeType  
//     })
//     // 代表最新的打席，只是該打席還未結束
//     if(hitterDatas.length) {
//       inningDatas.push(hitterDatas)
//     }
//     if(inningDatas.length) {
//       listedDatas.push(inningDatas)
//     }
    
//     // 資料放入 listedLogs
//     const objLogs = {}
//     listedDatas.forEach(inningData => {
//       const key = inningData[0][0].InningSeq + '-' + inningData[0][0].VisitingHomeType
//       objLogs[key] = inningData
//     })
//     this.listedLogs = objLogs

//   } catch(error) {
//     console.error('error', error)
//   }
// }
</script>

<template>
  <div class="live-log mb-5" v-if="!isLoading">
    <h1 class="text-center bg-success mb-3">文字轉播</h1>
    <!-- 分局 -->
    <div class="d-flex mb-2">
      <a v-for="inn in innings" :key="inn" @click="filterInningLog(inn)">
        <div v-if="inn !== chosenInning" class="bg-light py-2 px-3 me-2" style="border-radius:50%;cursor:pointer;" width="40" height="40">{{inn}}</div>
        <div v-else class="bg-info py-2 px-3 me-2" style="border-radius:50%;cursor:pointer;" width="40" height="40">{{inn}}</div>
      </a>
    </div>
    <!-- 紀錄 -->
    <template v-for="inning in filteredInningLog" :key="inning">
      <ul class="list-group mb-3" v-if="inning.length">
        <h2 class="text-light bg-dark p-2 text-center">{{inning[0][0].InningSeq}}局{{inning[0][0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
        <li class="list-group-item">
          <div class="accordion" id="accordionExample" v-for="bat in inning" :key="bat[0].CreateTime">
            <div class="alert alert-warning my-3" role="alert" v-if="bat[0].IsChangePlayer === '1'">
              {{bat[0].Content}}
            </div>
            <div class="accordion-item" v-else>
              <h2 class="accordion-header mb-2" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + bat[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
                  <div class="d-flex">
                    <img :src="baseUrl + bat[0].HitterImgPath" alt="player" width="80" height="100">
                    <div class="ms-3">
                      <h4>第{{bat[0].HitterLineup}}棒 {{bat[0].DefendStationCode}} {{bat[0].HitterName}}
                        <button :class="showActionColor(bat[0].BattingActionName)" v-if="bat[0].BattingActionName">{{bat[0].BattingActionName}}</button>
                        <i class="fas fa-exclamation-circle fa-lg ms-2 text-warning" v-else-if="!bat[0].BattingActionName"></i>
                      </h4>
                      <h5>{{bat[bat.length-1].Content}}</h5>
                    </div>
                  </div>
                </button>
              </h2>
              <div class="m-3">
                <!-- <h5>{{bat[bat.length-1].Content}}</h5> -->
                <div class="d-flex">
                  <div class="strike-ball-count">
                    <!-- 好球 -->
                    <div class="ms-1 my-2 d-flex justify-content-start">
                      <strong class="me-1">S</strong>
                      <div class="me-1" v-if="bat[bat.length-1].StrikeCnt >= 1"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                      <div class="me-1" v-if="bat[bat.length-1].StrikeCnt >= 2"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                      <div class="me-1" v-if="bat[bat.length-1].StrikeCnt >= 3"><i class="fas fa-circle" style="color:#FFD306;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>            
                    </div>
                    <!-- 壞球 -->
                    <div class="ms-1 my-2 d-flex justify-content-start">
                      <strong class="me-1">B</strong>
                      <div class="me-1" v-if="bat[bat.length-1].BallCnt >= 1"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                      <div class="me-1" v-if="bat[bat.length-1].BallCnt >= 2"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                      <div class="me-1" v-if="bat[bat.length-1].BallCnt >= 3"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                      <div class="me-1" v-if="bat[bat.length-1].BallCnt >= 4"><i class="fas fa-circle" style="color:#8CEA00;"></i></div>
                      <div class="me-1" v-else><i class="far fa-circle"></i></div>
                    </div>
                  </div>
                  <div class="score ms-3 m-auto fs-3">
                    <img :src="gameInfo.visitingSmallPic" alt="visiting-logo" width="35" height="35">
                    {{bat[bat.length-1].VisitingScore}} : {{bat[bat.length-1].HomeScore}} 
                    <img :src="gameInfo.homeSmallPic" alt="home-logo" width="35" height="35">
                  </div>
                </div>
              </div>
              <!-- 逐球紀錄 -->
              <div :id="'id' + bat[0].MainEventNo" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div v-for="log in bat" :key="log.CreateTime" style="border-top:1px solid #8E8E8E;" class="accordion-body">
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
    </template>
  </div>
</template>