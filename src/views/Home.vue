<template>
  <div class="home m-3">
    <h1>賽程</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '1', kindCode: 'A', year: '2021' }}">第1場 一軍 中信兄弟 vs 統一7-ELEVEn獅</router-link>
      </li>
      <li class="list-group-item">
        <router-link :to="{ name: 'Record', params: { gameSno: '85', kindCode: 'D', year: '2021' }}">第85場 二軍 中信兄弟 vs 味全龍</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
