<template>
  <div class="record"> 
    <router-link to="/">Home</router-link>
    <ScoreBoard />
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue'

export default {
  name: 'Record',
  components: {
    ScoreBoard
  }
}
</script>
