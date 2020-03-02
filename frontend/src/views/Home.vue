<template>
  <div class="home">
    <div class="container">
      <!-- nav bar -->
      <Navigation class="center"/>
      <div class="illustration">
        <img class="img icon" src="../img/img.svg" alt="img illustration" />
        <img
          class="pencil icon"
          src="../img/pencil.svg"
          alt="pencil illustration"
        />
        <img
          class="coffee icon"
          src="../img/coffee.svg"
          alt="coffee illustration"
        />
        <img
          class="calendar icon"
          src="../img/calendar.svg"
          alt="calendar illustration"
        />
        <img class="blog" src="../img/blog.svg" alt="blog illustration" />
      </div>
      <div class="text">
        <p class="title">Company Blog</p>
        <p class="subtitle">We share our News. Events. Tips.</p>
      </div>
    </div>
  </div>
</template>

<script>
// Navigation bar
import Navigation from "@/components/Navigation";
export default {
  name: "Home",
  components: {
    Navigation
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  background-color: #eee;
}
.container {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 200px 1fr;
  align-items: center;
}
.center {
  text-align: center;
}
.illustration {
  justify-self: center;
}
.blog {
  width: 180px;
  justify-self: center;
  animation: blogIn 1s ease-in-out forwards;
}
.icon {
  width: 50px;
  position: absolute;
  opacity: 0;
}
.calendar {
  width: 55px;
  margin-top: 130px;
  margin-left: 200px;
  animation: bounceIn 0.5s ease-in-out 1.2s forwards;
}
.coffee {
  width: 65px;
  margin-top: 30px;
  margin-left: 200px;
  animation: bounceIn 0.5s ease-in-out 2.2s forwards;
}
.img {
  margin-top: 30px;
  margin-left: -80px;
  animation: bounceIn 0.5s ease-in-out 1.7s forwards;
}
.pencil {
  margin-top: 130px;
  margin-left: -80px;
  animation: bounceIn 0.5s ease-in-out 2.7s forwards;
}
.text {
  justify-self: center;
  text-align: center;
}
.title {
  color: #001f3f;
  font-size: 35px;
}
.subtitle {
  color: #657c92;
}
@keyframes blogIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
/* 800 & below */
@media screen and (max-width: 800px) {
  .container {
    width: 100%;
  }
  .navigation {
    text-align: center;
  }
  .blog {
    width: 150px;
  }
  .icon {
    width: 40px;
  }
  .calendar {
    width: 45px;
    margin-left: 180px;
  }
  .coffee {
    width: 55px;
    margin-left: 180px;
  }
  .img,
  .pencil {
    margin-left: -75px;
  }
  .title {
    font-size: 30px;
  }
}
/* 500 & below */
@media screen and (max-width: 500px) {
  .blog {
    width: 130px;
  }
  .calendar {
    width: 43px;
    margin-top: 100px;
    margin-left: 165px;
  }
  .coffee {
    margin-left: 165px;
  }
  .pencil {
    margin-top: 100px;
  }
}
</style>
