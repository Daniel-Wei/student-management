import { useCallback, useEffect, useReducer } from "react";
import Student from "../Student/Student";
import StudentsTableModule from './StudentsTable.module.css';
import StudentActionTypeEnum from "./StudentsTableActionEnum";
import LoadingOverlay from "../../UI/LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

// group all states together
const initialState = {
    loading: true,
    error: null,
    studentData: []
};

// reducer: set up all states accordingly
const reducer = (state, action) => {
    switch(action.type){
        case StudentActionTypeEnum.LOADED:
            return { 
                studentData: action.payload.filter(s => !s.deleted), 
                loading: false, 
                error: null 
            };
        case StudentActionTypeEnum.DELETE:
            return {
                studentData: state.studentData.map(s =>
                    s.documentId === action.payload ? { ...s, deleted: true } : s
                ),
                loading: false,
                error: null,
            };
        case StudentActionTypeEnum.LOADING:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case StudentActionTypeEnum.ERROR:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        default:
            return state;
    }
}

const StudentsTable = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, error, studentData } = state;

    const fetchData = useCallback(async () => {
        dispatch({ type: StudentActionTypeEnum.LOADING });
        try{
            const response = await fetch("http://localhost:1337/api/students");
            if(response.ok){
                const json = await response.json();
                dispatch({ type: StudentActionTypeEnum.LOADED, payload: json.data });
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, []);

    const deleteStudentByID = useCallback(async (documentId) => {
        try{
            dispatch({ type: StudentActionTypeEnum.LOADING });
            const response = await fetch(`http://localhost:1337/api/students/${documentId}`, 
                {
                    method: StudentActionTypeEnum.UPDATE,
                    body: JSON.stringify({ data: { deleted: true } }),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(!response.ok){
                throw new Error("Oops...delete failed.");
            }

            dispatch({ type: StudentActionTypeEnum.DELETE, payload: documentId });

        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, []);

    const handleDelete = (documentId) => {
        deleteStudentByID(documentId);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <>
        { loading && <LoadingOverlay /> }
        { error && <p>{error.message}</p> }
        {!loading && !error && 
            <div className={StudentsTableModule.container}>
                <div>
                    <button onClick={fetchData}>
                        <FontAwesomeIcon icon={faArrowsRotate} /> Refresh
                    </button>
                </div>

                <table className={StudentsTableModule.table}>
                    <caption className={StudentsTableModule.caption}>Student List</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email Address</th>
                            <th>Department</th>
                            <th>GPA</th>
                            <th>Graduation Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map(stu => 
                            <Student 
                                key={stu.id} 
                                attributes={stu} 
                                handleDelete={handleDelete} 
                            />
                        )}
                    </tbody>
                </table>
            </div>
        }
    </>
}

export default StudentsTable;
