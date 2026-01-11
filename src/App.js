import React from 'react'
import './App.css';

class App extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        students: [
          {
            id: 1,
            name: 'Manoj',
            subject: "React",
            grade: 92,
            passed: true
          },
          {
            id: 2,
            name: 'Suraj',
            subject: "Python",
            grade: 74,
            passed: true
          },
          {
            id: 3,
            name: 'Sonia',
            subject: "Html",
            grade: 45,
            passed: false
          }
        ],
        newStudent:{
          name: '',
          subject: '',
          grade: ''
        }
      };
    }

    handleInputChange = (event) => {
      const {name, value} = event.target;
      
      this.setState({
        newStudent:{
          ...this.state.newStudent,
          [name]:value
        }
      });
    };

    handleDeleteStudent = (studentId) => {
      if(window.confirm("Are yor sure to delete")){
        this.setState({
          students: this.state.students.filter(student => student.id !== studentId)
        });
      }
    }

    handleAddSubmit = (event) => {
      event.preventDefault();


      const {name,subject,grade} = this.state.newStudent;
      if(!name.trim() || !subject || !grade){
        alert("fill all fields");
        return;
      }

      const gradeNumber = parseInt(grade,10);

      if(isNaN(gradeNumber) || gradeNumber <0 || gradeNumber > 100 ){
        alert("Fill grade between o - 100");
        return;
      }

      const newStudent = {
        id: Date.now(),
        name: name.trimEnd(),
        subject: subject,
        grade: gradeNumber,
        passed: gradeNumber>=60
      }

      this.setState({
        students: [...this.state.students, newStudent],
        newStudent: {
          name: '',
          subject: '',
          grade: ''
        }
      });
    };

    renderStudentList(){
      if(this.state.students.length === 0){
        return(
          <div className='no-students'>
            <p> No students added yet, Add you first student</p>
          </div>
        )
      }

      return this.state.students.map(student => (
        <div key={student.id} className={`student-card ${student.passed ? 'passed': 'failed'}`}>
          <div className='student-info'>
              <h3>{student.name}</h3>
              <p> <strong> Subject:</strong> {student.subject}</p>
              <p> <strong> Grade:</strong> {student.grade}%</p>
          </div>
          <div className='student-status'> 
              <span className={`status ${student.passed ? 'status-passed': 'status-failed'}`}>
                {student.passed ? 'PASSED' : 'FAILED'}
              </span>
          </div>

          <div className='student-actions'>
              <button onClick={() => this.handleDeleteStudent(student.id)}
                className='delete-btn'
                title="Delete Student"
                >
                Delete
              </button>
          </div>
        </div>  
      ))
    }


  render(){
    return(
      <div className='App'>
        <header className='app-header'>
          <h1> Student Grade Tracker</h1>
          <p> Class component design </p>
        </header>

        <main className='app-main'>
          <section className='students-section'>
            <h2> Student List ({this.state.students.length})</h2>
            <div className='students-grid'>
              {this.renderStudentList()}
            </div>
          </section>

        <section className='add-student-section'>
          <h2> Add New Student</h2>

          <form onSubmit={this.handleAddSubmit} className='add-student-form'>
            <div className='form-group'>
              <label htmlFor='studentName'> Student Name:</label>
              <input
                type="text"
                id="studentName"
                name="name"
                value={this.state.newStudent.name}
                onChange={this.handleInputChange}
                placeholder='Enter Full student name'
              />     

            </div>

            <div className='form-group'>
              <label htmlFor='studentSubject'> Student Subject:</label>
              <select
                id="studentSubject"
                name="subject"
                value={this.state.newStudent.subject}
                onChange={this.handleInputChange}
                placeholder='Enter Full student name'
              >
                <option value=""> Select a Subject</option>
                <option value="Css">CSS</option>     
                <option value="Java">Java</option>
                <option value="Ruby">Ruby</option>
                <option value="Node">Node</option>
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="SST">SST</option>
                </select>
            </div>

             <div className='form-group'>
              <label htmlFor='studentGrade'> Grade (0-100):</label>
              <input
                type="number"
                id="studentGrade"
                name="grade"
                value={this.state.newStudent.grade}
                onChange={this.handleInputChange}
                placeholder='Enter grade (0-100)'
                min="0"
                max="100"
              />     

            </div>

            <button type="submit" className='submit-btn'>
              Add Student
            </button>

          </form>

        </section>
        </main>
      </div>
    )
  }
}

export default App