<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap');
div {
  font-family: 'Kaisei Opti', sans-serif;
}
.text-orange {
  color: orange;
}
</style>