import { useCallback, useEffect, useReducer } from "react";
import Student from "../Student/Student";
import StudentsTableModule from './StudentsTable.module.css';
import StudentActionTypeEnum from "./StudentsTableActionEnum";
import LoadingOverlay from "../../UI/LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowsRotate, faCancel, faRemove } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";
import StudentForm from "../StudentForm/StudentForm";
import StyleModule from "../../UI/Style.module.css";

// group all states together
const initialState = {
    showAddForm: null,
    confirmPrompt: false,
    loading: true,
    error: null,
    studentData: [],
    documentIdToDelete: null,
};

// reducer: set up all states accordingly
const reducer = (state, action) => {
    switch(action.type){
        case StudentActionTypeEnum.SHOWADDFORM: 
            return {
                ...state,
                showAddForm: true
            }

        case StudentActionTypeEnum.HIDEADDFORM: 
            return {
                ...state,
                showAddForm: false,
            }

        case StudentActionTypeEnum.CONFIRMPROMPT:
            return {
                ...state,
                confirmPrompt: true,
                documentIdToDelete: action.payload
            }

        case StudentActionTypeEnum.CANCELLED:
            return {
                ...state,
                confirmPrompt: false,
            }
        
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
    const { confirmPrompt, documentIdToDelete, 
            loading, error, studentData, showAddForm } = state;

    const onAddClick = useCallback(async() => {
        dispatch( { type: StudentActionTypeEnum.SHOWADDFORM } );
    }, []);

    const onCancelClick = useCallback(async() => {
        dispatch( { type: StudentActionTypeEnum.HIDEADDFORM } );
    }, []);


    const addNewStudent = useCallback(async () => {
        dispatch({ type: StudentActionTypeEnum.LOADING });

        try{
            const response = await fetch('http://localhost:1337/api/students/', 
                {
                    method: StudentActionTypeEnum.POST,
                    body: JSON.stringify({ data: { 
                        name: "Daniel Wei",
                        gender: "Male",
                        age: 30,
                        emailAddress: "DddWww@gmail.com",
                        department: "Computer Science",
                        gpa: 3.79,
                        graduationYear: 2021
                     } }),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(response.ok){
                fetchData();
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, []);

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
            dispatch({ type: StudentActionTypeEnum.CANCELLED });
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
        dispatch({ type: StudentActionTypeEnum.CONFIRMPROMPT, payload: documentId });
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <>
        { confirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to delete this record?"}
                                onConfirmDelete={() => deleteStudentByID(documentIdToDelete)}
                                onCancelDelete={() => {dispatch({ type: StudentActionTypeEnum.CANCELLED })}} 
                            />
        }
        { loading && <LoadingOverlay /> }
        { error && <p>{error.message}</p> }
        {!loading && !error && 
            <div className={StudentsTableModule.container}>
                <div>
                    {showAddForm !== true && 
                        <button onClick={onAddClick}>
                            <FontAwesomeIcon icon={faAdd}/> Add
                        </button>
                    }

                    {showAddForm === true && 
                        <button onClick={onCancelClick}>
                            <FontAwesomeIcon icon={faRemove}/> Cancel
                        </button>
                    }

                    <button onClick={fetchData}>
                        <FontAwesomeIcon icon={faArrowsRotate}/> Refresh
                    </button>
                </div>

                {showAddForm && 
                    <StudentForm/>
                }

                <table className={StudentsTableModule.table}>
                    <caption className={StudentsTableModule.caption}>Student List</caption>
                    <thead>
                        <tr>
                            <th className={StyleModule.alignLeft}>Name</th>
                            <th className={StyleModule.alignLeft}>Gender</th>
                            <th className={StyleModule.alignCenter}>Age</th>
                            <th className={StyleModule.alignLeft}>Email Address</th>
                            <th className={StyleModule.alignLeft}>Department</th>
                            <th className={StyleModule.alignCenter}>GPA</th>
                            <th className={StyleModule.alignCenter}>Graduation Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {studentData.map(stu => 
                            <Student 
                                key={stu.id} 
                                attributes={stu} 
                                handleDelete={() => handleDelete(stu.documentId)} 
                            />
                        )}
                    </tbody>
                </table>
            </div>
        }
    </>
}

export default StudentsTable;
