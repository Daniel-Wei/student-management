import { act } from "react";

const StudentDataActionEnum = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    LOADED: "LOADED",
    FETCHED: "FETCHED",
    DELETED: "DELETED",
    ADDED_BACK: "ADDED_BACK",
}

export default StudentDataActionEnum;

export const dataInitialState = {
  studentData: [],
  loading: false,
  error: null,
};

export function dataReducer(state, action) {
  switch (action.type) {
    case StudentDataActionEnum.LOADING: return { ...state, loading: true, error: null };
    case StudentDataActionEnum.ERROR: return { ...state, loading: false, error: action.payload };
    case StudentDataActionEnum.LOADED: return { ...state, loading: false, error: null };
    case StudentDataActionEnum.FETCHED: return { ...state, studentData: action.payload, loading: false, error: null };
    case StudentDataActionEnum.DELETED: return {
      ...state,
      loading:false,
      studentData: state.studentData.map(s => s.documentId === action.payload ? { ...s, deleted: true } : s),
    };
    case StudentDataActionEnum.ADDED_BACK: return {
      ...state,
      studentData: state.studentData.map(s => s.documentId === action.payload ? { ...s, deleted: false } : s),
    };
    default: return state;
  }
}


