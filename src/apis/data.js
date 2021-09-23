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
  getData({ gameSno, kindCode, year, dataType }) {
    return apiHelper.get(`/record/${gameSno}/${kindCode}/${year}/${dataType}`)
  }
}