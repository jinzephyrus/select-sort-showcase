import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";
import { IconButton, Slider, Stack } from "@mui/material";
import React, { Component } from "react";
import { resolveSelectSort } from "../../core/resolveSelectSort";
import { breakpoint } from "../TextDisplay/shared";

/**
 * 空函数
 */
const dummy = () => null;

/**
 * 播放控制部件
 */
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

  /**
   * 解析算法步骤并初始化数组图表
   */
  initializeAlgorithmSteps() {
    const steps = resolveSelectSort(this.state.originalArray);

    this.setState({ steps }, () => {
      this.state.arrayChart.current.state.indicatorRef.current.init();
      this.state.arrayChart.current.setData(this.state.originalArray);
    });
  }

  /**
   * 重置所有部件并应用新数组
   *
   * @param newData 新数组
   */
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
    // 通过解析选择排序得到的 JSON 对象更新所有部件
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

  /**
   * 移到特定步动画演示
   *
   * @param step 步骤
   * @param callback 完成该方法后要调用的函数
   */
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

  /**
   * 移到下一步动画演示
   *
   * @param callback 完成该方法后要调用的函数
   */
  nextStep(callback = dummy) {
    this.toStep(this.state.currentStep + 1, callback);
  }

  /**
   * 移到上一步动画演示
   *
   * @param callback 完成该方法后要调用的函数
   */
  prevStep(callback = dummy) {
    this.toStep(this.state.currentStep - 1, callback);
  }

  /**
   * 开始连续播放动画演示
   */
  play() {
    this.playTimer = setInterval(() => {
      this.nextStep(() => {
        if (this.state.currentStep >= this.state.steps.length - 1) {
          this.onPlayButtonClick(true);
        }
      });
    }, 400);
  }

  /**
   * 暂停动画演示
   */
  pause() {
    clearInterval(this.playTimer);
  }

  /**
   * 按下播放按钮时的操作
   *
   * @param stopOnEnd 是否播完暂停
   */
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

  /**
   * 拨动进度条时所需的操作
   *
   * @param _ 不采用
   * @param newValue 步骤
   */
  onStepChanging(_, newValue) {
    if (!this.state.paused) {
      this.onPlayButtonClick();
    }

    this.toStep(newValue);
  }

  /**
   * 渲染部件
   */
  render() {
    return (
      <Stack
        spacing={1}
        direction='row'
        sx={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
