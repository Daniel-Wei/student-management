import { useEffect, useReducer } from "react";
import StudentFormModule from "./StudentForm.module.css";
import StudentFormEnum from "./StudentFormActionEnum.js";
import StyleModule from "../../UI/Style.module.css";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal.js";

const initialState = {
    name: "",
    gender: "",
    age: "",
    emailAddress: "",
    department: "",
    gpa: "",
    graduationYear: "",
    showSubmitPrompt: false,
    showRevertPrompt: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case StudentFormEnum.EMPTY:
            return initialState; 

        case StudentFormEnum.EDIT:
            return {
                ...action.payload,
                showSubmitPrompt: false,
                showRevertPrompt: false,
            }; 

        case StudentFormEnum.UPDATE:
            let newState = {...state};
            newState[action.payload.field] = action.payload.value;
            return newState;

        case StudentFormEnum.SUBMITONCLICK:
            return {
                ...state,
                showSubmitConfirmPrompt: true,
            }
        
        case StudentFormEnum.SUBMITCANCELLED:
            return {
                ...state,
                showSubmitConfirmPrompt: false,
            }

        case StudentFormEnum.REVERTONCLICK:
            return {
                ...state,
                showRevertPrompt: true,
            }

        case StudentFormEnum.SUBMITCONFIRMED:
        case StudentFormEnum.REVERTCONFIRMED:
            return initialState;

        case StudentFormEnum.EDITREVERTCONFIRMED:
            return {
                ...action.payload,
                showRevertPrompt: false,
            };
        
        case StudentFormEnum.REVERTCANCELLED:
            return {
                ...state,
                showRevertPrompt: false,
            }

        default:
            return state;
    }
};

const StudentForm = ( { onAdd, studentToEdit, onEdit} ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(studentToEdit){
        dispatch({ type: StudentFormEnum.EDIT, payload: studentToEdit });
    }
  }, [studentToEdit]);
  
  const { name, gender, age, department, 
            emailAddress, gpa, graduationYear, 
            showSubmitConfirmPrompt, showRevertPrompt } = state;

    // Generic input change handler
    const handleChange = (e) => {
        const { name, value, type } = e.target;
            dispatch({
            type: StudentFormEnum.UPDATE,
            payload: {
                field: name,
                value: type === "number" ? +value : value,
            },
        });
    };

    const revertBtnOnClick = (e) => {
        e.preventDefault();
        dispatch({ type: StudentFormEnum.REVERTONCLICK });
    };

    const submitBtnOnClick = (e) => {
        e.preventDefault();
        dispatch( { type: StudentFormEnum.SUBMITONCLICK });
    };

    const onSubmitConfirmed = () => {
        dispatch({ type: StudentFormEnum.SUBMITCONFIRMED });
        if(!studentToEdit){
            onAdd(state);
        }else{
            onEdit(state);
        }
    }

    const onRevertConfirmed = () => {
        if(!studentToEdit){
            dispatch({ type: StudentFormEnum.REVERTCONFIRMED });
        }else{
            dispatch({type: StudentFormEnum.EDITREVERTCONFIRMED, payload: studentToEdit })
        }
    }

    return <>
        { showSubmitConfirmPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to submit?"}
                                onConfirmed={onSubmitConfirmed}
                                onCancelled={() => {dispatch({ type: StudentFormEnum.SUBMITCANCELLED })}} 
                            />
        }

        { showRevertPrompt &&  <ConfirmModal 
                            confirmText={"Are you sure to revert all changes?"}
                                onConfirmed={onRevertConfirmed}
                                onCancelled={() => {dispatch({ type: StudentFormEnum.REVERTCANCELLED })}} 
                            />
        }
        <form className={StudentFormModule.studentForm} onSubmit={(e) => {e.preventDefault()}}>
            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputName">Name</label>
                <input
                    id="inputName"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    type="text"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputGender">Gender</label>
                <input
                    id="inputGender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    type="text"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputAge">Age</label>
                <input
                    id="inputAge"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    type="number"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputEmailAddress">Email Address</label>
                <input
                    id="inputEmailAddress"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={handleChange}
                    type="text"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputDepartment">Department</label>
                <input
                    id="inputDepartment"
                    name="department"
                    value={department}
                    onChange={handleChange}
                    type="text"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputGpa">GPA</label>
                <input
                    id="inputGpa"
                    name="gpa"
                    value={gpa}
                    onChange={handleChange}
                    type="number"
                />
            </div>

            <div className={StudentFormModule.formItem}>
                <label htmlFor="inputGraduationYear">Graduation Year</label>
                <input
                    id="inputGraduationYear"
                    name="graduationYear"
                    value={graduationYear}
                    onChange={handleChange}
                    type="number"
                />
            </div>

            <div className={StudentFormModule.formBtnContainer}>
                <div className={StudentFormModule.formBtn}>
                    <button className={`${StyleModule.warningHover} ${StyleModule.button}`}
                            onClick={revertBtnOnClick}>
                        Revert
                    </button>
                </div>

                <div className={StudentFormModule.formBtn}>
                    <button className={`${StyleModule.normalHover} ${StyleModule.button}`} 
                            onClick={submitBtnOnClick}
                            type="button">

                        Submit
                    </button>
                </div>
            </div>
        </form>
    </>;
};

export default StudentForm;
