import React from "react";
import { ListPagingConsumer } from "../../context/ListPagingProvider";

const Category = () => {
  const listRender = ({ name }, index, companySelected, setCompanyByName) => (
    <li key={index} className="aplc_item">
      <a
        className={`aplc_link ${
          companySelected && name === companySelected.name ? "is_selected" : ""
        }`}
        href="#"
        onClick={() => setCompanyByName(name)}
      >
        <span className="aplc_name">{name}</span>
      </a>
    </li>
  );
  return (
    <ListPagingConsumer>
      {({ companyList, company, setCompanyByName }) => (
        <div className="apl_category_wrap">
          <ul className="aplc_list" style={{ display: "block" }}>
            {companyList &&
              companyList.map((item, index) =>
                listRender(item, index, company, setCompanyByName)
              )}
          </ul>
        </div>
      )}
    </ListPagingConsumer>
  );
};

export default Category;
