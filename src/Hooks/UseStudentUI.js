import { useReducer } from "react";
import { uiReducer, uiInitialState } from "../Reducers/StudentUiReducer";

export default function useStudentUI() {
    const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);
    return { uiState, uiDispatch };
}