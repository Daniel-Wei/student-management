import { useCallback } from "react";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";

export default function useAddNewStudent(dataDispatch, uiDispatch, fetchData) {
    const addNewStudent = useCallback(async ( newStudent ) => {
        dataDispatch({ type: StudentDataActionEnum.LOADING });

        try{
            const response = await fetch('http://localhost:1337/api/students/', 
                {
                    method: "POST",
                    body: JSON.stringify({ data: { 
                        name: newStudent.name,
                        gender: newStudent.gender,
                        age: newStudent.age,
                        emailAddress: newStudent.emailAddress,
                        department: newStudent.department,
                        gpa: newStudent.gpa,
                        graduationYear: newStudent.graduationYear
                     }}),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(response.ok){
                fetchData();
                uiDispatch({ type: StudentUIActionEnum.SHOW_ADD_FORM });
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            uiDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
        }
    }, [fetchData]);

    return { addNewStudent }
} 