<script setup>
import { ref } from 'vue'
import dataAPI from '../apis/data'
import Spinner from '@/components/Spinner.vue'
import { useStore } from '../store/index'
const store = useStore()

// data
const isLoading = ref(true)
const allData = ref([])
const baseUrl = ref('https://www.cpbl.com.tw')
const playerUrl = ref('https://www.cpbl.com.tw/team/person?acnt=')

// methods
const fetchSingleData = async function() {
  try {
    const { data } = await dataAPI.getSingleData()
    allData.value = data.data

    isLoading.value = false

  } catch (error) {
    console.error('error', error)
  }
}

const getPlayersId = store.fetchPlayersId

// created
getPlayersId()
fetchSingleData()
</script>

<template>
  <Spinner v-if="isLoading" />
  <div class="single-data container mt-3" v-else>
    <div class="row g-0">
      <div class="col-12 col-sm-6 mb-5 m-auto" v-for="data in allData" :key="data.action">
        <h5 class="text-success fw-bolder">{{data.action}} {{data.actionEn}}</h5>
        <div class="card">
          <div class="d-flex">
            <div class="px-4 ms-1 mt-3 player-img">
              <img :src="baseUrl + data.firstImg" class="img-fluid rounded-start" alt="player" width="120" height="150">
            </div>
            <div class="card-body">
              <ol>
                <li v-for="(item, index) in data.ranking" :key="item.name">
                  <div class="d-flex justify-content-between fw-bold s-5 mb-3" v-if="index === 0">
                    <div>
                      <a :href="playerUrl + store.$state.playersId[item.name]" target="_blank" class="text-decoration-none">{{item.name}}</a>
                      <small>{{item.team}}</small>
                    </div>
                    <div>{{item.data}}</div>
                  </div>
                  <div class="d-flex justify-content-between fs-6 mb-3" v-else>
                    <div>
                      <a :href="playerUrl + store.$state.playersId[item.name]" target="_blank" class="text-decoration-none">{{item.name}}</a>
                      <small>{{item.team}}</small>
                    </div>
                    <div class="data">{{item.data}}</div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a {
  color: #6C6C6C;
}

a:hover {
  color: orange;
}

@media screen and (max-width: 500px) {
  div[class~="player-img"] {
    display: none;
  }
}
</style>