import * as d3 from "d3";

export const componentWidth = 500;
export const componentBarPadding = 1;

export const indicatorColor = {
  default: "rgb(192, 192, 192)",
  selected: "rgb(106, 106, 255)",
  tagged: "rgb(255, 106, 106)",
};

export const svgCheck = (name) => {
  const svg = d3.select(name);

  return { svg, empty: svg.empty() };
};
