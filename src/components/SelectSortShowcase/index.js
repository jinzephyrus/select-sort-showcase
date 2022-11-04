import React, { useLayoutEffect, useRef, useState } from "react";

import TextDisplay from "../TextDisplay";
import ArrayChart from "../ArrayChart";
import PlayerControl from "../PlayerControl";

import { Card, Divider, Grid } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/system";
import Header from "../Header";

/**
 * 网页窗体大小 Hook
 * Credit: https://usehooks.com/useWindowSize/
 */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const updateSize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

/**
 * @returns 应用主部件
 */
export const SelectSortShowcase = () => {
  const textDisplay = useRef();
  const arrayChart = useRef();
  const playerControl = useRef();
  const defaultData = [1, 4, 3, 2, 9, 7, 5, 6];
  const window = useWindowSize();
  const cardSize = 1080;

  // 应用数组
  const applyData = (nums) => {
    if (!playerControl.current.state.paused) {
      playerControl.current.onPlayButtonClick();
    }

    playerControl.current.reset(nums);
  };

  // 通过侦测窗体大小来适配各平台
  const isVerticalScreen = () => window.width <= cardSize;

  // 正常情况下提供竖分隔符，宽度不够或竖屏状态下提供横分隔符
  const getDivider = () => {
    if (!isVerticalScreen()) {
      return <Divider orientation='vertical' flexItem />;
    }

    return <Divider orientation='horizontal' flexItem />;
  };

  return (
    <Box sx={{ display: "flex", mt: !isVerticalScreen() ? "-16px" : "96px" }}>
      <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
        <Header apply={applyData} array={defaultData} />
        <Card sx={{ borderRadius: "16px" }}>
          <Grid
            container
            spacing={!isVerticalScreen() ? 2 : 0}
            direction={!isVerticalScreen() ? "row" : "column-reverse"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Grid item xs sx={{ width: "516px !important" }}>
              <TextDisplay ref={textDisplay} />
            </Grid>
            {getDivider()}
            <Grid
              item
              xs
              sx={{
                mr: !isVerticalScreen() ? "16px" : "0",
                mt: "16px",
              }}
            >
              <Box sx={{ p: 1 }}>
                <ArrayChart ref={arrayChart} array={defaultData} />
                <PlayerControl
                  array={defaultData}
                  ref={playerControl}
                  textDisplayRef={textDisplay}
                  arrayChartRef={arrayChart}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </SnackbarProvider>
    </Box>
  );
};
