import { defineStore } from 'pinia'
import dataAPI from '../apis/data'

export const useStore = defineStore('index', {
  // id: 'test',
  state: () => ({
    playersId: {}
  }),
  getter: {},
  actions: {
    async fetchPlayersId() {
      try {
        const { data } = await dataAPI.getPlayersId()
        this.playersId = data
        console.log('this.playersId', this.playersId)
      } catch (error) {
        console.error('error', error)
      }
    }
  }
})
