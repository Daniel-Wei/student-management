import { useCallback, useEffect } from "react";
import Student from "../Student/Student";
import StudentsTableModule from './StudentsTable.module.css';
import LoadingOverlay from "../../UI/LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowsRotate, faRemove } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";
import StudentForm from "../StudentForm/StudentForm";
import StyleModule from "../../UI/Style.module.css";
import useStudentUI from "../../Hooks/UseStudentUi";
import useStudentData from "../../Hooks/UseStudentDataHooks/UseStudentData";
import StudentUIActionEnum from "../../Reducers/StudentUiReducer";
import useStudentDataHook from "../../Hooks/UseStudentDataHooks/UseStudentDataHook";
import StudentDataHookEnum from "../../Hooks/UseStudentDataHooks/StudentDataHookEnum";

const StudentsTable = () => {
    const { uiState, uiDispatch } = useStudentUI();
    const { dataState, dataDispatch }  = useStudentData();
    const { apiCall } = useStudentDataHook(dataDispatch, uiDispatch);

    // why useCallBack
    // as apiCall will update uiState and dataState
    // then without useCallBack, fetchData will be re-defined
    // then in useEffect, fetchData will be calling forever
    const fetchData = 
        useCallback(() => apiCall({ type: StudentDataHookEnum.LOAD }), 
    [apiCall]);

    const addNewStudent = useCallback((newStudent) => apiCall({ type: StudentDataHookEnum.ADD_NEW, body: newStudent}), [apiCall]);
    const deleteStudentByID = useCallback((documentIdToDelete) => apiCall({ type: StudentDataHookEnum.DELETE, body: documentIdToDelete }), [apiCall]);
    const addBackStudentByID = useCallback((documentIdToAddBack) => apiCall({ type: StudentDataHookEnum.ADD_BACK, body: documentIdToAddBack }), [apiCall]);
    const updateStudent = useCallback((updatedStudent) => apiCall({ type: StudentDataHookEnum.UPDATE, body: updatedStudent}), [apiCall]);

    const { showAddForm, showEditForm, deleteConfirmPrompt, addBackConfirmPrompt,
            documentIdToDelete, documentIdToAddBack, studentToEdit } = uiState;

    const { loading, error, studentData } = dataState;

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onAddClick = useCallback(async() => {
        uiDispatch( { type: StudentUIActionEnum.SHOW_ADD_FORM } );
    }, []);

    const onAddCancelClick = useCallback(async() => {
        uiDispatch( { type: StudentUIActionEnum.HIDE_ADD_FORM } );
    }, []);

    const onEditCancelClick = useCallback(async() => {
        uiDispatch( { type: StudentUIActionEnum.HIDE_EDIT_FORM } );
    }, []);
    
    const deleteHandler = (documentId) => {
        uiDispatch({ type: StudentUIActionEnum.DELETE_CONFIRM, payload: documentId });
    }

    const addBackHandler = (documentId) => {
        uiDispatch({ type: StudentUIActionEnum.ADD_BACK_CONFIRM, payload: documentId });
    }

    const updateHanlder = (student) => {
        if(showAddForm){
            uiDispatch({type: StudentUIActionEnum.HIDE_ADD_FORM });
        }
        uiDispatch({ type: StudentUIActionEnum.SHOW_EDIT_FORM, payload: student});
    }

    return <>
        { deleteConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to delete this student?"}
                                onConfirmed={() => deleteStudentByID(documentIdToDelete)}
                                onCancelled={() => {uiDispatch({ type: StudentUIActionEnum.DELETE_CANCEL })}} 
                            />
        }

        { addBackConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to add back this student?"}
                                onConfirmed={() => addBackStudentByID(documentIdToAddBack)}
                                onCancelled={() => {uiDispatch({ type: StudentUIActionEnum.ADD_BACK_CANCEL })}} 
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
