import { useCallback } from "react";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";

export default function useUpdateStudent(uiDispatch, dataDispatch, fetchData){
    const updateStudent = useCallback(async ( updatedStudent ) => {
        dataDispatch({ type: StudentDataActionEnum.LOADING });

        try{
            const response = await fetch(`http://localhost:1337/api/students/${updatedStudent.documentId}`, 
                {
                    method: "UPDATE",
                    body: JSON.stringify({ data: { 
                        name: updatedStudent.name,
                        gender: updatedStudent.gender,
                        age: updatedStudent.age,
                        emailAddress: updatedStudent.emailAddress,
                        department: updatedStudent.department,
                        gpa: updatedStudent.gpa,
                        graduationYear: updatedStudent.graduationYear
                     }}),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(response.ok){
                fetchData();
                uiDispatch({ type: StudentUIActionEnum.HIDE_ADD_FORM });
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dataDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
        }
    }, [fetchData]);

    return {
        updateStudent
    }
}

