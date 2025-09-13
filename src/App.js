import { useEffect, useState } from 'react';
import './App.css';
import StudentsTable from './Components/StudentsTable/StudentsTable';
import LoadingOverlay from './UI/LoadingOverlay/LoadingOverlay';

const data = [];

function App() {
  const [studentData, setStudentData] = useState(data);
  const [loading, setLoading] = useState(true);

  // only load all initially
  useEffect(() => {
    fetch("http://localhost:1337/api/students")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
         setStudentData(_ => data.data);
         setLoading(false);
      })
      .catch(e => console.log(e));
  }, []);


  return (
    <div>
      {/* show overlay when loading */}
      { loading && <LoadingOverlay />}
      {!loading && <StudentsTable data = {studentData} />}
    </div>
  );
}

export default App;
