import { observable, action } from 'mobx';
import { database, storage } from '../database/database';

export class PostStore {
  @observable
  posts: { id: string; text: string; fileUrl: string }[] = [];
  constructor() {
    const ref = database.ref();
    ref.child('posts').on('value', action((snapshot: firebase.database.DataSnapshot) => {
      if (snapshot) {
        const list = snapshot.val();
        const posts = [];
        if (list !== null) {
          for (const key of Object.keys(list)) {
            posts.push({
              id: key,
              text: list[key].text,
              fileUrl: list[key].fileUrl
            });
          }
        }
        this.posts = posts;
      }
    }));
  }
  @action
  addPost = (text: string, file: File) => {
    const filename = Date();
    const databaseRef = database.ref();
    const storageRef = storage.ref();
    const mountainsRef = storageRef.child(filename);
    if (file !== null) {
      mountainsRef.put(file).then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const fileUrl: string = snapshot.metadata.downloadURLs[0];
        databaseRef.child('posts').push().set({text, fileUrl});
      });
    }else {
      const fileUrl: string = '';
      databaseRef.child('posts').push().set({text, fileUrl});
    }
    
  }
  @action
  deletePost = (id: string) => {
    const ref = database.ref();
    ref.child('posts').child(id).remove();
  }
}

export default new PostStore();