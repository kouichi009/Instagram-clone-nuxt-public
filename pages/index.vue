<template>
  <div>
    <nav-bar></nav-bar>
    <v-main>
      <div v-for="post in posts" :key="post.id">
        <post :post="post"></post>
      </div>
    </v-main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Post from "~/components/Post.vue";

export default {
  components: {
    Post,
    NavBar
  },

  methods: {
    queryPosts(user) {
      this.$store.dispatch("queryPosts", user);
    }
  },

  watch: {
    user: function(newVal, oldVal) {
      this.queryPosts(newVal);
    }
  },

  computed: {
    user() {
      return this.$store.getters["user"];
    },
    posts() {
      return this.$store.getters["posts"];
    }
  }
};
</script>
