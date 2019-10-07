import React, { useMemo, useState } from "react";

const initialState = () => ({
  logoImgUrl: "",
  name: "",
  thumbnews: {
    imageUrl: "",
    text: ""
  },
  newslist: []
});

const useNewsContent = companyName => {
  const [companyObj, setCompanyObj] = useState(initialState);
  const COMPANY_LIST_URL = `http://localhost:4000/api/news/${companyName}`;

  return useMemo(() => {
    const load = () => {
      companyName &&
        companyName.length > 0 &&
        fetch(COMPANY_LIST_URL)
          .then(res => res.json())
          .then(result => {
            setCompanyObj(result);
          });
    };

    return {
      companyObj,
      actions: {
        load
      }
    };
  }, [companyObj, companyName]);
};

export default useNewsContent;
