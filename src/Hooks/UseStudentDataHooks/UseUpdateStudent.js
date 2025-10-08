// import { useCallback } from "react";

// export default function useUpdateStudent(){
//     const updateStudent = useCallback(async ( updatedStudent ) => {

//         return await fetch(`http://localhost:1337/api/students/${updatedStudent.documentId}`, 
//         {
//             method: "PUT",
//             body: JSON.stringify({ data: { 
//                 name: updatedStudent.name,
//                 gender: updatedStudent.gender,
//                 age: updatedStudent.age,
//                 emailAddress: updatedStudent.emailAddress,
//                 department: updatedStudent.department,
//                 gpa: updatedStudent.gpa,
//                 graduationYear: updatedStudent.graduationYear
//             }}),
//             headers: { "Content-type": "application/json" }
//         });
          
//     }, []);

//     return {
//         updateStudent
//     }
// }

