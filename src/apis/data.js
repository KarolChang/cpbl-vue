import { apiHelper } from './helper'

export default {
  getData({ gameSno, kindCode, year, dataType }) {
    return apiHelper.get(`/record/${gameSno}/${kindCode}/${year}/${dataType}`)
  },
  getSchedule({ kindCode, year }) {
    return apiHelper.get(`/schedule/gamedatas/${kindCode}/${year}`)
  },
  getNowStandings() {
    return apiHelper.get(`/standings/now`)
  },
  getStandings({ kindCode, seasonCode }) {
    return apiHelper.get(`/standings/${kindCode}/${seasonCode}`)
  },
  getTodayGame({ gameDate }) {
    return apiHelper.get(`/todaygame/${gameDate}`)
  },
  getSingleData() {
    return apiHelper.get(`/singledata/data`)
  },
  getPlayersId() {
    return apiHelper.get(`/players/data`)
  },
  getPlayerTrans({ year, month }) {
    return apiHelper.get(`/playertrans/${year}/${month}`)
  }
}