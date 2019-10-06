import React from "react";

const NewsTypeSection = () => (
  <div className="an_menulist_section1">
    <div className="an_sort" role="tablist">
      <a
        className="as_btn_press _PM_newsstand_total_type"
        href="#"
        aria-selected="true"
      >
        전체 언론사
      </a>
      <span className="as_bar" role="presentation"></span>
      <a
        className="as_btn_my _PM_newsstand_my_type is_selected"
        href="#"
        aria-selected="false"
      >
        MY 뉴스
      </a>
    </div>
  </div>
);

export default NewsTypeSection;
