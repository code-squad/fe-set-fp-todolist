import React, { useEffect, useContext, useState } from "react";

const ImageViewLi = ({ logo, name, onButtonClick }) => {
  const [isSeleted, setSelected] = useState(false);

  return (
    <li
      id="NS_009"
      className={`api_item ${isSeleted ? "is_selected" : ""}`}
      data-pid="009"
      onMouseOver={() => {
        setSelected(true);
      }}
      onMouseOut={() => {
        setSelected(false);
      }}
    >
      <a
        href="http://newsstand.naver.com/?list=&amp;pcode=009"
        className="api_link"
        aria-haspopup="true"
      >
        <img src={logo} height="24" alt="매일경제" className="api_logo" />
      </a>
      <div className="api_popup_btn_set" role="alertdialog">
        <div className="api_pbs_inner">
          <a
            href="#"
            className="api_pbs_btn _PM_newsstand_subscribe"
            style={{ display: "none" }}
          >
            구독
          </a>
          <a
            href="#"
            className="api_pbs_btn _PM_newsstand_unsubscribe"
            style={{ display: "inline-block" }}
            onClick={onButtonClick}
          >
            해지
          </a>
          <a className="api_pbs_btn api_pbs_lb">기사보기</a>
        </div>
      </div>
    </li>
  );
};

export default ImageViewLi;
