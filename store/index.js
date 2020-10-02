import { db, firebase } from "~/plugins/firebase";
import { ApiService } from "~/apis/api_service";

export const state = () => ({
  posts: [],
  isLoading: false,
  user: {}
});

export const actions = {
  async queryPosts({ state, commit }, user) {
    const postsCollection = await db
      .collection("posts")
      .orderBy("timestamp", "desc");

    var posts = [];
    const postsQuerySnapshot = await postsCollection.get();
    postsQuerySnapshot.forEach(doc => {
      var post = doc.data();
      if (user && post.likes && post.likes[user.uid]) {
        post.isLiked = true;
      } else {
        post.isLiked = false;
      }
      posts.push(post);
    });
    commit("setPosts", posts);
  },

  async createPost({ state, commit }, { uploadFile, caption, user }) {
    const timestamp = await firebase.firestore.FieldValue.serverTimestamp();
    const postId = db.collection("posts").doc().id;
    let imageUrl = await ApiService.uploadImageToStorage(uploadFile);
    const post = {
      id: postId,
      timestamp: timestamp,
      caption: caption,
      likesCount: 0,
      likes: null,
      imageUrl: imageUrl,
      user: {
        uid: user.uid,
        profileImageUrl: user.profileImageUrl,
        name: user.name
      }
    };
    let postsCollection = db.collection("posts").doc(postId);
    await postsCollection.set(post);
  },

  likeAdd({ state, commit }, { post, user }) {
    commit("loadingStart");
    let likesCount = post.likesCount + 1;
    db.collection("posts")
      .doc(post.id)
      .set(
        {
          likes: { [user.uid]: true }
        },
        { merge: true }
      );
    db.collection("posts")
      .doc(post.id)
      .update({
        likesCount: likesCount
      });
    commit("updatePosts", { data: post, likesCount: likesCount });
  },

  likeRemove({ state, commit }, { post, user }) {
    commit("loadingStart");
    let likesCount = post.likesCount - 1;
    db.collection("posts")
      .doc(post.id)
      .set(
        {
          likes: { [user.uid]: false }
        },
        { merge: true }
      );
    db.collection("posts")
      .doc(post.id)
      .update({
        likesCount: likesCount
      });
    commit("updatePosts", { data: post, likesCount: likesCount });
  },

  checkAuth({ state, commit }) {
    return new Promise(async (resolve, reject) => {
      await firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          let uid = user.uid;

          const docRef = await db
            .collection("users")
            .doc(uid)
            .get();
          user = docRef.data();
          commit("setAuth", user);
          resolve(user);
        } else {
          // No Auth yet
          commit("setAuth", null);
          resolve(null);
        }
      });
    });
  },

  async signup({ state, commit }, { name, email, password, uploadFile }) {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    let profileImageUrl = await ApiService.uploadImageToStorage(uploadFile);
    const user = {
      timestamp: timestamp,
      name: name,
      email: email,
      profileImageUrl: profileImageUrl,
      uid: response.user.uid
    };
    let usersCollection = db.collection("users").doc(user.uid);
    usersCollection.set(user);
    commit("setAuth", user);
  },

  async signin({ state, commit }, { email, password }) {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const users_Ref = db.collection("users").doc(response.user.uid);
    const docRef = await users_Ref.get();
    let user = docRef.data();
    commit("setAuth", user);
  }
};

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },

  loadingStart(state) {
    state.isLoading = true;
  },

  updatePosts(state, { data, likesCount }) {
    state.isLoading = false;
    state.posts = state.posts.map(post => {
      if (post.id !== data.id) {
        return post;
      }
      post.isLiked = !post.isLiked;
      post.likesCount = likesCount;
      return post;
    });
  },

  setAuth(state, user) {
    state.user = user;
  }
};

export const getters = {
  posts(state) {
    return state.posts;
  },

  isLoading(state) {
    return state.isLoading;
  },

  user(state) {
    return state.user;
  }
};
