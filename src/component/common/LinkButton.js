import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ aTagAttr, iTagAttr, blindText, viewType }) => (
  <Link to={`/${viewType}`} {...aTagAttr}>
    <i {...iTagAttr}></i>
    <span className="blind">{blindText}</span>
  </Link>
);

export default LinkButton;
