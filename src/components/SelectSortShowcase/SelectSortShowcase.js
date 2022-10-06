import React from "react";

import "./SelectSortShowcase.css";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextDisplay from "../TextDisplay/TextDisplay";
import ArrayChart from "../ArrayChart/ArrayChart";
import PlayerControl from "../PlayerControl/PlayerControl";

export default class SelectSortShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDisplay: React.createRef(),
      arrayChart: React.createRef(),
      playerControl: React.createRef(),
    };
  }

  render() {
    return (
      <Grid className='panel' container spacing={2}>
        <Grid item xs>
          <TextDisplay ref={this.state.textDisplay} />
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs>
          <ArrayChart ref={this.state.arrayChart} array={this.props.data} />
          <PlayerControl
            array={this.props.data}
            ref={this.state.playerControl}
            textDisplayRef={this.state.textDisplay}
            arrayChartRef={this.state.arrayChart}
          />
        </Grid>
      </Grid>
    );
  }
}
