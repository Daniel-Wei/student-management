import { useCallback, useEffect, useState } from 'react';
import AppModule from './App.module.css';
import StudentsTable from './Components/StudentsTable/StudentsTable';
import LoadingOverlay from './UI/LoadingOverlay/LoadingOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const data = [];

function App() {
  const [studentData, setStudentData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallBack(): only define once
  const fetchData = useCallback(async () => {
      try{
          setError(null);
          setLoading(true);
          const response = await fetch("http://localhost:1337/api/students");
          if(response.ok){
              const json = await response.json();
              setStudentData(json.data);
          }else{
              throw new Error("Oops...data loading failed.");
          }
      }catch(e){
          setError(e);
      }

      setLoading(false);
  }, []);

  // only load all initially
  useEffect(() => {
      fetchData();
  }, [fetchData]);

  const refreshStudentsTable = () => {
      fetchData();
  }


  return (
      <>
          {/* show overlay when loading */}
          { loading && <LoadingOverlay />}
          
          {/* show error message when loading failed */}
          { error && <p> {error.message} </p>}

          {/* show content when loading successfully completed */}
          {!loading && !error && 
              <div className={AppModule.screen}>
                  <div>
                      <button onClick={refreshStudentsTable}>
                        < FontAwesomeIcon icon={ faArrowsRotate }/>Refresh
                      </button>
                  </div>

                  <StudentsTable data = {studentData} />
              </div>
          }
      </>
  );
}

export default App;
