import * as d3 from "d3";

const componentWidth = 500;
const componentBarPadding = 1;

const indicatorColor = {
  default: "rgb(192, 192, 192)",
  selected: "rgb(106, 106, 255)",
  tagged: "rgb(255, 106, 106)",
};

const svgCheck = (name) => {
  const svg = d3.select(name);

  return { svg, empty: svg.empty() };
};

export { svgCheck, componentWidth, componentBarPadding, indicatorColor };
