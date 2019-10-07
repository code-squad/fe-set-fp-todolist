import React from "react";

const IconButton = ({ aTagAttr, iTagAttr, blindText }) => (
  <a {...aTagAttr}>
    <i {...iTagAttr}></i>
    <span className="blind">{blindText}</span>
  </a>
);

export default IconButton;
