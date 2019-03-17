<template>
  <div id="app">
   <img class="logo" alt="logo" src="./assets/chef.svg" />
    <router-view class="container-fuild"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #464a5f;
  font-size: 1em;
}
img.logo {
  width: 150px;
  height: 100px;
}
.container-fuild{
  margin: 1em 0;
  overflow: hidden;
}
</style>
