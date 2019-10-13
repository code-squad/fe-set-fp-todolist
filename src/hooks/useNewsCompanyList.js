import React, { useMemo, useReducer, useEffect } from "react";

export const DEFAULT_START_INDEX = 0;
export const DEFAULT_ROW_COUNT = 18;

const initialState = rowCount => ({
  companyList: [],
  startIndex: DEFAULT_START_INDEX,
  rowCount: rowCount ? rowCount : DEFAULT_ROW_COUNT,
  total: 0
});

const useCompanyList = rowCount => {
  const isValidStartIndex = (state, startIndex) => {
    return startIndex >= 0 && startIndex <= state.total;
  };

  const reducer = (state, action) => {
    const COMPANY_LIST_URL = `http://localhost:4000/api/news/my/companies?startIndex=${state.startIndex}&rowCount=${state.rowCount}`;

    switch (action.type) {
      case "page_up":
        if (isValidStartIndex(state, state.startIndex + state.rowCount)) {
          return { ...state, startIndex: state.startIndex + state.rowCount };
        } else {
          return state;
        }
      case "page_down":
        if (isValidStartIndex(state, state.startIndex - state.rowCount)) {
          return { ...state, startIndex: state.startIndex - state.rowCount };
        } else {
          return state;
        }
      case "page_load": {
        fetch(COMPANY_LIST_URL)
          .then(res => res.json())
          .then(result => {
            dispatch({
              type: "update_page",
              companyList: result.list,
              total: result.total
            });
          });
      }
      case "update_page": {
        return {
          ...state,
          companyList: action.companyList,
          total: action.total
        };
      }

      case "init": {
        return { ...state, startIndex: 0 };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState(rowCount));

  useEffect(() => {
    dispatch({
      type: "page_load"
    });
  }, [state.startIndex]);

  useEffect(() => {
    dispatch({
      type: "page_load"
    });
  }, []);

  return useMemo(() => {
    return {
      state,
      dispatch
    };
  }, [state]);
};

export default useCompanyList;
