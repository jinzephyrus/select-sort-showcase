import React from "react";

import TextDisplay from "../TextDisplay/TextDisplay";
import ArrayChart from "../ArrayChart/ArrayChart";
import PlayerControl from "../PlayerControl/PlayerControl";

import { Card, Divider, Grid } from "@mui/material";
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
        <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
          <Header
            apply={(nums) => this.state.playerControl.current.reset(nums)}
            array={this.state.defaultData}
          />
          <Card>
            <Grid
              container
              spacing={2}
              sx={{
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Grid item xs>
                <TextDisplay ref={this.state.textDisplay} />
              </Grid>
              <Divider orientation='vertical' flexItem />
              <Grid item xs sx={{ mr: "16px" }}>
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
          </Card>
        </SnackbarProvider>
      </Box>
    );
  }
}
