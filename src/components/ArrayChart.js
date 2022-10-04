import React from "react";

import "./ArrayChart/ArrayChart.css";

import * as d3 from "d3";
import * as shared from "./ArrayChart/shared";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, EditLocation } from "@mui/icons-material";
import IndexIndicator from "./ArrayChart/IndexIndicator";

export default class ArrayChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorRef: React.createRef(),
      selected: 0,
      tagged: -1,
      data: [1, 4, 3, 2, 9, 7, 5, 6],
    };
  }

  componentDidMount() {
    this.drawChart(this.state.data);
  }

  // 渲染图表
  drawChart(data) {
    let { svg, empty } = shared.svgCheck(".main svg");

    const width = shared.componentWidth;
    const height = 200;
    const barPadding = shared.componentBarPadding;
    const max = d3.max(data);
    const yScale = d3.scaleLinear().domain([0, max]).range([0, height]);

    if (empty) {
      svg = d3
        .select(".main")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * (width / data.length))
      .attr("y", (d) => height - yScale(d))
      .attr("width", width / data.length - barPadding)
      .attr("height", (d) => yScale(d))
      .attr("fill", (d) => "rgb(136, 196, " + d * 100 + ")");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (_, i) => i * (width / data.length) + 20)
      .attr("y", (d) => height - yScale(d) + 15)
      .attr("font-family", "sans-serif")
      .attr("fill", "white");

    this.state.indicatorRef.current.colorize(
      this.state.selected,
      shared.indicatorColor.selected
    );
  }

  // 设置指示器位置
  setIndicator(index) {
    if (isNaN(index) || index >= this.state.data.length || index < -1) {
      return;
    }

    const lastSelected = this.state.selected;

    if (lastSelected !== this.state.tagged) {
      this.state.indicatorRef.current.colorize(
        lastSelected,
        shared.indicatorColor.default
      );
    }

    this.setState(
      {
        selected: index,
      },
      () => {
        if (this.state.selected !== this.state.tagged) {
          this.state.indicatorRef.current.colorize(
            this.state.selected,
            shared.indicatorColor.selected
          );
        }
      }
    );
  }

  // 标记选定索引
  tagIndicator() {
    const lastTagged = this.state.tagged;

    if (lastTagged === this.state.selected) {
      this.state.indicatorRef.current.colorize(
        lastTagged,
        shared.indicatorColor.selected
      );
    } else {
      this.state.indicatorRef.current.colorize(
        lastTagged,
        shared.indicatorColor.default
      );
    }

    const shouldUntag = this.state.selected === this.state.tagged;

    this.setState(
      {
        tagged: shouldUntag ? -1 : this.state.selected,
      },
      () => {
        this.state.indicatorRef.current.colorize(
          this.state.selected,
          shouldUntag
            ? shared.indicatorColor.selected
            : shared.indicatorColor.tagged
        );
      }
    );
  }

  render() {
    return (
      <>
        <section className='main' />
        <IndexIndicator
          dataLen={this.state.data.length}
          ref={this.state.indicatorRef}
        />
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.setIndicator(this.state.selected - 1)}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.tagIndicator()}
        >
          <EditLocation />
        </IconButton>
        <IconButton
          color='primary'
          component='label'
          onClick={() => this.setIndicator(this.state.selected + 1)}
        >
          <ArrowForward />
        </IconButton>
      </>
    );
  }
}
