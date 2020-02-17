<template>
  <div>
    <Navigation />
    <div>
      <p>{{ article.title }}</p>
      <p>{{ article.added_at }}</p>
      <p>{{ article.content }}</p>
      <img v-if="article.image" :src="`http://localhost:3000/uploads/${article.image}`" alt="image" style="width: 200px;">
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  data() {
    return {
      // article
      article: null
    }
  },
  components: {
    Navigation
  },
  created() {
    // get the article 
    this.article = this.$route.params.article;
  }
};
</script>

<style></style>
