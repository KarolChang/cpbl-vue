<template>
  <div class="record m-3"> 
    <router-link to="/">Home</router-link>
    <ScoreBoard202 />
    <LiveLog202 />
  </div>
</template>

<script>
import ScoreBoard202 from '@/components/ScoreBoard202.vue'
import LiveLog202 from '@/components/LiveLog202.vue'

export default {
  name: 'Record202',
  components: {
    ScoreBoard202,
    LiveLog202
  }
}
</script>
