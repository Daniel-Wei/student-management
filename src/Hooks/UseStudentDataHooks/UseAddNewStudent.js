// import { useCallback } from "react";

// export default function useAddNewStudent() {
//     const addNewStudent = useCallback(async ( newStudent ) => {
//         return await fetch('http://localhost:1337/api/students/', 
//             {
//                 method: "POST",
//                 body: JSON.stringify({ data: { 
//                     name: newStudent.name,
//                     gender: newStudent.gender,
//                     age: newStudent.age,
//                     emailAddress: newStudent.emailAddress,
//                     department: newStudent.department,
//                     gpa: newStudent.gpa,
//                     graduationYear: newStudent.graduationYear
//                 }}),
//                 headers: { "Content-type": "application/json" }
//             }
//         );
//     }, []);

//     return { addNewStudent }
// } 