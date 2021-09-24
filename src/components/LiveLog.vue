<template>
  <h1>各局紀錄</h1>
  <hr>
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in oneUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in oneDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <!-- 重複的 -->
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in twoUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in twoDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in threeUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in threeDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in fourUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in fourDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in fiveUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in fiveDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in sixUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in sixDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in sevenUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in sevenDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in eightUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in eightDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="up">
    <li class="list-group-item" v-for="logs in nineUpLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
  <ul class="list-group" id="down">
    <li class="list-group-item" v-for="logs in nineDownLog" :key="logs[0].CreateTime">
      <h2 class="text-success">{{logs[0].InningSeq}}局{{logs[0].VisitingHomeType === '1' ? '上' : '下'}}</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + logs[0].MainEventNo" aria-expanded="true" aria-controls="collapseOne">
              第{{logs[0].HitterLineup}}棒 {{logs[0].DefendStationCode}} {{logs[0].HitterName}} {{logs[logs.length-1].Content}}
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
</template>

<script>
import dataAPI from '../apis/data'

export default {
  name: 'LiveLog',
  data() {
    return {
      listedDatas: [],
      oneUpLog: [],
      oneDownLog: [],
      twoUpLog: [],
      twoDownLog: [],
      threeUpLog: [],
      threeDownLog: [],
      fourUpLog: [],
      fourDownLog: [],
      fiveUpLog: [],
      fiveDownLog: [],
      sixUpLog: [],
      sixDownLog: [],
      sevenUpLog: [],
      sevenDownLog: [],
      eightUpLog: [],
      eightDownLog: [],
      nineUpLog: [],
      nineDownLog: [],
      // listedLogs: {},
      // InningLog: []
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
        let lastPlayer = data['data'][0].HitterName
        let lastVisitingHomeType = data['data'][0].VisitingHomeType

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

        this.listedDatas = listedDatas

        this.listData()

      } catch(error) {
        console.error('error', error)
      }
    },
    listData() {
      this.oneUpLog = this.listedDatas[0]
      this.oneDownLog = this.listedDatas[1]
      this.twoUpLog = this.listedDatas[2]
      this.twoDownLog = this.listedDatas[3]
      this.threeUpLog = this.listedDatas[4]
      this.threeDownLog = this.listedDatas[5]
      this.fourUpLog = this.listedDatas[6]
      this.fourDownLog = this.listedDatas[7]
      this.fiveUpLog = this.listedDatas[8]
      this.fiveDownLog = this.listedDatas[9]
      this.sixUpLog = this.listedDatas[10]
      this.sixDownLog = this.listedDatas[11]
      this.sevenUpLog = this.listedDatas[12]
      this.sevenDownLog = this.listedDatas[13]
      this.eightUpLog = this.listedDatas[14]
      this.eightDownLog = this.listedDatas[15]
      this.nineUpLog = this.listedDatas[16]
      this.nineDownLog = this.listedDatas[17]

      this.listedLogs = {
        oneUpLog: this.oneUpLog,
        oneDownLog: this.oneDownLog,
        twoUpLog: this.twoUpLog,
        twoDownLog: this.twoDownLog
      }
    },
    // inningButtonClick(inningUp, inningDown) {
    //   this.InningLog = 
    // }
  },
  created() {
    this.fetchLiveLog(this.$route.params)
  }
}
</script>