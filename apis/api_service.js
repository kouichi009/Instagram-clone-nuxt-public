import { db, firebase } from "~/plugins/firebase";

export const ApiService = {
  async uploadImageToStorage(file) {
    let uuid = db.collection("users").doc().id;

    var storageRef = firebase
      .storage()
      .ref()
      .child("tmp/" + uuid + file.name);

    let uploadTask = await storageRef.put(file);
    let url = await uploadTask.ref.getDownloadURL();
    return url;
  }
};
