import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";
import { IconButton, Slider, Stack } from "@mui/material";
import React, { Component } from "react";
import resolveSelectSort from "../../core/resolveSelectSort";
import breakpoint from "../TextDisplay/shared";

import "./PlayerControl.css";

const dummy = () => null;

export default class PlayerControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      currentStep: 0,
      originalArray: this.props.array,
      steps: [],
      textDisplay: this.props.textDisplayRef,
      arrayChart: this.props.arrayChartRef,
    };
  }

  initializeAlgorithmSteps() {
    const steps = resolveSelectSort(this.state.originalArray);

    this.setState({ steps }, () => {
      this.state.arrayChart.current.initIndicator();
      this.state.arrayChart.current.setData(this.state.originalArray);
    });
  }

  reset(newData) {
    this.setState(
      {
        paused: true,
        currentStep: 0,
        originalArray: this.props.array,
        steps: resolveSelectSort(newData),
      },
      () => {
        this.state.arrayChart.current.reset(newData);
        this.state.textDisplay.current.moveCursor(breakpoint.begin);
      }
    );
  }

  componentDidMount() {
    this.initializeAlgorithmSteps();
  }

  updateComponents() {
    // TODO
    const step = this.state.steps[this.state.currentStep];

    this.state.arrayChart.current.setIndicator(step.iIndex, step.jIndex, () => {
      if (
        this.state.arrayChart.current.state.tagged !== step.taggedIndex ||
        step.taggedIndex === -1
      ) {
        this.state.arrayChart.current.tagIndicator(step.taggedIndex);
      }
    });

    this.state.textDisplay.current.moveCursor(step.breakpoint);

    if (step.array) {
      this.state.arrayChart.current.setData(step.array);
    } else {
      for (let i = this.state.currentStep; i >= 0; i--) {
        if (this.state.steps[i].array) {
          this.state.arrayChart.current.setData(this.state.steps[i].array);

          break;
        }
      }
    }
  }

  toStep(step, callback = dummy) {
    if (step < 0 || step > this.state.steps.length - 1) {
      return;
    }

    this.setState(
      {
        currentStep: step,
      },
      () => {
        this.updateComponents();
        callback();
      }
    );
  }

  nextStep(callback = dummy) {
    this.toStep(this.state.currentStep + 1, callback);
  }

  prevStep(callback = dummy) {
    this.toStep(this.state.currentStep - 1, callback);
  }

  play() {
    this.playTimer = setInterval(() => {
      this.nextStep(() => {
        if (this.state.currentStep >= this.state.steps.length - 1) {
          this.onPlayButtonClick(true);
        }
      });
    }, 400);
  }

  pause() {
    clearInterval(this.playTimer);
  }

  onPlayButtonClick(stopOnEnd = false) {
    if (!stopOnEnd && this.state.currentStep >= this.state.steps.length - 1) {
      this.setState(
        {
          currentStep: 0,
        },
        () => {
          this.toStep(0);
          this.onPlayButtonClick();
        }
      );

      return;
    }

    const paused = !this.state.paused;

    this.setState({ paused }, () => {
      if (!paused) {
        this.play();
      } else {
        this.pause();
      }
    });
  }

  onStepChanging(_, newValue) {
    if (!this.state.paused) {
      this.onPlayButtonClick();
    }

    this.toStep(newValue);
  }

  render() {
    return (
      <Stack spacing={1} direction='row' className='stack'>
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.prevStep()}
        >
          <FastRewind />
        </IconButton>
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.onPlayButtonClick()}
        >
          {this.state.paused ? <PlayArrow /> : <Pause />}
        </IconButton>
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.nextStep()}
        >
          <FastForward />
        </IconButton>
        <Slider
          className='slider'
          value={this.state.currentStep}
          onChange={this.onStepChanging.bind(this)}
          max={this.state.steps.length - 1}
          valueLabelDisplay='auto'
        />
      </Stack>
    );
  }
}
