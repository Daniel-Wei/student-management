import { useCallback } from "react";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";

export default function useAddBackStudentByID(uiDispatch) {
    const addBackStudentByID = useCallback(async (documentId) => {
        uiDispatch({ type: StudentUIActionEnum.ADD_BACK_CANCEL });
        return await fetch(`http://localhost:1337/api/students/${documentId}`, 
            {
                method: "PUT",
                body: JSON.stringify({ data: { deleted: false } }),
                headers: { "Content-type": "application/json" }
            }
        );

    }, []);

    return {
        addBackStudentByID
    }
}