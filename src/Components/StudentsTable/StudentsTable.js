import Student from "../Student/Student";
import StudentModule from './StudentsTable.module.css';

const StudentsTable = ( { data }) => {
    return <table className={StudentModule.table}>
        <caption className={StudentModule.caption}>Student List</caption>

        <thead>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email Address</th>
                <th>Department</th>
                <th>GPA</th>
                <th>Gradution Year</th>
            </tr>
        </thead>

        <tbody>
            
            {data.map(stu => <Student key={stu.id} attributes = {stu.attributes}/>)}
        </tbody>

    </table>
}

export default StudentsTable;