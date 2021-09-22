import { apiHelper } from './helper'

export default {
  liveLog() {
    return apiHelper.get('/livelog')
  },
  scoreBoard() {
    return apiHelper.get('/scoreboard')
  }
}