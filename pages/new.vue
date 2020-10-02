<template>
  <div>
    <nav-bar @share="share"></nav-bar>
    <v-main class="container">
      <client-only>
        <picture-input
          ref="pictureInput"
          width="500"
          height="500"
          margin="16"
          :crop="false"
          :hideChangeButton="true"
          accept="image/jpeg,image/png"
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Drag a image'
          }"
        >
        </picture-input>
      </client-only>
      <textarea
        class="caption-area"
        v-model="caption"
        placeholder="Write a caption"
      ></textarea>
    </v-main>
  </div>
</template>

<script>
import NavBar from "~/components/NavBar";

export default {
  components: { NavBar },
  data() {
    return {
      caption: ""
    };
  },
  methods: {
    async share() {
      try {
        let uploadFile = this.$refs.pictureInput.file;
        if (!this.user || !uploadFile) {
          return;
        }
        await this.$store.dispatch("createPost", {
          uploadFile: uploadFile,
          caption: this.caption,
          user: this.user
        });
        this.$router.push({ path: `/` });
      } catch (err) {
        console.log(err.message);
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters["user"];
    }
  }
};
</script>

<style>
.container {
  margin-top: 20px;
  max-width: 700px;
}
.caption-area {
  margin: 50px 0;
  width: 100%;
  height: 120px;
  border: 1px solid black;
  font-size: 18px;
}
</style>
