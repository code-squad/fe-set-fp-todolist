import React from "react";

const NewsMailTumb = ({ thumbNews }) => (
  <div className="apln_news_thumb">
    <a href="#" className="apln_nt_link" target="_blank">
      <div className="apln_nt_thumbwrap">
        <img className="apln_nt_thumb" src={thumbNews.imageUrl} />
        <i className="thumb_bd"></i>
      </div>
      <div className="apln_nt_textwrap">
        <p className="apln_nt_text">{thumbNews.text}</p>
        <span className="apln_nt_bg"></span>
      </div>
    </a>
  </div>
);

export default NewsMailTumb;
