import { apiHelper } from './helper'

// export default {
//   liveLog({GameSno, KindCode, Year}) {
//     return apiHelper.get(`/livelog?GameSno=${GameSno}&KindCode=${KindCode}&Year=${Year}`)
//   },
//   scoreBoard({GameSno, KindCode, Year}) {
//     return apiHelper.get('/scoreboard?GameSno=${GameSno}&KindCode=${KindCode}&Year=${Year}')
//   }
// }

export default {
  liveLog() {
    return apiHelper.get(`/livelog`)
  },
  scoreBoard() {
    return apiHelper.get('/scoreboard')
  },
  liveLog202() {
    return apiHelper.get(`/livelog202`)
  },
  scoreBoard202() {
    return apiHelper.get('/scoreboard202')
  }
}