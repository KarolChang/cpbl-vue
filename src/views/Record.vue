<template>
  <div class="record m-3"> 
    <ScoreBoard :gameInfo="gameInfo" />
    <LiveLog :gameInfo="gameInfo" />
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue'
import LiveLog from '@/components/LiveLog.vue'
import dataAPI from '../apis/data'
import { teamPicture } from '../utils/teamPicture'

export default {
  name: 'Record',
  components: {
    ScoreBoard,
    LiveLog
  },
  data() {
    return {
      gameInfo: {}
    }
  },
  methods: {
    async fetchTeam(infos) {
      try {
        const gameInfos = {
          ...infos,
          dataType: 'CurtGameDetailJson'
        }
        const { data } = await dataAPI.getData(gameInfos)

        this.gameInfo = {
          visitingTeam: data.data.VisitingTeamName,
          homeTeam: data.data.HomeTeamName,
          visitingPicture: teamPicture[data.data.VisitingTeamName],
          homePicture: teamPicture[data.data.HomeTeamName],
          gameStatus: data.data.GameStatusChi
        }

      } catch(error) {
        console.error('error', error)
      }
    }
  },
  created() {
    this.fetchTeam(this.$route.params)
  }
}
</script>
