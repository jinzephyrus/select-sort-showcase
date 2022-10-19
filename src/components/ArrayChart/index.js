import React from "react";

import "./index.css";

import * as d3 from "d3";
import * as shared from "./shared";
import IndexIndicator from "./IndexIndicator";

const dummy = () => null;

const chartProps = (data) => {
  const height = 200;
  const maxValue = d3.max(data);

  return {
    width: shared.componentWidth,
    height,
    barPadding: shared.componentBarPadding,
    maxValue,
    yScale: d3.scaleLinear().domain([0, maxValue]).range([0, height]),
  };
};

const applyRectAttr = (selection, props, arrayLen) => {
  selection
    .attr("x", (_, i) => i * (props.width / arrayLen))
    .attr("y", (d) => props.height - props.yScale(d))
    .attr("width", props.width / arrayLen - props.barPadding)
    .attr("height", (d) => props.yScale(d))
    .attr("fill", (d) => "rgb(136, 196, " + (d / props.maxValue) * 255 + ")");
};

const applyTextAttr = (selection, props, arrayLen) => {
  selection
    .text((d) => d)
    .attr("x", (_, i) => i * (props.width / arrayLen) + 20)
    .attr("y", (d) => props.height - props.yScale(d) + 15)
    .attr("font-family", "sans-serif")
    .attr("fill", "white");
};

// https://codepen.io/Jamiltz/pen/kQdEMN
export default class ArrayChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorRef: React.createRef(),
      selected: { i: -1, j: -1 },
      tagged: -1,
      data: this.props.array,
      svg: null,
    };
  }

  componentDidMount() {
    this.drawChart();
  }

  setData(array) {
    this.setState({
      data: array,
    });

    const props = chartProps(array);

    const rects = this.state.svg.selectAll("rect");
    rects.data(array).enter().append("rect");
    applyRectAttr(rects.transition(), props, array.length);

    const texts = this.state.svg.selectAll("text");
    texts.data(array).enter().append("text");
    applyTextAttr(texts.transition(), props, array.length);
  }

  // 渲染图表
  drawChart() {
    let { svg, empty } = shared.svgCheck(".main svg");

    const data = this.state.data;
    const props = chartProps(data);

    if (empty) {
      svg = d3
        .select(".main")
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);
    }

    this.setState({ svg }, () => {
      applyRectAttr(
        this.state.svg.selectAll("rect").data(data).enter().append("rect"),
        props,
        data.length
      );

      applyTextAttr(
        this.state.svg.selectAll("text").data(data).enter().append("text"),
        props,
        data.length
      );
    });
  }

  reset(newData) {
    this.state.svg.remove();

    this.setState(
      {
        selected: { i: -1, j: -1 },
        tagged: -1,
        svg: null,
        data: newData,
      },
      () => {
        this.state.indicatorRef.current.reset(newData.length);
        this.drawChart();
      }
    );
  }

  // 设置指示器位置
  // still need to be refactored
  setIndicator(i, j, callback = dummy) {
    if (i >= this.state.data.length || i < -1) {
      return;
    }

    if (j >= this.state.data.length || j < -1) {
      return;
    }

    const lastSelected = this.state.selected;

    if (lastSelected.i !== this.state.tagged && lastSelected.i !== j) {
      this.state.indicatorRef.current.colorize(
        lastSelected.i,
        shared.indicatorColor.default
      );
    }

    if (lastSelected.j !== this.state.tagged && lastSelected.j !== i) {
      this.state.indicatorRef.current.colorize(
        lastSelected.j,
        shared.indicatorColor.default
      );
    }

    this.setState(
      {
        selected: { i, j },
      },
      () => {
        if (i !== this.state.tagged) {
          this.state.indicatorRef.current.colorize(
            i,
            shared.indicatorColor.selected
          );
        }

        if (j !== this.state.tagged) {
          this.state.indicatorRef.current.colorize(
            j,
            shared.indicatorColor.selected
          );
        }

        callback();
      }
    );
  }

  // 标记选定索引
  tagIndicator(index, callback = dummy) {
    if (isNaN(index) || index >= this.state.data.length || index < -1) {
      return;
    }

    const lastTagged = this.state.tagged;

    if (
      lastTagged === index ||
      lastTagged === this.state.selected.i ||
      lastTagged === this.state.selected.j
    ) {
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

    const shouldUntag = index === this.state.tagged;

    this.setState(
      {
        tagged: shouldUntag ? -1 : index,
      },
      () => {
        this.state.indicatorRef.current.colorize(
          index,
          shouldUntag
            ? this.state.tagged === this.state.selected.i ||
              this.state.tagged === this.state.selected.j
              ? shared.indicatorColor.selected
              : shared.indicatorColor.default
            : shared.indicatorColor.tagged
        );

        callback();
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
      </>
    );
  }
}
