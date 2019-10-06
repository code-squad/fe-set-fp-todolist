import React from "react";

import IconButton from "../common/IconButton";
import { ImagePagingConsumer } from "../../context/ImagePagingProvider";
import { ListPagingConsumer } from "../../context/ListPagingProvider";

const NewsViewPaging = ({ viewType }) => {
  return viewType === "image" ? (
    <ImagePagingConsumer>
      {({ startIndex, rowCount, setStartIndex }) => (
        <ul className="an_paging">
          <li className="ap_list">
            <IconButton
              aTagAttr={{
                className: "ap_btn _PM_newsstand_prev",
                href: "#",
                onClick: () => setStartIndex(startIndex - rowCount)
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
                onClick: () => setStartIndex(startIndex + rowCount)
              }}
              iTagAttr={{ className: "ap_btn_ico ico_right" }}
              blindText="다음 페이지"
            />
          </li>
        </ul>
      )}
    </ImagePagingConsumer>
  ) : (
    <ListPagingConsumer>
      {({ companyIndex, setAndValidateCompnayIndex }) => (
        <ul className="an_paging">
          <li className="ap_list">
            <IconButton
              aTagAttr={{
                className: "ap_btn _PM_newsstand_prev",
                href: "#",
                onClick: () => setAndValidateCompnayIndex(companyIndex - 1)
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
                onClick: () => setAndValidateCompnayIndex(companyIndex + 1)
              }}
              iTagAttr={{ className: "ap_btn_ico ico_right" }}
              blindText="다음 페이지"
            />
          </li>
        </ul>
      )}
    </ListPagingConsumer>
  );
};

export default NewsViewPaging;
