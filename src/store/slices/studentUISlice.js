import { createSlice } from "@reduxjs/toolkit";

const studentUISlice = createSlice({
    name: 'studentUI', // 用来自动生成action.type
    initialState: {
        showAddForm: false,
        showEditForm: false,
        showDeleteConfirmPrompt: false,
        showAddBackConfirmPrompt: false,
        documentIdToDelete: null,
        documentIdToAddBack: null,
        studentToEdit: null,
        isLoading: false,
    },
    reducers: { 
        setIsLoading(state, action){
            state.isLoading = action.payload;
        },

        setShowAddForm(state, _){
            state.showAddForm = true;
        }, 
        
        setHideAddForm(state, _){
            state.showAddForm = false;
        }, 

        setShowEditForm(state, action){
            state.showEditForm = true;
            state.studentToEdit = action.payload;
        }, 

        setHideEditForm(state, _){
            state.showEditForm = false;
            state.studentToEdit = null;
        }, 

        setShowDeleteConfirm(state, action){
            state.showDeleteConfirmPrompt = true;
            state.documentIdToDelete = action.payload;
        }, 

        setHideDeleteConfirm(state, _){
            state.showDeleteConfirmPrompt = false;
            state.documentIdToDelete = null;
        }, 

        setShowAddBackConfirm(state, action){
            state.showAddBackConfirmPrompt = true;
            state.documentIdToAddBack = action.payload;
        }, 

        setHideAddBackConfirm(state, _){
            state.showAddBackConfirmPrompt = false;
            state.documentIdToAddBack = null;
        }, 
    }
});

export const {setShowEditForm: setStudentUIShowEditForm, 
                setHideEditForm: setStudentUIHideEditForm,
                setShowAddForm: setStudentUIShowAddForm,
                setHideAddForm: setStudentUIHideAddForm,
                setShowDeleteConfirm: setStudentUIShowDeleteConfirm,
                setHideDeleteConfirm: setStudentUIHideDeleteConfirm,
                setShowAddBackConfirm: setStudentUIShowAddBackConfirm,
                setHideAddBackConfirm: setStudentUIHideAddBackConfirm,
                setIsLoading: setStudentUIIsLoading } = studentUISlice.actions;
export const {reducer: studentUIReducer } = studentUISlice;