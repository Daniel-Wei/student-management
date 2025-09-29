import { useCallback } from "react";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";

export default function useDeleteStudentByID(dataDispatch, uiDispatch) {
    const deleteStudentByID = useCallback(async (documentId) => {
            try{
                uiDispatch({ type: StudentUIActionEnum.DELETE_CANCEL });
                dataDispatch({ type: StudentDataActionEnum.LOADING });
                const response = await fetch(`http://localhost:1337/api/students/${documentId}`, 
                    {
                        method: "PUT",
                        body: JSON.stringify({ data: { deleted: true } }),
                        headers: { "Content-type": "application/json" }
                    }
                );
                if(!response.ok){
                    throw new Error("Oops...delete failed.");
                }
    
                uiDispatch({ type: StudentUIActionEnum.DELETE_CANCEL, payload: documentId });
                dataDispatch({ type: StudentDataActionEnum.LOADED });
                dataDispatch({ type: StudentDataActionEnum.DELETED, payload: documentId});
    
            }catch(e){
                dataDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
            }
        }, []);

    return {
        deleteStudentByID
    }
}