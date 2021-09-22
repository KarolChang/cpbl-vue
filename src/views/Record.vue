<template>
  <div class="record m-3"> 
    <router-link to="/">Home</router-link>
    <ScoreBoard />
    <LiveLog />
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue'
import LiveLog from '@/components/LiveLog.vue'

export default {
  name: 'Record',
  components: {
    ScoreBoard,
    LiveLog
  }
}
</script>
