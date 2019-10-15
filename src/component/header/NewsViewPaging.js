import React, { useContext } from "react";

import IconButton from "../common/IconButton";
import { ImagePagingContext } from "../../App";
import { ListPagingContext } from "../../App";

const NewsViewPaging = ({ viewType }) => {
  const { dispatch: imagePagingDispatch } = useContext(ImagePagingContext);
  const { dispatch: listPagingDispatch } = useContext(ListPagingContext);
  return (
    <ul className="an_paging">
      <li className="ap_list">
        <IconButton
          aTagAttr={{
            className: "ap_btn _PM_newsstand_prev",
            href: "#",
            onClick: () => {
              viewType === "image"
                ? imagePagingDispatch({
                    type: "page_down"
                  })
                : listPagingDispatch({
                    type: "prev_company"
                  });
            }
          }}
          iTagAttr={{ className: "ap_btn_ico ico_left" }}
          blindText="이전 페이지"
        />
      </li>
      <li className="ap_list">
        <IconButton
          aTagAttr={{
            className: "ap_btn _PM_newsstand_next",
            href: "#",
            onClick: () => {
              viewType === "image"
                ? imagePagingDispatch({
                    type: "page_up"
                  })
                : listPagingDispatch({
                    type: "next_company"
                  });
            }
          }}
          iTagAttr={{ className: "ap_btn_ico ico_right" }}
          blindText="다음 페이지"
        />
      </li>
    </ul>
  );
};

export default NewsViewPaging;
