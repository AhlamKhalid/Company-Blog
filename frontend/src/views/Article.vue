<template>
  <div>
    <Navigation />
    <div v-if="article">
      <p>{{ article.title }}</p>
      <p>{{ article.added_at }}</p>
      <p>{{ article.content }}</p>
      <img
        v-if="article.image"
        :src="getImage(article.image)"
        alt="image"
        style="width: 200px;"
      />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import axios from "axios";
export default {
  data() {
    return {
      // article
      article: null
    };
  },
  components: {
    Navigation
  },
  created() {
    const section = this.$route.params.section;
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:3000/${section}/${id}`)
      .then(response => {
        this.article = response.data;
      })
      .catch(error => console.log(error.message));
  },
  methods: {
    getImage(image) {
      const url = "http://localhost:3000/uploads/";
      return url + image;
    }
  }
};
</script>

<style></style>
