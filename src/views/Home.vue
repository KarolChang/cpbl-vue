<template>
  <div class="home m-3">
    <h1>賽程</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <router-link to="/record">第1場 中信兄弟 vs 統一7-ELEVEn獅</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/record202">第202場 統一7-ELEVEn獅 vs 中信兄弟</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
