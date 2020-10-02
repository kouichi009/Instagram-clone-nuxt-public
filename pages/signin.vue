<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign in form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="email"
                  prepend-icon="mdi-email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
              <p class="switch-text">
                No account?&nbsp;
                <span class="switch-sign" @click="pushSignText"
                  >Create account</span
                >
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin">Sign in</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return { email: "", password: "" };
  },

  methods: {
    pushSignText() {
      this.$router.push({ path: `/signup` });
    },
    async signin() {
      try {
        if (!this.email || !this.password) {
          return;
        }
        await this.$store.dispatch("signin", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ path: `/` });
      } catch (err) {
        console.log("errorMessage: ", err.message);
      }
    },
  },
};
</script>

<style>
.switch-text {
  margin-top: 10px;
  font-size: 20px;
}

.switch-sign {
  font-weight: bold;
  cursor: pointer;
  color: #2db696;
}
</style>
