import React, { useState } from "react";

import IconButton from "../common/IconButton";
import LinkButton from "../common/LinkButton";
import NewsViewPaging from "./NewsViewPaging";
import { viewType as initialViewType } from "../../initialData";

const NewsViewSection = () => {
  const [viewType, setViewType] = useState(initialViewType);

  return (
    <div className="an_menulist_section2" style={{ display: "block" }}>
      <div className="an_sort2" role="tablist">
        <LinkButton
          aTagAttr={{
            className: `as2_btn _PM_newsstand_thumb_type 
            ${viewType === "image" ? "is_selected" : ""}`,
            href: "#",
            onClick: () => setViewType("image")
          }}
          iTagAttr={{ className: "as2_btn_ico ico_image" }}
          blindText="이미지형"
          viewType="image"
        />

        <LinkButton
          aTagAttr={{
            className: `as2_btn _PM_newsstand_list_type 
            ${viewType === "list" ? "is_selected" : ""}`,
            href: "#",
            onClick: () => setViewType("list")
          }}
          iTagAttr={{ className: "as2_btn_ico ico_list" }}
          blindText="리스트형"
          viewType="list"
        />

        <IconButton
          aTagAttr={{
            className: "as2_btn",
            href: "#",
            target: "_blank"
          }}
          iTagAttr={{ className: "as2_btn_ico ico_setting" }}
          blindText="설정"
        />
      </div>
      <NewsViewPaging viewType={viewType} />
    </div>
  );
};

export default NewsViewSection;
