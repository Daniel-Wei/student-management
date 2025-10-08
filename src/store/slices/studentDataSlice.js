import { createSlice } from "@reduxjs/toolkit";

const studentDataSlice = createSlice({
    name: 'studentData',
    initialState: {
        studentData: [],
    },
    reducers: { 
        setLoaded(state, action){
            state.studentData = action.payload;
        },
    }
});

export const { setLoaded: setStudentDataLoaded } = studentDataSlice.actions;
export const {reducer: studentDataReducer } = studentDataSlice;