// Enum for UI actions (optional but clearer)
const StudentUIActionEnum = {
  SHOW_ADD_FORM: "SHOW_ADD_FORM",
  HIDE_ADD_FORM: "HIDE_ADD_FORM",
  SHOW_EDIT_FORM: "SHOW_EDIT_FORM",
  HIDE_EDIT_FORM: "HIDE_EDIT_FORM",
  DELETE_CONFIRM: "DELETE_CONFIRM",
  DELETE_CANCEL: "DELETE_CANCEL",
  ADD_BACK_CONFIRM: "ADD_BACK_CONFIRM",
  ADD_BACK_CANCEL: "ADD_BACK_CANCEL",
};

export default StudentUIActionEnum;

// Initial UI state
export const uiInitialState = {
  showAddForm: false,
  showEditForm: false,
  deleteConfirmPrompt: false,
  addBackConfirmPrompt: false,
  documentIdToDelete: null,
  documentIdToAddBack: null,
  studentToEdit: null,
};

// Reducer for UI state
export function uiReducer(state, action) {
    switch (action.type) {
    
        case StudentUIActionEnum.SHOW_ADD_FORM:
            return { ...state, showAddForm: true };
      
        case StudentUIActionEnum.HIDE_ADD_FORM:
            return { ...state, showAddForm: false };
      
        case StudentUIActionEnum.SHOW_EDIT_FORM:
            return { ...state, showEditForm: true, studentToEdit: action.payload };
        
        case StudentUIActionEnum.HIDE_EDIT_FORM:
            return { ...state, showEditForm: false, studentToEdit: null };
        
        case StudentUIActionEnum.DELETE_CONFIRM:
            return { ...state, deleteConfirmPrompt: true, documentIdToDelete: action.payload };
        
        case StudentUIActionEnum.DELETE_CANCEL:
            return { ...state, deleteConfirmPrompt: false, documentIdToDelete: null };
        
        case StudentUIActionEnum.ADD_BACK_CONFIRM:
            return { ...state, addBackConfirmPrompt: true, documentIdToAddBack: action.payload };
        
        case StudentUIActionEnum.ADD_BACK_CANCEL:
            return { ...state, addBackConfirmPrompt: false, documentIdToAddBack: null };
        
        default:
            return state;
    }
}
