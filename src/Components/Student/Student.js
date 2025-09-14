import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentModule from './Student.module.css';
import { useCallback } from "react";

const Student = ({ attributes, handleDelete }) => {
    const { documentId, name, age, gender, emailAddress, 
            department, gpa, graduationYear, deleted} = attributes;

    const onDeleteClicked = useCallback(() => {
        handleDelete(documentId);
    }, [documentId, handleDelete]);

    return <tr className= {deleted ? StudentModule.strikeThrough: ""}>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{emailAddress}</td>
        <td>{department}</td>
        <td>{gpa}</td>
        <td>{graduationYear}</td>
        <td>
            <FontAwesomeIcon icon={faTrash} onClick={onDeleteClicked}/>
        </td>
    </tr>
}

export default Student;