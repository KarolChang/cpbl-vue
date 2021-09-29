<template>
  <div class="home m-3">
    <h1>賽程</h1>
    <ul class="list-group">
      
      <li class="list-group-item">
        <!-- <span>{{fetchGameStatus({ gameSno: '199', kindCode: 'A', year: '2021' }).GameStatusChi}}</span> -->
        <router-link :to="{ name: 'Record', params: { gameSno: '199', kindCode: 'A', year: '2021' }}">第199場 一軍 樂天桃猿 vs 富邦悍將 (12局)</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '209', kindCode: 'A', year: '2021' }}">第209場 一軍 中信兄弟 vs 富邦悍將</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '210', kindCode: 'A', year: '2021' }}">第210場 一軍 樂天桃猿 vs 味全龍</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '90', kindCode: 'D', year: '2021' }}">第90場 二軍 統一7-ELEVEn獅 vs 味全龍</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '211', kindCode: 'A', year: '2021' }}">第211場 一軍 統一7-ELEVEn獅 vs 味全龍</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '212', kindCode: 'A', year: '2021' }}">第212場 一軍 中信兄弟 vs 富邦悍將</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
// import dataAPI from '../apis/data'

export default {
  name: 'Home',
  // methods: {
  //   async fetchGameStatus(infos) {
  //     try {
  //       const gameInfos = {
  //         ...infos,
  //         dataType: 'CurtGameDetailJson'
  //       }
  //       const { data } = await dataAPI.getData(gameInfos)
  //       // console.log('data', data.data.GameStatusChi)

  //       return data.data

  //     } catch (error) {
  //       console.error('error', error)
  //     }
  //   }
  // }
}
</script>
