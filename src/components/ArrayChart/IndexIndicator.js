import React from "react";

import * as d3 from "d3";
import * as shared from "./shared";

export default class IndexIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLen: this.props.dataLen,
    };
  }

  componentDidMount() {
    this.init();
  }

  reset(dataLen) {
    this.setState(
      {
        dataLen,
      },
      () => {
        const { svg, empty } = shared.svgCheck(".idx-indicator svg");

        if (!empty) {
          svg.remove();
        }

        this.init();
      }
    );
  }

  init() {
    let { svg, empty } = shared.svgCheck(".idx-indicator svg");

    const width = shared.componentWidth;
    const height = 10;
    const barPadding = shared.componentBarPadding;
    const dataLen = this.state.dataLen;

    if (empty) {
      svg = d3
        .select(".idx-indicator")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }

    svg
      .selectAll("rect")
      .data(d3.range(dataLen))
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * (width / dataLen))
      .attr("y", () => height - 12)
      .attr("width", width / dataLen - barPadding)
      .attr("height", () => height)
      .attr("fill", () => shared.indicatorColor.default);
  }

  colorize(index, color) {
    const { svg, empty } = shared.svgCheck(".idx-indicator svg");

    if (empty || isNaN(index) || index >= this.props.dataLen || index < -1) {
      return;
    }

    svg
      .selectAll("rect")
      .filter(":nth-child(" + (index + 1) + ")")
      .attr("fill", color);
  }

  render() {
    return <section className='idx-indicator' />;
  }
}
