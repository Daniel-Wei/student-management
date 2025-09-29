import { useCallback } from "react";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";

export default function useAddBackStudentByID(uiDispatch, dataDispatch) {
    const addBackStudentByID = useCallback(async (documentId) => {
        try{
            uiDispatch({ type: StudentUIActionEnum.ADD_BACK_CANCEL });
            dataDispatch({ type: StudentDataActionEnum.LOADING });
            const response = await fetch(`http://localhost:1337/api/students/${documentId}`, 
                {
                    method: "PUT",
                    body: JSON.stringify({ data: { deleted: false } }),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(!response.ok){
                throw new Error("Oops...add back failed.");
            }

            dataDispatch({ type: StudentDataActionEnum.LOADED });
            dataDispatch({ type: StudentDataActionEnum.ADDED_BACK, payload: documentId });

        }catch(e){
            dataDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
        }
    }, []);

    return {
        addBackStudentByID
    }
}