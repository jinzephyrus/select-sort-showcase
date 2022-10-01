import React from "react";

const Square = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      <span className={props.highlight ? "text-highlight" : ""}>
        {props.value}
      </span>
    </button>
  );
};

export default Square;
