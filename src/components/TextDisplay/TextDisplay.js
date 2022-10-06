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
    // 遍歷下一個 i

    for (var j = i + 1; j < sorted.length; j++) {
      // 遍歷下一個 j 並進行比較
      if (sorted[i] > sorted[j]) {
        minIdx = j;
        // 標記最小值的索引
      }
    }

    if (minIdx !== i) {
      temp = sorted[i];
      sorted[i] = sorted[j];
      sorted[j] = temp;
      // 將 i 的值與最小值替換
    }
  }

  // 顯示結果
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
