<template>
  <v-app-bar app>
    <v-toolbar-title style="cursor: pointer" @click="toHome"
      >Instagram</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <div v-if="!user">
      <v-btn depressed to="signin" class="headline text-capitalize"
        >Login</v-btn
      >
      <v-btn
        color="#2CB696"
        class="white--text headline text-capitalize mr-5"
        to="signup"
        >Sign Up</v-btn
      >
    </div>
    <div v-else>
      <div v-if="$route.name === 'new'">
        <v-btn
          color="#2CB696"
          class="ml-2 white--text text-capitalize"
          style="font-size: 1.6rem"
          nuxt
          @click="share"
          >Share</v-btn
        >
      </div>
      <div v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-avatar>
                <img :src="user.profileImageUrl" alt="avatar" />
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title black--text">
                  {{ user.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item @click="signout">
              <v-list-item-content>
                <v-list-item-title class="title black--text">
                  Sign out
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          color="#2CB696"
          class="ml-2 white--text text-capitalize"
          to="/new"
          style="font-size: 1.6rem"
          nuxt
          >New Post</v-btn
        >
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { db, firebase } from "~/plugins/firebase";

export default {
  mounted() {
    this.$store.dispatch("checkAuth");
  },

  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(
          _ => {
            window.location.reload(true);
          },
          err => {
            // err
          }
        );
    },
    toHome() {
      this.$router.push({ path: `/` });
    },
    share() {
      this.$emit("share");
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then(
          _ => {
            window.location.reload(true);
          },
          err => {
            // show error
          }
        );
    }
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    }
  }
};
</script>
