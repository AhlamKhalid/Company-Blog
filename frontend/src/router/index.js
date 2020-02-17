import Vue from "vue";
import VueRouter from "vue-router";
// views
import Home from "@/views/Home";
import Section from "@/views/Section";
import Article from "@/views/Article";
import AddArticle from "@/views/AddArticle";

Vue.use(VueRouter);

const routes = [
  {
    // home page
    path: "/",
    name: "Home",
    component: Home
  },
  {
    // section page, e.g. news
    path: "/:section",
    name: "Section",
    component: Section
  },
  {
    // article info
    path: "/:section/:id",
    name: "Article",
    component: Article
  },
  {
    // add article form
    path: "/:section/add/article-form",
    name: "Add-article",
    component: AddArticle
  },
  {
    // other routes/ go back to home
    path: "*",
    name: "Other",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
