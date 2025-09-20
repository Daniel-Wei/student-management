import { useReducer } from "react";
import StudentFormModule from "./StudentForm.module.css";
import StudentFormEnum from "./StudentFormActionEnum.js";

const initialState = {
    name: "",
    gender: "",
    age: "",
    emailAddress: "",
    department: "",
    gpa: "",
    graduationYear: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case StudentFormEnum.EMPTY:
            return initialState; 

        case StudentFormEnum.UPDATE:
            let newState = {...state};
            newState[action.payload.field] = action.payload.value;
            return newState;

        default:
            return state;
    }
};

const StudentForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, gender, age, department, 
            emailAddress, gpa, graduationYear } = state;

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
        dispatch({ type: StudentFormEnum.EMPTY });
    };

    const submitBtnOnClick = (e) => {
        e.preventDefault();
        console.log("Form submitted:", state);
        // do something with the data here...
    };

    return (
        <form className={StudentFormModule.studentForm}>
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
                    <button onClick={revertBtnOnClick}>Revert</button>
                </div>

                <div className={StudentFormModule.formBtn}>
                    <button onClick={submitBtnOnClick}>Submit+</button>
                </div>
            </div>
        </form>
    );
};

export default StudentForm;
