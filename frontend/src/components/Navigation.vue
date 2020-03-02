<template>
  <nav>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/news">News</router-link></li>
      <li><router-link to="/events">Events</router-link></li>
      <li><router-link to="/tips">Tips & advices</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped>
nav {
  text-align: right;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
  /* only right & left */
  margin: 0 10px;
}
/* router-link */
a {
  text-decoration: none;
  color: #001f3f;
}
/* active link */
.router-link-active {
  color: #657c92;
}
@media screen and (max-width: 800px) {
  nav {
    text-align: center;
  }
}
</style>
