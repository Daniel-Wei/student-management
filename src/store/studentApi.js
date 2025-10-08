import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const studentApi = createApi({
    reducerPath: "studentApi", // unique API identifier
    // the base query used by each endpoint if no queryFn is specified
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),

    // Endpoints are a set of operations perform agaignst the server
    // Define them as a object, using the builder syntax
    // 3 endpoint types: query, infiniteQuery & mutation
    // build: EndPointBuilder 
    endpoints(build){
        return {
            getAllStudents: build.query({
                // a function returns either a string or an object
                // which is passed to the base query 
                query(){
                    return "students";
                }
            }),
        }
    }
});

// hooks are automatically generated for all endpoints
export const { useGetAllStudentsQuery } = studentApi;

export default studentApi;