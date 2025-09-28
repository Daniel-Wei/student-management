import { useCallback, useEffect, useReducer } from "react";
import Student from "../Student/Student";
import StudentsTableModule from './StudentsTable.module.css';
import StudentActionTypeEnum from "./StudentsTableActionEnum";
import LoadingOverlay from "../../UI/LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowsRotate, faRemove } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";
import StudentForm from "../StudentForm/StudentForm";
import StyleModule from "../../UI/Style.module.css";

// group all states together
const initialState = {
    showAddForm: null,
    deleteConfirmPrompt: false,
    addBackConfirmPrompt: false,
    loading: true,
    error: null,
    studentData: [],
    documentIdToDelete: null,
    documentIdToAddBack: null,
    showEditForm: false,
    studentToEdit: null,
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

        case StudentActionTypeEnum.SHOWEDITFORM: 
            return {
                ...state,
                showEditForm: true,
                studentToEdit: action.payload,
            }

        case StudentActionTypeEnum.HIDEEDITFORM: 
            return {
                ...state,
                showEditForm: false,
            }

        case StudentActionTypeEnum.DELETECONFIRMPROMPT:
            return {
                ...state,
                deleteConfirmPrompt: true,
                documentIdToDelete: action.payload
            }

        case StudentActionTypeEnum.DELETECANCELLED:
            return {
                ...state,
                deleteConfirmPrompt: false,
            }

        case StudentActionTypeEnum.ADDBACKCONFIRMPROMPT:
            return {
                ...state,
                addBackConfirmPrompt: true,
                documentIdToAddBack: action.payload
            }

        case StudentActionTypeEnum.ADDBACKCANCELLED:
            return {
                ...state,
                addBackConfirmPrompt: false,
            }
        
        case StudentActionTypeEnum.LOADED:
            return { 
                ...state,
                studentData: action.payload.filter(s => !s.deleted), 
                loading: false, 
                error: null 
            };
        
        case StudentActionTypeEnum.DELETED:
            return {
                studentData: state.studentData.map(s =>
                    s.documentId === action.payload ? { ...s, deleted: true } : s
                ),
                loading: false,
                error: null,
            };

        case StudentActionTypeEnum.ADDEDBACK:
            return {
                studentData: state.studentData.map(s =>
                    s.documentId === action.payload ? { ...s, deleted: false } : s
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
    const { deleteConfirmPrompt, documentIdToDelete, 
            addBackConfirmPrompt, documentIdToAddBack,
            loading, error, studentData, showAddForm, 
            showEditForm, studentToEdit } = state;

    const onAddClick = useCallback(async() => {
        dispatch( { type: StudentActionTypeEnum.SHOWADDFORM } );
    }, []);

    const onAddCancelClick = useCallback(async() => {
        dispatch( { type: StudentActionTypeEnum.HIDEADDFORM } );
    }, []);

    const onEditCancelClick = useCallback(async() => {
        dispatch( { type: StudentActionTypeEnum.HIDEEDITFORM } );
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

    const addNewStudent = useCallback(async ( newStudent ) => {
        dispatch({ type: StudentActionTypeEnum.LOADING });

        try{
            const response = await fetch('http://localhost:1337/api/students/', 
                {
                    method: StudentActionTypeEnum.POST,
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
                dispatch({ type: StudentActionTypeEnum.SHOWADDFORM });
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, [fetchData]);

     const updateStudent = useCallback(async ( updatedStudent ) => {
        dispatch({ type: StudentActionTypeEnum.LOADING });

        try{
            const response = await fetch(`http://localhost:1337/api/students/${updatedStudent.documentId}`, 
                {
                    method: StudentActionTypeEnum.UPDATE,
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
                dispatch({ type: StudentActionTypeEnum.HIDEEDITFORM });
            } else {
                throw new Error("Oops...data loading failed.");
            }
        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, [fetchData]);

    const deleteStudentByID = useCallback(async (documentId) => {
        try{
            dispatch({ type: StudentActionTypeEnum.DELETECANCELLED });
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

            dispatch({ type: StudentActionTypeEnum.DELETED, payload: documentId });

        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, []);

    const addBackStudentByID = useCallback(async (documentId) => {
        try{
            dispatch({ type: StudentActionTypeEnum.ADDBACKCANCELLED });
            dispatch({ type: StudentActionTypeEnum.LOADING });
            const response = await fetch(`http://localhost:1337/api/students/${documentId}`, 
                {
                    method: StudentActionTypeEnum.UPDATE,
                    body: JSON.stringify({ data: { deleted: false } }),
                    headers: { "Content-type": "application/json" }
                }
            );
            if(!response.ok){
                throw new Error("Oops...add back failed.");
            }

            dispatch({ type: StudentActionTypeEnum.ADDEDBACK, payload: documentId });

        }catch(e){
            dispatch({ type: StudentActionTypeEnum.ERROR, payload: e });
        }
    }, []);

    const deleteHandler = (documentId) => {
        dispatch({ type: StudentActionTypeEnum.DELETECONFIRMPROMPT, payload: documentId });
    }

    const addBackHandler = (documentId) => {
        dispatch({ type: StudentActionTypeEnum.ADDBACKCONFIRMPROMPT, payload: documentId });
    }

    const updateHanlder = (student) => {

        if(showAddForm){
            dispatch({type: StudentActionTypeEnum.HIDEADDFORM });
        }
        dispatch({ type: StudentActionTypeEnum.SHOWEDITFORM, payload: student});
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <>
        { deleteConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to delete this student?"}
                                onConfirmed={() => deleteStudentByID(documentIdToDelete)}
                                onCancelled={() => {dispatch({ type: StudentActionTypeEnum.DELETECANCELLED })}} 
                            />
        }

        { addBackConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to add back this student?"}
                                onConfirmed={() => addBackStudentByID(documentIdToAddBack)}
                                onCancelled={() => {dispatch({ type: StudentActionTypeEnum.ADDBACKCANCELLED })}} 
                            />
        }
        { loading && <LoadingOverlay /> }
        { error && <p>{error.message}</p> }
        {!loading && !error && 
            <div className={StudentsTableModule.container}>
                <div>
                    {showAddForm !== true && showEditForm !== true &&
                        <button className={`${StyleModule.normalHover} ${StyleModule.button}`} 
                                onClick={onAddClick}>
                            <FontAwesomeIcon icon={faAdd}/> Add
                        </button>
                    }

                    {showAddForm === true && 
                        <button className={`${StyleModule.warningHover} ${StyleModule.button}`} 
                                onClick={onAddCancelClick}>
                            <FontAwesomeIcon icon={faRemove}/> Cancel
                        </button>
                    }

                     {showEditForm === true && 
                        <button className={`${StyleModule.warningHover} ${StyleModule.button}`} 
                                onClick={onEditCancelClick}>
                            <FontAwesomeIcon icon={faRemove}/> Cancel
                        </button>
                    }

                    <button className={`${StyleModule.normalHover} ${StyleModule.button}`} 
                            onClick={fetchData}>
                        <FontAwesomeIcon icon={faArrowsRotate}/> Refresh
                    </button>
                </div>

                {showAddForm && 
                    <StudentForm onAdd={addNewStudent}/>
                }

                {showEditForm && 
                    <StudentForm studentToEdit={studentToEdit} onEdit={updateStudent}/>
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
                                deleteHandler={() => deleteHandler(stu.documentId)}
                                addBackHandler = {() => addBackHandler(stu.documentId)}
                                updateHandler = {() => updateHanlder(stu)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        }
    </>
}

export default StudentsTable;
