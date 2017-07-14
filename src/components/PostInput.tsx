import * as React from 'react';
import { observer } from 'mobx-react';

interface PostInputProps {
    addPost(text: string): void;
}

@observer
class PostInput extends React.Component<PostInputProps, {}> {
  private _input: HTMLInputElement;
  render() {
    return (
      <div>
        <input type="text" ref={ref => this._input = ref as HTMLInputElement} />
        <button onClick={() => this._addPost()}>저장</button>
      </div>
    );
  }
  _addPost = () => {
    const input = this._input;
    if (input.value !== '') {
        this.props.addPost(input.value);
        input.value = '';
    }
  }
}

export default PostInput;