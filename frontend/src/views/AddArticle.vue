<template>
  <div class="add-article-page">
    <h1 class="header">Add article</h1>
    <!-- triangle dropping from header -->
    <div class="triangle-down"></div>
    <div class="container">
      <!-- form -->
      <!-- backend endpoint: /:section -->
      <form
        method="POST"
        :action="`http://localhost:3000/${section}`"
        enctype="multipart/form-data"
      >
        <div v-if="error" class="header-error">
          <!-- warn user to fill required fields -->
          <img
            class="error-icon"
            src="../img/error.svg"
            alt="error illustration"
          />
          <p class="txt-error">{{ error }}</p>
        </div>
        <!-- dynamically bind "required" class 
        if title is empty -->
        <input
          v-model="title"
          type="text"
          name="title"
          autocomplete="off"
          placeholder="Title *"
          class="title"
          :class="titleRequired"
        />
        <!-- dynamically bind "required" class 
        if content is empty -->
        <textarea
          v-model="content"
          rows="7"
          cols="15"
          name="content"
          placeholder="Content *"
          :class="contentRequired"
        ></textarea>
        <!-- custom label for file input -->
        <label for="uploadedImg" class="photo-label">
          <img src="../img/photo.svg" alt="photo illustration" class="photo" />
          Add a photo
        </label>
        <!-- holder for image name -->
        <p id="file-name" class="file-name" v-if="fileName">{{ fileName }}</p>
        <!-- actual file input: hidden -->
        <input
          id="uploadedImg"
          type="file"
          name="uploadedImg"
          accept="image/png, image/jpeg"
          @change="chooseImage"
        />
        <div class="buttons">
          <button type="submit" @click="checkRequired" class="add">Add</button>
          <button @click="goBack" class="cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // which section to add to
      section: "",
      // title
      title: "",
      // content
      content: "",
      // message for required fields
      error: "",
      // image name
      fileName: "",
      // dynamic class "required"
      titleRequired: "",
      contentRequired: ""
    };
  },
  created() {
    // get section from route
    this.section = this.$route.params.section;
  },
  methods: {
    // get back to section page
    goBack() {
      this.$router.push(`/${this.section}`);
    },
    checkRequired(event) {
      // if either title or content is empty, warn user
      if (!this.title || !this.content) {
        // don't submit the form
        event.preventDefault();
        // warn user
        this.error = "Please fill required fields";
      }
      // check title
      if (!this.title) {
        this.titleRequired = "required";
      } else {
        this.titleRequired = "";
      }
      // check content
      if (!this.content) {
        this.contentRequired = "required";
      } else {
        this.contentRequired = "";
      }
    },
    // set image name
    chooseImage() {
      // get file input
      const inputImage = document.getElementById("uploadedImg");
      // set image name
      this.fileName = inputImage.files[0].name;
    }
  }
};
</script>

<style scoped>
.add-article-page {
  height: 100%;
  background-color: #eee;
}
.header {
  background-color: #001f3f;
  height: 130px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.triangle-down {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 20px solid #001f3f;
  /* center triangle */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.container {
  width: 800px;
  margin: 0 auto;
  /* center form */
  display: flex;
  justify-content: center;
}
.header-error {
  color: #85203b;
  background-color: #d2adb7;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-radius: 5px;
  margin-top: 32px;
}
.error-icon {
  width: 30px;
  margin-right: 10px;
}
.txt-error {
  display: inline-block;
}
.title,
textarea {
  border: none;
  border-radius: 3px;
  padding: 13px 10px;
  color: #757575;
  width: 100%;
  font-size: 15px;
}
.title {
  margin-top: 32px;
}
textarea {
  margin-top: 25px;
  resize: none;
  font-family: "Open Sans", sans-serif;
}
.title:focus,
textarea:focus {
  border: 1px solid #757575;
  outline: none;
}
.required {
  border: 1px solid #85203b;
}
.photo-label {
  cursor: pointer;
  display: flex;
  color: #757575;
  font-size: 14px;
  margin-top: 25px;
}
/* hide file input */
#uploadedImg {
  display: none;
}
.photo {
  width: 25px;
  margin-right: 7px;
}
.file-name {
  font-size: 14px;
  color: #757575;
  margin-left: 32px;
}
/* distribute buttons nicely */
.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.add,
.cancel {
  width: 30%;
  padding: 10px;
  border-radius: 3px;
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  outline: none;
}
.add {
  background-color: #24ae9b;
}
.cancel {
  background-color: #85203b;
}
/* 800 & below */
@media screen and (max-width: 800px) {
  .container {
    width: 100%;
  }
}
/* 415 & below */
@media screen and (max-width: 415px) {
  form {
    /* keep space on left & right sides */
    padding: 0 15px;
  }
}
</style>
