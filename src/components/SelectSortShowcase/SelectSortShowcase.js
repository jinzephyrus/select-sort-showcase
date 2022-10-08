import React from "react";

import "./SelectSortShowcase.css";

import TextDisplay from "../TextDisplay/TextDisplay";
import ArrayChart from "../ArrayChart/ArrayChart";
import PlayerControl from "../PlayerControl/PlayerControl";

import { Divider, Grid } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/system";
import Header from "../Header/Header";

export default class SelectSortShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDisplay: React.createRef(),
      arrayChart: React.createRef(),
      playerControl: React.createRef(),
      defaultData: [1, 4, 3, 2, 9, 7, 5, 6],
    };
  }

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <SnackbarProvider maxSnack={5}>
          <Header
            apply={(nums) => this.state.playerControl.current.reset(nums)}
            array={this.state.defaultData}
          />
          <Grid container spacing={2} className='panel'>
            <Grid item xs>
              <TextDisplay ref={this.state.textDisplay} />
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid item xs>
              <ArrayChart
                ref={this.state.arrayChart}
                array={this.state.defaultData}
              />
              <PlayerControl
                array={this.state.defaultData}
                ref={this.state.playerControl}
                textDisplayRef={this.state.textDisplay}
                arrayChartRef={this.state.arrayChart}
              />
            </Grid>
          </Grid>
        </SnackbarProvider>
      </Box>
    );
  }
}
