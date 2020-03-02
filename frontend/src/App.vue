<template>
  <div id="app">
    <!-- changable view -->
    <router-view />
  </div>
</template>

<style>
/* global style */
* {
  box-sizing: border-box;
  margin: 0; 
  padding: 0;
}
html, body {
  height: 100%;
}
body {
  font-family: "Open Sans", sans-serif;
}
#app {
  height: 100%;
}
</style>
