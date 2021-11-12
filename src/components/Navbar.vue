<script setup>
import { ref } from 'vue'
import { teamBigPic } from '../utils/teamPicture'
const teamImgBig = ref(teamBigPic)
</script>

<template>
  <div id="navbar">
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <router-link to="/">
            <img alt="Cpbl logo" src="../assets/CPBL_logo.png" width="150" hright="50" class="pb-3 me-2">
          </router-link>
          <ul class="nav col-12 col-sm-auto col-md-auto me-md-auto justify-content-center mb-md-0">
            <li>
              <router-link to="/" class="nav-link text-white">
                <div class="text-center mb-1"><i class="fas fa-home fa-2x"></i></div>
                首頁
              </router-link>
            </li>
            <li>
              <router-link to="/schedule" class="nav-link text-white">
                <div class="text-center  mb-1"><i class="fas fa-calendar-alt fa-2x"></i></div>
                賽程
              </router-link>
            </li>
            <li>
              <router-link to="/standings" class="nav-link text-white">
                <div class="text-center mb-1"><i class="fas fa-clipboard-list fa-2x"></i></div>
                戰績
              </router-link>
            </li>
            <li>
              <router-link to="/single" class="nav-link text-white">
                <div class="text-center mb-1"><i class="fas fa-trophy fa-2x"></i></div>
                單項排名
              </router-link>
            </li>
          </ul>
        </div>
        <ul class="nav" id="logo-big" style="position:absolute;top:25px;right:20px;">
          <li>
            <router-link to="/jianmiau">
              <i class="fas fa-skull-crossbones text-dark"></i>
            </router-link>
          </li>
          <li><img alt="lion-logo" :src="teamImgBig['統一7-ELEVEn獅']" width="60" hright="60"></li>
          <li><img alt="brother-logo" :src="teamImgBig['中信兄弟']" width="60" hright="60"></li>
          <li><img alt="brother-logo" :src="teamImgBig['樂天桃猿']" width="60" hright="60"></li>
          <li><img alt="brother-logo" :src="teamImgBig['富邦悍將']" width="60" hright="60"></li>
          <li><img alt="brother-logo" :src="teamImgBig['味全龍']" width="60" hright="60"></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<style>
@media screen and (max-width: 870px) {
  #logo-big {
    display: none;
  }
}
</style>