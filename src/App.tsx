import * as React from 'react';
import { observer, inject } from 'mobx-react';
import PostInput from './components/PostInput';
import PostList from './components/PostList';
import { PostStore } from './stores/postStore';

interface AppProps {
  postStore?: PostStore;
}

@inject('postStore')
@observer
class App extends React.Component<AppProps, {}> {
  render() {
    const postStore = this.props.postStore as PostStore;
    return (
      <div className="App">
        <PostInput addPost={postStore.addPost} />
        <PostList posts={postStore.posts} deletePost={postStore.deletePost} />
      </div>
    );
  }
}

export default App;