import React from "react";
import ReactDOM from "react-dom";

// 井字棋游戏, 用于测试页面布局
import Game from "./TicTacToe/Game";

import "./index.css";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
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
    <Grid className='panel' container>
      <Grid item xs>
        <Game />
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item xs>
        <Game />
      </Grid>
    </Grid>
  </div>
);
