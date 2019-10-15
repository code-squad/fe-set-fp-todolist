import React, { useContext } from "react";
import { ListPagingContext } from "../../App";

const Category = () => {
  const { state, dispatch } = useContext(ListPagingContext);
  const { companyList, companyObj } = state;
  const listRender = ({ name }, index, companySelected, setCompanyByName) => {
    return (
      <li key={index} className="aplc_item">
        <a
          className={`aplc_link ${
            companySelected && name === companySelected.company
              ? "is_selected"
              : ""
          }`}
          href="#"
          onClick={() => setCompanyByName(name)}
        >
          <span className="aplc_name">{name}</span>
        </a>
      </li>
    );
  };
  return (
    <div className="apl_category_wrap">
      <ul className="aplc_list" style={{ display: "block" }}>
        {companyList &&
          companyList.map((item, index) =>
            listRender(item, index, companyObj, name =>
              dispatch({ type: "find_companyObj", companyName: name })
            )
          )}
      </ul>
    </div>
  );
};

export default Category;
