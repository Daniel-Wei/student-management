import { faClockRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentModule from './Student.module.css';
import StyleModule from "../../UI/Style.module.css";

const Student = ({ attributes, deleteHandler, addBackHandler }) => {
    const { name, age, gender, emailAddress, 
            department, gpa, graduationYear, deleted} = attributes;

    return <tr className= {deleted ? StudentModule.strikeThrough: ""}>
        <td className={StyleModule.alignLeft}>{name}</td>
        <td className={StyleModule.alignLeft}>{gender}</td>
        <td className={StyleModule.alignCenter}>{age}</td>
        <td className={StyleModule.alignLeft}>{emailAddress}</td>
        <td className={StyleModule.alignLeft}>{department}</td>
        <td className={StyleModule.alignCenter}>{gpa}</td>
        <td className={StyleModule.alignCenter}>{graduationYear}</td>
        <td className={StyleModule.alignCenter}>
            {!deleted && 
                <FontAwesomeIcon icon={faTrash} onClick={deleteHandler}/>
            }

             {deleted && 
                <FontAwesomeIcon icon={faClockRotateLeft} onClick={addBackHandler}/>
            }
            
        </td>
    </tr>
}

export default Student;