import { useCallback } from "react";

export default function useDeleteStudentByID() {
    const deleteStudentByID = useCallback(async (documentId) => {
        return await fetch(`http://localhost:1337/api/students/${documentId}`, 
            {
                method: "PUT",
                body: JSON.stringify({ data: { deleted: true } }),
                headers: { "Content-type": "application/json" }
            }
        );
    }, []);

    return {
        deleteStudentByID
    }
}