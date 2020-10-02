<template>
  <v-card max-width="600" class="mx-auto my-5">
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="post.user.profileImageUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          post.user.name
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ date }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img :src="post.imageUrl"></v-img>

    <v-card-text>{{ post.caption }}</v-card-text>

    <v-divider class="mx-3"></v-divider>
    <v-card-actions>
      <v-btn icon @click="toggleLike">
        <v-icon v-if="post.isLiked" color="red">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart</v-icon>
      </v-btn>
      <span>{{ post.likesCount }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["post"],
  data() {
    return {
      date: ""
    };
  },

  mounted() {
    this.date = this.getDate(this.post.timestamp);
  },
  methods: {
    getDate(timestamp) {
      const seconds = timestamp.seconds;
      let myDate = new Date(seconds * 1000);
      let date = moment(myDate, "x").format("MMM D");
      return date;
    },
    toggleLike() {
      if (this.isLoading || !this.user) {
        return;
      }

      let action = this.post.isLiked ? "likeRemove" : "likeAdd";
      this.$store.dispatch(`${action}`, {
        post: this.post,
        user: this.user
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters["isLoading"];
    },
    user() {
      return this.$store.getters["user"];
    }
  }
};
</script>
