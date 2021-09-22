<template>
  <div class="record">
    <h1>CPBL record</h1>
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
