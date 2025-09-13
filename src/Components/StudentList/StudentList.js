import Student from "../Student/Student";

const StudentList = ( { data }) => {
    return <table>
        <caption>Student List</caption>

        <thead>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>GPA</th>
            <th>Gradution Year</th>
        </thead>

        <tbody>
            {data.map(stu => <Student id={stu.id} attributes = {data.attributes}/>)}
        </tbody>

    </table>
}

export default StudentList;