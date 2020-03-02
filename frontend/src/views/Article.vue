<template>
  <div>
    <div class="container">
      <!-- nav bar -->
      <Navigation class="navigation" />
      <!-- when article is populted, display this part -->
      <div v-if="article">
        <div class="header">
          <div class="line"></div>
          <div class="txt">
            <p class="title">{{ article.title }}</p>
            <p class="date">{{ formatDate(article.added_at) }}</p>
          </div>
        </div>
        <!-- display image element if there is image -->
        
        <img
          v-if="article.image"
          :src="getImage(article.image)"
          alt="post image"
          class="image"
        />
        <p class="article">{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// Navigation bar
import Navigation from "@/components/Navigation";
// axios
import axios from "axios";
// function to format date
import getDate from "@/date";

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
    // get route params
    const section = this.$route.params.section;
    const id = this.$route.params.id;
    // get article
    // backend endpoint: /:section/:id
    axios
      .get(`http://localhost:3000/${section}/${id}`)
      .then(response => {
        this.article = response.data;
      })
      .catch(error => console.log(error.message));
  },
  methods: {
    // get image by calling the server
    getImage(image) {
      const url = `http://localhost:3000/uploads/${image}`;
      return url;
    },
    // format the date
    formatDate(date) {
      return getDate(date);
    }
  }
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}
.navigation {
  padding-top: 30px;
  padding-bottom: 30px;
}
.header {
  /* background-color: bisque; */
  display: flex;
  flex-flow: row wrap;
  height: 70px;
  margin-bottom: 25px;
}
.line {
  background-color: #001f3f;
  width: 1%;
}
.txt {
  width: 99%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding-left: 10px;
}
.title,
.date,
.image,
.article {
  opacity: 0;
}
.title {
  color: #a75377;
  font-size: 25px;
  animation: textIn 0.4s forwards;
}
.date {
  color: #657c92;
  font-size: 17px;
  animation: textIn 0.4s 0.4s forwards;
}
.image {
  /* responsive */
  max-width: 500px;
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  animation: imgIn 0.4s 0.8s forwards;
}
.article {
  color: #001f3f;
  animation: textIn 0.4s 1.2s forwards;
  /* space between lines */
  line-height: 1.8;
}
@keyframes textIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes imgIn {
  from {
    transform: translateX(10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@media screen and (max-width: 850px) {
  .container {
    width: 700px;
  }
}
@media screen and (max-width: 750px) {
  .container {
    width: 600px;
  }
}
@media screen and (max-width: 650px) {
  .container {
    width: 500px;
  }
}
@media screen and (max-width: 550px) {
  .container {
    width: 100%;
    /* space on right & left sides */
    padding: 0 25px;
  }
}
</style>
