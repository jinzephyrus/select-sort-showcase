import React, { Component } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "./TextDisplay.css";

const selectSortText = `const selectSort = (list) => {
  let temp, minIdx;
  const sorted = list.slice();

  for (var i = 0; i < sorted.length; i++) {
    minIdx = i;
    // 遍历下一个 i

    for (var j = i + 1; j < sorted.length; j++) {
      // 遍历下一个 j 并进行比较
      if (sorted[i] > sorted[j]) {
        minIdx = j;
        // 标记最小值
      }
    }

    if (minIdx !== i) {
      temp = sorted[i];
      sorted[i] = sorted[j];
      sorted[j] = temp;
      // 将 i 的值与最小值替换
    }
  }

  // 显示结果
  return sorted;
};
`;

const onChange = (newValue) => {
  console.log("change", newValue);
};

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      cursor: 0,
    };
  }

  onLoad(editor) {
    this.setState(
      {
        editor,
      },
      () => {
        this.moveCursor(7);
        this.state.editor.setAutoScrollEditorIntoView(true);
      }
    );
  }

  moveCursor(line) {
    this.state.editor.moveCursorTo(line - 1, 0);
  }

  render() {
    return (
      <AceEditor
        className='ace'
        mode='javascript'
        theme='github'
        height='550px'
        fontSize={15}
        onChange={onChange}
        onLoad={(editor) => this.onLoad(editor)}
        // 不允许修改指针位置
        value={selectSortText}
        readOnly={true}
        name='UNIQUE_ID_OF_DIV'
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export default TextDisplay;
