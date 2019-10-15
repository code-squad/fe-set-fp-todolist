import React from "react";
import { Link } from "react-router-dom";

const IconButton = ({ aTagAttr, iTagAttr, blindText }) => (
  <a {...aTagAttr}>
    <i {...iTagAttr}></i>
    <span className="blind">{blindText}</span>
  </a>
);

export default IconButton;
