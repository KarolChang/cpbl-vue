<template>
  <div class="home m-3">
    <h1>賽程</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '205', kindCode: 'A', year: '2021' }}">第205場 一軍 統一7-ELEVEn獅 vs 中信兄弟</router-link>
      </li>
      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '206', kindCode: 'A', year: '2021' }}">第206場 一軍 樂天桃猿 vs 味全龍</router-link>
      </li>

      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '207', kindCode: 'A', year: '2021' }}">第207場 一軍 統一7-ELEVEn獅 vs 富邦悍將</router-link>
      </li>
      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '208', kindCode: 'A', year: '2021' }}">第208場 一軍 樂天桃猿 vs 味全龍</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
