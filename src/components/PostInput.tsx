import * as React from 'react';
import { observer } from 'mobx-react';
import { Image, Icon } from 'semantic-ui-react';
import Dropzone = require('react-dropzone');

interface PostInputProps {
    addPost(text: string, file: File): void;
}

interface PostInputState {
    text: HTMLInputElement | null;
    file: any;
}

const dropzoneStyle = {
    'width': '30em',
    'height': '250px',
    'borderWidth': '2px',
    'borderColor': 'rgb(102, 102, 102)',
    'borderStyle': 'dashed',
    'borderRadius': '5px',
    'display': 'table'
};

const insideDropzoneStyle = {
    'display': 'table-cell',
    'verticalAlign': 'middle',
    'textAlign': 'center'
};

@observer
class PostInput extends React.Component<PostInputProps, PostInputState> {
  constructor(props: PostInputProps) {
      super(props);
      this.state = {
        text: null,
        file: null
      };
  }

  render() {
    return (
      <div>
        <input type="text" onChange={e => this.setState({...this.state, text: e.target})} />
        <Dropzone onDrop={this._onDrop} maxSize={2097152} accept={`image/*`} style={dropzoneStyle}>
          <div style={insideDropzoneStyle}>
            {this.state.file !== null ? <Image src={this.state.file.preview}/> : <Icon name="image" size="big"/>}
          </div>
        </Dropzone>
        <button onClick={() => this._addPost()}>저장</button>
      </div>
    );
  }
  _addPost = () => {
    const text = this.state.text;
    const file = this.state.file;
    if (text !== null && text.value !== '') {
        this.props.addPost(text.value, file);
    }else if ((text !== null && text.value === '' || text == null) && file !== null) {
        this.props.addPost('', file);
    }
  }
  _onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (acceptedFiles[0] !== undefined) {
      this.setState({...this.state, file: acceptedFiles[0]});
    }else {
      console.warn('2MB 이하로만 가능합니다.');
    }
  }

}

export default PostInput;