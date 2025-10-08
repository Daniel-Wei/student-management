import { useCallback, useEffect } from "react";
import Student from "../Student/Student";
import StudentsTableModule from './StudentsTable.module.css';
import LoadingOverlay from "../../UI/LoadingOverlay/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowsRotate, faRemove } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";
import StudentForm from "../StudentForm/StudentForm";
import StyleModule from "../../UI/Style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStudentDataLoaded } from "../../store/slices/studentDataSlice";
import { setStudentUIIsLoading, setStudentUIShowAddForm, setStudentUIHideAddForm, setStudentUIShowEditForm, setStudentUIHideEditForm,
    setStudentUIShowDeleteConfirm, setStudentUIHideDeleteConfirm, setStudentUIShowAddBackConfirm, setStudentUIHideAddBackConfirm
 } from "../../store/slices/studentUISlice";
import { useGetAllStudentsQuery } from "../../store/studentApi";

const StudentsTable = () => {
    // const {studentData: stuData, studentUI: stuUI} = useSelector(state => state);
    const dispatch = useDispatch();

    const { showAddForm, showEditForm, showDeleteConfirmPrompt, showAddBackConfirmPrompt,
            documentIdToDelete, documentIdToAddBack, studentToEdit } = useSelector(state => state.studentUI);

    const { studentData } = useSelector(state => state.studentData);
    const { data: result, isLoading, isSuccess, isError, error } = useGetAllStudentsQuery();

    useEffect(() => {
        if(isSuccess){
            dispatch(setStudentDataLoaded(result.data));
        }
    }, [dispatch, setStudentDataLoaded, result]);

    const onAddClick = useCallback(async() => {
        dispatch(setStudentUIShowAddForm());
    }, []);

    const onAddCancelClick = useCallback(async() => {
        dispatch(setStudentUIHideAddForm());
    }, []);

    const onEditCancelClick = useCallback(async() => {
        dispatch(setStudentUIShowEditForm());
    }, []);
    
    const deleteHandler = (documentId) => {
        dispatch(setStudentUIShowDeleteConfirm(documentId));
    }

    const addBackHandler = (documentId) => {
        dispatch(setStudentUIShowAddBackConfirm(documentId));
    }

    const updateHanlder = (student) => {
        if(showAddForm){
            dispatch(setStudentUIHideAddForm());
        }
        dispatch(setStudentUIShowEditForm(student));
    }

    return <>
        { showDeleteConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to delete this student?"}
                                // onConfirmed={() => {dispatch(setStudentData)}}
                                onCancelled={() => {dispatch(setStudentUIHideDeleteConfirm())}} 
                            />
        }

        { showAddBackConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to add back this student?"}
                                // onConfirmed={() => addBackStudentByID(documentIdToAddBack)}
                                onCancelled={() => {dispatch(setStudentUIHideAddBackConfirm())}} 
                            />
        }
        { isLoading && <LoadingOverlay /> }
        { error && <p>{error.message}</p> }
        {!isLoading && !error && 
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
                            // onClick={fetchData}
                            >
                        <FontAwesomeIcon icon={faArrowsRotate}/> Refresh
                    </button>
                </div>

                {showAddForm && 
                    <StudentForm/>
                }

                {showEditForm && 
                    <StudentForm studentToEdit={studentToEdit}/>
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
