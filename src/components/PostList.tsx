import * as React from 'react';
import { observer } from 'mobx-react';

interface PostListProps {
    posts: { id: string; text: string; fileUrl: string; }[];
    deletePost(id: string): void;
}

@observer
class PostList extends React.Component<PostListProps, {}> {
  render() {
    const list = this.props.posts.map(post => (
        <li key={post.id}>
            {post.text}
            {post.fileUrl !== '' ? <img src={post.fileUrl}/> : null}
            <button onClick={() => this.props.deletePost(post.id)}>삭제</button>
        </li>
    ));
    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default PostList;