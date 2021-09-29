<template>
  <div id="nav">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/">
          <img alt="Cpbl logo" src="./assets/CPBL_logo.png" width="300" hright="300">
        </router-link>
        <img alt="visiting-logo" src="./assets/lion.png" width="100" hright="100">
        <img alt="visiting-logo" src="./assets/brother.png" width="100" hright="100">
        <img alt="visiting-logo" src="./assets/monkey.png" width="100" hright="100">
        <img alt="visiting-logo" src="./assets/guardian.png" width="100" hright="100">
        <img alt="visiting-logo" src="./assets/dragon.png" width="100" hright="100">
    </div>
    </nav>  
  </div>
  <hr>
  <router-view/>
</template>