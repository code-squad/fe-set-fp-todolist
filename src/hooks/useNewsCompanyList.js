import React, { useMemo, useState } from "react";

export const DEFAULT_START_INDEX = 0;
export const DEFAULT_ROW_COUNT = 100;

const initialState = rowCount => ({
  companyList: [],
  startIndex: DEFAULT_START_INDEX,
  rowCount: rowCount ? rowCount : DEFAULT_ROW_COUNT,
  total: 0,
  companyIndex: 0
});

const useCompanyList = rowCount => {
  const [state, setState] = useState(initialState(rowCount));
  const COMPANY_LIST_URL = `http://localhost:4000/api/news/my/companies?startIndex=${state.startIndex}&rowCount=${state.rowCount}`;

  return useMemo(() => {
    const load = () => {
      fetch(COMPANY_LIST_URL)
        .then(res => res.json())
        .then(result => {
          setState({
            ...state,
            companyList: result.list,
            total: result.total
          });
        });
    };

    return {
      state,
      actions: {
        load,
        setStartIndex: startIndex => setState({ ...state, startIndex }),
        setCompanyIndex: index => setState({ ...state, companyIndex: index })
      }
    };
  }, [state]);
};

export default useCompanyList;
