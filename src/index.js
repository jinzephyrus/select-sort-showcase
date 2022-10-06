import React from "react";
import ReactDOM from "react-dom/client";

// 井字棋游戏, 用于测试页面布局
// import Game from "./TicTacToe/Game";

import "./index.css";

import SelectSortShowcase from "./components/SelectSortShowcase/SelectSortShowcase";
import { Input } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";

const data = [1, 4, 3, 2, 9, 7, 5, 6];
const sssRef = React.createRef();

const ArrayInput = () => {
  const { enqueueSnackbar } = useSnackbar();

  const applyData = (str) => {
    const array = str.split(",");

    const nums =
      str.length === 0
        ? data
        : array.map((val) => {
            const num = Number(val);

            if (isNaN(num)) {
              throw console.error();
            }

            return num;
          });

    sssRef.current.state.playerControl.current.reset(nums);
  };

  const keyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    try {
      applyData(e.target.value);
    } catch {
      enqueueSnackbar("似乎传进去了一些奇怪的东西...", {
        variant: "error",
      });
    }
  };

  return (
    <div className='insert-array'>
      <h1 className='str'>输入数组</h1>
      <Input
        placeholder={data.toString()}
        onKeyDown={(e) => keyDown(e)}
        className='input'
      />
      <h1 className='title'>选择排序 | 算法演示</h1>
    </div>
  );
};

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
      <SnackbarProvider maxSnack={5}>
        <ArrayInput />
        <SelectSortShowcase data={data} ref={sssRef} />
      </SnackbarProvider>
    </React.StrictMode>
  </>
);
