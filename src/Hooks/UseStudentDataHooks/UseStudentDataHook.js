import { useCallback } from "react";
import useFetch from "./UseFetch";
import useAddNewStudent from "./UseAddNewStudent";
import useDeleteStudentByID from "./UseDeleteStudentByID";
import useAddBackStudentByID from "./UseAddBackStudentByID";
import useUpdateStudent from "./UseUpdateStudent";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";
import StudentDataHookEnum from "./StudentDataHookEnum";

export default function useStudentDataHook(dataDispatch, uiDispatch) {
    const { fetchData } = useFetch(dataDispatch);
    const { addNewStudent } = useAddNewStudent(dataDispatch, uiDispatch);
    const { deleteStudentByID } = useDeleteStudentByID(dataDispatch, uiDispatch);
    const { addBackStudentByID } = useAddBackStudentByID(uiDispatch, dataDispatch);
    const { updateStudent } = useUpdateStudent(uiDispatch, dataDispatch);
    
    const apiCall = useCallback(async (request) => {
        dataDispatch({ type: StudentDataActionEnum.LOADING });

        try{
            let response = null;
            switch(request.type){
                case StudentDataHookEnum.UPDATE:
                    response = await updateStudent(request.body);
                    break;
                case StudentDataHookEnum.DELETE:
                    response = await deleteStudentByID(request.body);
                    break;
                case StudentDataHookEnum.ADD_BACK:
                    response = await addBackStudentByID(request.body);
                    break;
                case StudentDataHookEnum.ADD_NEW:
                    response = await addNewStudent(request.body);
                    break;
                case StudentDataHookEnum.LOAD:
                    response = await fetchData();
                default:
                    break;
            }
            if(response.ok){
                dataDispatch({ type: StudentDataActionEnum.LOADED });
                const json = await response.json();

                switch(request.type){
                    case StudentDataHookEnum.UPDATE:
                        await apiCall({ type: StudentDataHookEnum.LOAD });
                        break;
                    case StudentDataHookEnum.DELETE:
                        dataDispatch({ type: StudentDataActionEnum.DELETED, payload: request.body});
                        uiDispatch( { type: StudentUIActionEnum.DELETE_CANCEL });
                        break;
                    case StudentDataHookEnum.ADD_BACK:
                        dataDispatch({ type: StudentDataActionEnum.ADDED_BACK, payload: request.body });
                        uiDispatch({ type: StudentDataActionEnum.ADDED_BACK});
                        break;
                    case StudentDataHookEnum.ADD_NEW:
                        await apiCall({ type: StudentDataHookEnum.LOAD });
                        uiDispatch({ type: StudentUIActionEnum.SHOW_ADD_FORM });
                        break;
                    case StudentDataHookEnum.LOAD:
                        dataDispatch({ type: StudentDataActionEnum.FETCHED, payload: json.data });
                        break;
                    default:
                        break;
                }
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dataDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
        }
    }, []);

    return {
        apiCall
    }
}