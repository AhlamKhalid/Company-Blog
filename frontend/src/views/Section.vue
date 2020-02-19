<template>
  <div>
    <Navigation />
    <h1>{{ title }}</h1>
    <div v-for="article in articles" :key="article.id">
      <h3>
        <!-- go to article page -->
        <!-- send along the section, article id, the article itself -->
        <router-link :to="`/${section}/${article.id}`">{{
          article.title
        }}</router-link>
      </h3>
      <h5>{{ getDate(article.added_at) }}</h5>
    </div>
    <!-- open add article form -->
    <router-link :to="`/${section}/add/article-form`">add article</router-link>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
// axios
import axios from "axios";
export default {
  data() {
    return {
      // Title of the page
      title: "",
      // which section we are at
      section: "",
      // array of articles
      articles: []
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
    // Reformat date
    getDate(date) {
      // split by "-"
      const dateArray = date.split("-");
      // get year, month as number, day
      const [year, month_number, day] = dateArray;
      // format month
      const month_txt = this.getMonth(month_number);
      // format day
      const trunc_day = this.getDay(day);
      // get date as month day, year
      return `${month_txt} ${trunc_day}, ${year}`;
    },
    // format month by return the corresponding word
    getMonth(month_number) {
      let month_txt = "";
      switch (month_number) {
        case "01":
          month_txt = "Jan";
          break;
        case "02":
          month_txt = "Feb";
          break;
        case "03":
          month_txt = "Mar";
          break;
        case "04":
          month_txt = "Apr";
          break;
        case "05":
          month_txt = "May";
          break;
        case "06":
          month_txt = "Jun";
          break;
        case "07":
          month_txt = "Jul";
          break;
        case "08":
          month_txt = "Aug";
          break;
        case "09":
          month_txt = "Sept";
          break;
        case "10":
          month_txt = "Oct";
          break;
        case "11":
          month_txt = "Nov";
          break;
        case "12":
          month_txt = "Dec";
          break;
      }
      return month_txt;
    },
    // format day by deleting the leading zero
    getDay(day) {
      return day.charAt(0) === "0" ? day.substr(1) : day;
    },
    // get articles from backend
    getArticles() {
      
      axios
        .get(`http://localhost:3000/${this.section}`)
        .then(response => {
          this.articles = response.data;
        })
        .catch(error => console.log(error.message));
    }
  },
  // watch for any changes in the route
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

<style></style>
