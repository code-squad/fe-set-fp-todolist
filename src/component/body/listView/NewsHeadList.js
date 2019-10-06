import React from "react";

const NewsHeadList = ({ newsList }) => {
  const listRender = (newsHead, index) => (
    <li key={index} className="apln_item">
      <a className="apln_link" href="#">
        {newsHead}
      </a>
    </li>
  );
  return (
    <ul className="apln_list">
      {newsList.map((item, index) => listRender(item, index))}
    </ul>
  );
};

export default NewsHeadList;
