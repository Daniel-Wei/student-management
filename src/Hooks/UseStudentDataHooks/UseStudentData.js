import { useReducer } from "react";
import { dataReducer, dataInitialState } from "../../Reducers/StudentDataReducer";

export default function useStudentData(){
    const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);
    return { dataState, dataDispatch };
}