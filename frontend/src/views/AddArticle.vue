<template>
  <div>
    <h1>Add article</h1>
    <!-- warn user to fill required fields -->
    <p v-if="error">{{ error }}</p>
    <form
      method="POST"
      :action="`http://localhost:3000/${section}`"
      enctype="multipart/form-data"
    >
      <label for="title">Title</label><br />
      <input v-model="title" type="text" name="title" /><br />
      <label for="content">Content</label><br />
      <input v-model="content" type="text" name="content" /><br />
      <label for="uploadedImg">Add image</label><br />
      <input
        type="file"
        name="uploadedImg"
        accept="image/png, image/jpeg"
      /><br />
      <button type="submit" @click="checkRequired">Add</button>
      <button @click="goBack">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // which section to add to ?
      section: "",
      title: "",
      content: "",
      error: ""
    };
  },
  created() {
    // get section from route
    this.section = this.$route.params.section;
  },
  methods: {
    goBack() {
      // get back to section page
      this.$router.push(`/${this.section}`);
    },
    checkRequired(event) {
      // if either title or content is empty, warn user
      if (!this.title || !this.content) {
        // don't submit the form
        event.preventDefault();
        // warn user
        this.error = "Please, fill required title & content";
      }
    }
  }
};
</script>

<style scoped>
label,
input,
button {
  margin: 10px;
}
</style>
