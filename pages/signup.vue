<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign up form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <label>
                  <v-avatar
                    style="display: block; cursor: pointer"
                    size="120"
                    class="mx-auto"
                  >
                    <v-img v-if="uploadUrl" :src="uploadUrl"></v-img>
                    <v-icon v-else style="font-size: 80px">mdi-camera</v-icon>
                  </v-avatar>
                  <div>
                    <input
                      style="display: none"
                      type="file"
                      id="avatar_name"
                      accept="image/*"
                      @change="onImageChange"
                    />
                  </div>
                </label>

                <v-text-field
                  v-model="name"
                  label="Name"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="email"
                  prepend-icon="mdi-email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
              <p class="switch-text">
                Already have an account?&nbsp;
                <span class="switch-sign" @click="pushSignText">Sign in</span>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signup">Sign up</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { db, firebase } from "~/plugins/firebase";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      uploadFile: null,
      uploadUrl: "",
    };
  },

  methods: {
    pushSignText() {
      this.$router.push({ path: `/signin` });
    },
    async onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files;
      let file = images[0];
      this.uploadFile = file;
      this.uploadUrl = await this.getBase64(file);
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });
    },

    async signup() {
      try {
        if (!this.uploadFile || !this.name || !this.email || !this.password) {
          return;
        }
        await this.$store.dispatch("signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          uploadFile: this.uploadFile,
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
