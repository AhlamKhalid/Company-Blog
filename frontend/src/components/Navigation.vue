<template>
  <div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/news">News</router-link></li>
      <li><router-link to="/events">Events</router-link></li>
      <li><router-link to="/tips">Tips & advices</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped></style>
