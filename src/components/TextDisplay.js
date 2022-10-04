import React, { Component } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const selectSortText = `const selectSort = (list) => {
  let temp, minIdx;
  const sorted = list.slice();

  for (let i = 0; i < sorted.length; i++) {
    minIdx = i;
    // visualize once

    for (let j = i + 1; j < sorted.length; j++) {
      // visualize once
      if (sorted[i] > sorted[j]) {
        minIdx = j;
        // visualize once
      }
    }

    if (minIdx !== i) {
      temp = sorted[i];
      sorted[i] = sorted[j];
      sorted[j] = temp;
      // visualize once
    }
    // visualize once
  }

  // show result here
  return sorted;
};
`;

const onChange = (newValue) => {
  console.log("change", newValue);
};

export default class TextDisplay extends Component {
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
        this.moveCursor(12);
      }
    );
  }

  moveCursor(line) {
    this.state.editor.moveCursorTo(line - 1, 0);
  }

  render() {
    return (
      <AceEditor
        mode='javascript'
        theme='github'
        fontSize={15}
        onChange={onChange}
        onLoad={(editor) => this.onLoad(editor)}
        // 不允许修改指针位置
        style={{ pointerEvents: "none" }}
        value={selectSortText}
        readOnly={true}
        name='UNIQUE_ID_OF_DIV'
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}
