import { useEffect, useState } from 'react';
import './App.css';
import StudentsTable from './Components/StudentsTable/StudentsTable';
import LoadingOverlay from './UI/LoadingOverlay/LoadingOverlay';

const data = [];

function App() {
  const [studentData, setStudentData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // only load all initially
  useEffect(() => {
    fetch("http://localhost:1337/api/students")
      .then((response) => {
        if(response.ok){
          return response.json();
        }

        throw new Error("Oops...data loading failed.")
      })
      .then((data) => {
         setStudentData(_ => data.data);
         setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e);
      });
  }, []);


  return (
    <div>
      {/* show overlay when loading */}
      { loading && <LoadingOverlay />}
      
      {/* show error message when loading failed */}
      { error && <p> {error.message} </p>}

      {/* show students table when loading successfully completed */}
      {!loading && !error && <StudentsTable data = {studentData} />}

    </div>
  );
}

export default App;
