import React from "react";
import NewsTypeSection from "./NewsTypeSection";
import NewsViewSection from "./NewsViewSection";

const Header = () => (
  <div className="an_menulist">
    <h3 className="an_tit">
      <a href="#" className="an_ta" target="_blank">
        뉴스스탠드
        <span className="an_ico_link"></span>
      </a>
    </h3>
    <NewsTypeSection />
    <NewsViewSection />
  </div>
);

export default Header;
