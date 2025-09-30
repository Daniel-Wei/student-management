import { useCallback } from "react";

export default function useFetch()  {

  const fetchData = useCallback(async () => {
      return await fetch("http://localhost:1337/api/students");
  }, []);

  return { fetchData };
}