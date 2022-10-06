import React from "react";
import ReactDOM from "react-dom/client";

// 井字棋游戏, 用于测试页面布局
// import Game from "./TicTacToe/Game";

import "./index.css";

import SelectSortShowcase from "./components/SelectSortShowcase/SelectSortShowcase";

const data = [1, 4, 3, 2, 9, 7, 5, 6];

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* 字体 */}
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
    />
    {/* 图标 */}
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/icon?family=Material+Icons'
    />
    {/* 主页面 */}
    <React.StrictMode>
      <SelectSortShowcase data={data} />
    </React.StrictMode>
  </>
);
