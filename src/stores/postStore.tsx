import { observable, action } from 'mobx';
import { database } from '../database/database';

export class PostStore {
  @observable
  posts: { id: string; text: string; }[] = [];
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
              text: list[key]
            });
          }
        }
        this.posts = posts;
      }
    }));
  }
  @action
  addPost = (text: string) => {
    const ref = database.ref();
    ref.child('posts').push().set(text);
  }
  @action
  deletePost = (id: string) => {
    const ref = database.ref();
    ref.child('posts').child(id).remove();
  }
}

export default new PostStore();