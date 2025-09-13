import { useState } from 'react';
import './App.css';
import GenderEnums from './Utils/GenderEnums';
import StudentsTable from './Components/StudentsTable/StudentsTable';

const data = [
  {
    id: 1,
    attributes: {
      name: "Andrew Roach",
      gender: GenderEnums.Male,
      age: 23,
      emailAddress: "vbecker@harvey.com",
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
      <StudentsTable data = {studentData} />
    </div>
  );
}

export default App;
