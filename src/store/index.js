// 使用RTK来创建store
import { configureStore } from "@reduxjs/toolkit";
import { studentDataReducer } from "./slices/studentDataSlice";
import { studentUIReducer } from "./slices/studentUISlice";
import studentApi, { useGetAllStudentsQuery } from "./studentApi";

// 创建store对象：需要一个配置对象作为参数
const store = configureStore({
    // 多个reducer
    reducer: {
        studentData: studentDataReducer,
        studentUI: studentUIReducer,
        [studentApi.reducerPath] : studentApi.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(studentApi.middleware);
    },
});

export default store;