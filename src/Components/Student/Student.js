const Student = ({ 
                    attributes : { name, age, gender, emailAddress, 
                                    department, gpa, graduationYear} 
                }) => {

    return <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{emailAddress}</td>
        <td>{department}</td>
        <td>{gpa}</td>
        <td>{graduationYear}</td>
    </tr>
}

export default Student;