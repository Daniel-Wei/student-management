import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentModule from './Student.module.css';

const Student = ({ attributes, handleDelete }) => {
    const { name, age, gender, emailAddress, 
            department, gpa, graduationYear, deleted} = attributes;

    return <tr className= {deleted ? StudentModule.strikeThrough: ""}>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{emailAddress}</td>
        <td>{department}</td>
        <td>{gpa}</td>
        <td>{graduationYear}</td>
        <td>
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete}/>
        </td>
    </tr>
}

export default Student;