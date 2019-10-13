import React, { useMemo, useState, useReducer, useEffect } from "react";
import useCompanyList from "../hooks/useNewsCompanyList";
import { ImagePagingContext } from "../App";

const initialState = () => ({
  companyIndex: 0,
  companyObj: {
    logoImgUrl: "",
    company: "",
    thumbnews: {
      imageUrl: "",
      text: ""
    },
    newslist: []
  }
});

const useNewsContent = () => {
  const {
    state: companyListState,
    dispatch: companyListDispatch
  } = useCompanyList(100);
  const { companyList } = companyListState;

  const validateCompnayIndex = index => {
    return index >= 0 && index < companyList.length;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "next_company": {
        if (validateCompnayIndex(state.companyIndex + 1)) {
          return { ...state, companyIndex: state.companyIndex + 1 };
        } else {
          return state;
        }
      }
      case "prev_company": {
        if (validateCompnayIndex(state.companyIndex - 1)) {
          return { ...state, companyIndex: state.companyIndex - 1 };
        } else {
          return state;
        }
      }

      case "init": {
        companyListDispatch({ type: "init" });
        return { ...state, companyIndex: 0 };
      }
      case "find_companyObj": {
        return {
          ...state,
          companyIndex: companyList.indexOf(
            companyList.find(item => item.name === action.companyName)
          )
        };
      }
      case "update_companyObj": {
        return { ...state, companyObj: action.companyObj };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const load = companyName => {
    const COMPANY_LIST_URL = `http://localhost:4000/api/news/${companyName}`;
    fetch(COMPANY_LIST_URL)
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: "update_companyObj",
          companyObj: result
        });
      });
  };

  useEffect(() => {
    dispatch({
      type: "init"
    });
  }, []);

  useEffect(() => {
    companyList &&
      state.companyIndex >= 0 &&
      load(companyList[state.companyIndex].name);
  }, [state.companyIndex, companyList]);

  return useMemo(() => {
    return {
      state: { ...state, companyList },
      dispatch
    };
  }, [state]);
};

export default useNewsContent;
