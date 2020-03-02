<template>
  <div class="section">
    <div class="container">
      <Navigation class="navigation" />
      <div v-if="successMsg" class="header-success">
        <!-- in case adding new article successfully -->
        <img
          class="success-icon"
          src="../img/success.svg"
          alt="success illustration"
        />
        <p class="txt-success">{{ successMsg }}</p>
      </div>
      <h2 class="title">{{ title }}</h2>

      <div class="articles">
        <!-- check if there is articles under this section -->
        <div v-if="checkArticles()">
          <div
            class="single-article"
            v-for="article in articles"
            :key="article.id"
          >
           
              <!-- go to article page -->
              <!-- send the section & article id -->
              <!-- backend endpoint: /:section/:id -->
              <router-link
                :to="`/${section}/${article.id}`"
                class="article-title"
                >{{ article.title }}</router-link
              >
    
            <p class="date">{{ formatDate(article.added_at) }}</p>
          </div>
        </div>
        <!-- no articles -->
        <div v-else class="no-articles">No articles in this section..</div>
        <!-- open add article form -->
        <router-link :to="`/${section}/add/article-form`" class="add-icon-link"
          ><img class="add-icon" src="../img/add.svg" alt="add illustration"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
// axios
import axios from "axios";
// function to format date
import getDate from "@/date";

export default {
  name: "Section",
  data() {
    return {
      // Title of the page
      title: "",
      // which section we are at
      section: "",
      // array of articles
      articles: [],
      // success msg
      successMsg: ""
    };
  },
  components: {
    Navigation
  },
  created() {
    // preliminary operations
    this.setSection();
    this.setTitle();
    this.getArticles();
    this.isAdded();
  },
  methods: {
    // set page title
    setTitle() {
      this.title = this.getSection();
    },
    // get section from route
    setSection() {
      this.section = this.$route.params.section;
    },
    // get page title
    getSection() {
      if (this.section === "news") {
        return "News";
      } else if (this.section === "events") {
        return "Events";
      } else if (this.section === "tips") {
        return "Tips & advices";
      }
    },
    // get articles from backend
    getArticles() {
      // backend endpoint /:section
      axios
        .get(`http://localhost:3000/${this.section}`)
        .then(response => {
          this.articles = response.data;
        })
        .catch(error => console.log(error.message));
    },
    // format date
    formatDate(date) {
      return getDate(date);
    },
    // Check if there are articles in this section
    checkArticles() {
      // yes, there are some
      if (this.articles.length > 0) {
        return true;
      }
      // No, sadly no articles
      else {
        return false;
      }
    },
    // check if an article was added
    isAdded() {
      // check url query string
      if (this.$route.query.added) {
        // change URL
        this.$router.replace(`/${this.section}`);
        // set message
        this.successMsg = "Article added";
        // reset message after 2 sec
        setTimeout(() => {
          this.successMsg = "";
        }, 2000);
      }
    }
  },
  // watch for changes in the route
  // i.e. navigate from section to another
  watch: {
    $route: function() {
      // do all preliminary operations
      this.setSection();
      this.setTitle();
      this.getArticles();
    }
  }
};
</script>

<style scoped>
.section {
  height: 100%;
}
.container {
  width: 800px;
  height: 100%;
  margin: 0 auto;
}
.navigation {
  padding-top: 30px;
  padding-bottom: 30px;
}
.header-success {
  color: #0b675a;
  background-color: #c7f3ed;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-radius: 5px;
}
.success-icon {
  width: 30px;
  margin-right: 10px;
}
.txt-success {
  display: inline-block;
}
.title {
  color: #fff;
  background-color: #001f3f;
  border-radius: 5px;
  margin-top: 7px;
  padding: 8px 10px;
}
.articles {
  margin-top: 30px;
  padding-left: 10px;
}
.single-article {
  padding-bottom: 15px;
}
.article-title {
  display: inline-block;
  margin-bottom: 3px;
  text-decoration: none;
  font-size: 18px;
  color: #001f3f;
}
/* animated bottom border */
.article-title::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: #001f3f;
  transition: width 0.3s;
}
.article-title:hover::after {
  width: 100%;
}
.date {
  color: #657c92;
  font-size: 13px;
}
.no-articles {
  color: #657c92;
  font-style: italic;
}
.add-icon-link {
  margin-left: 750px;
}
.add-icon {
  width: 33px;
  margin-top: 15px;
}
@media screen and (max-width: 840px) {
  .container {
    width: 700px;
  }
  .add-icon-link {
    margin-left: 650px;
  }
}
@media screen and (max-width: 740px) {
  .container {
    width: 600px;
  }
  .add-icon-link {
    margin-left: 550px;
  }
}
@media screen and (max-width: 640px) {
  .container {
    width: 500px;
  }
  .add-icon-link {
    margin-left: 450px;
  }
}
@media screen and (max-width: 540px) {
  .container {
    width: 400px;
  }
  .add-icon-link {
    margin-left: 350px;
  }
}
@media screen and (max-width: 480px) {
  .container {
    width: 90%;
  }
  .add-icon-link {
    position: fixed;
    right: 30px;
  }
}
</style>
