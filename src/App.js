import { useState } from 'react';
import './App.css';
import GenderEnums from './Utils/GenderEnums';
import StudentList from './Components/StudentList/StudentList';

const data = [
  {
    id: 1,
    attributes:{
      name: "Andrew Roach",
      gender: GenderEnums.Male,
      age: 23,
      emailAddres: "vbecker@harvey.com",
      department: "Chemistry",
      gpa: 3.75,
      graduationYear: 2027,
    }
  }
]


function App() {
  const [studentData, setStudentData] = useState(data);

  return (
    <div>
      <StudentList data = {studentData} />
    </div>
  );
}

export default App;
