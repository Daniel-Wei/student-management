import { useCallback } from "react";
import StudentDataActionEnum from "../../Reducers/StudentDataReducer";

export default function useFetch(dataDispatch)  {

  const fetchData = useCallback(async () => {
    dataDispatch({ type: StudentDataActionEnum.LOADING });
    try {
      const response = await fetch("http://localhost:1337/api/students");
      if (!response.ok) throw new Error("Oops...data loading failed.");
      const json = await response.json();
      dataDispatch({ type: StudentDataActionEnum.FETCHED, payload: json.data });
    } catch (e) {
      dataDispatch({ type: StudentDataActionEnum.ERROR, payload: e });
    }
  }, []);

  return { fetchData };
}