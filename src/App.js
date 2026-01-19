import React from 'react'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      newStudent: {
        name: '',
        grade: ''
      },
      filter: 'ALL',
      sortOrder: 'DESC',
      editingStudent: {
        id: null,
        name: '',
        grade: ''
      },
      showDeleteModal: false,
      studentToDelete: null,
      showAddStudentForm: false
    }
  };

  componentDidMount() {
    this.setState({
      students: [
        {
          id: 1,
          name: 'Manoj',
          grade: 92,
          passed: true
        },
        {
          id: 2,
          name: 'Suraj',
          grade: 74,
          passed: true
        },
        {
          id: 3,
          name: 'Sonia',
          grade: 45,
          passed: false
        }
      ]
    });
  }

  statuses = ['ALL', 'PASSED', 'FAILED'];

  componentDidUpdate(prevProps, prevState) {
    if (this.state.students.length > prevState.students.length) {
      console.log("New student added");
    }
  }

  componentWillUnmount() {
    console.log("Component is about to be removed");
  }

  handleFilterChange = (filter) => {
    this.setState({ filter: filter });
    this.setState({ showAddStudentForm: false });
  };


  handleSortChange = (order) => {
    this.setState({ sortOrder: order });
    this.setState({ showAddStudentForm: false });
  };


  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value
      }
    });
  };

  confirmDeleteStudent = () => {
    this.setState(prevState => ({
      students: prevState.students.filter(
        student => student.id !== prevState.studentToDelete
      ),
      showDeleteModal: false,
      studentToDelete: null
    }));
  };


  cancelDeleteStudent = () => {
    this.setState({
      showDeleteModal: false,
      studentToDelete: null
    });
  };


  handleEditStudent = (student) => {

    this.setState({
      editingStudent: student,
      newStudent: {
        name: student.name,
        grade: student.grade
      },
      showAddStudentForm: true
    },
      () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
  };

  handleMarkStudentPassed = (student) => {
    this.setState({
      students: this.state.students.map(s =>
        s.id === student.id ? { ...s, passed: true, grade: 60 } : s
      )
    });
  };


  handleAddSubmit = (event) => {
    event.preventDefault();

    const { name, grade } = this.state.newStudent;
    if (!name.trim() || !grade) {
      alert("fill all fields");
      return;
    }

    const gradeNumber = parseInt(grade, 10);

    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("Fill grade between o - 100");
      return;
    }

    if (this.state.editingStudent.id) {
      this.setState({
        students: this.state.students.map(student =>
          student.id === this.state.editingStudent.id
            ? { ...student, name: name, grade: gradeNumber, passed: gradeNumber >= 60 }
            : student
        ),
        editingStudent: {
          id: null,
          name: '',
          grade: ''
        },
        newStudent: {
          name: '',
          grade: ''
        }
      });

      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trimEnd(),
      grade: gradeNumber,
      passed: gradeNumber >= 60
    }

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: '',
        grade: ''
      }
    });

    this.setState({
      filter: 'ALL',
      sortOrder: 'DESC'
    });
  };

  renderStudentList() {

    const filteredStudents = this.state.students.filter(student => {
      const matchesFilter = this.state.filter === 'ALL' ||
        (this.state.filter === 'PASSED' && student.passed) ||
        (this.state.filter === 'FAILED' && !student.passed);
      return matchesFilter;
    });

    const sortedAndFileredStudents = filteredStudents.sort((a, b) => {
      switch (this.state.sortOrder) {
        case 'ASC':
          return a.grade - b.grade;
        case 'DESC':
          return b.grade - a.grade;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    if (this.state.students.length === 0) {
      return (
        <div className='no-students'>
          <p> No students added yet, Add you first student</p>
        </div>
      )
    }

    return sortedAndFileredStudents.map(student => (
      <div key={student.id} className={`student-card ${student.passed ? 'passed' : 'failed'}`}>
        <div className='student-info'>
          <h3>{student.name}</h3>
          <p> <strong> Grade:</strong> {student.grade}%</p>
        </div>
        <div className='student-status'>
          <span className={`status ${student.passed ? 'status-passed' : 'status-failed'}`}>
            {student.passed ? 'PASSED' : 'FAILED'}
          </span>
        </div>

        <div className='student-actions'>
          <button
            onClick={() =>
              this.setState({
                showDeleteModal: true,
                studentToDelete: student.id
              })
            }
            className='delete-btn'
            title="Delete Student"
          >
            Delete
          </button>



          <button
            onClick={() => this.handleEditStudent(student)}
            className='edit-btn'
          >
            Edit
          </button>

          {!student.passed &&
            <button
              onClick={() => this.handleMarkStudentPassed(student)}
              className='edit-btn'
            >
              Mark as Passed
            </button>
          }

        </div>
      </div>
    ))
  }


  render() {
    return (
      <div className='App'>
        <header className='app-header'>
          <h1> Student Grade Tracker Application</h1>
          <p> Using Class-Based Components & React Lifecycle Methods </p>
        </header>

        <main className='app-main'>
          <section className='students-section'>

            <div className='filter-sort-bar'>
              <div className='filter-sections'>
                <div className='filter-buttons'>
                  {this.statuses.map(status =>
                    <button key={status} className={`filter-button ${this.state.filter === status ? 'active' : ''}`} onClick={() => this.handleFilterChange(status)}>
                      {status}
                    </button>
                  )}
                </div>
              </div>
              <h2> Student List ({this.state.students.length})</h2>
              <div className='filter-sections'>
                <select className='sort-select'
                  value={this.state.sortOrder}
                  onChange={(e) => this.handleSortChange(e.target.value)}
                >
                  <option value="DESC">DESC</option>
                  <option value="ASC">ASC</option>
                </select>
              </div>
            </div>

            <div
              className="add-student-toggle"
              onClick={() =>
                this.setState(prev => ({
                  showAddStudentForm: !prev.showAddStudentForm,
                  editingStudent: { id: null, name: '', grade: '' },
                  newStudent: { name: '', grade: '' }
                }))
              }
            >
              <span>
                {this.state.showAddStudentForm ? "- Hide Add Student" : "+ Add Student"}
              </span>
            </div>

            {this.state.showAddStudentForm && (
              <section className='add-student-section'>
                {this.state.editingStudent.id ? (
                  <h2> Edit Student</h2>
                ) : (
                  <h2> Add New Student</h2>
                )}

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
                    {this.state.editingStudent.id ? 'Update Student' : 'Add Student'}
                  </button>

                </form>

              </section>
            )}


            <div className='students-grid'>
              {this.renderStudentList()}
            </div>
          </section>


        </main>

        {this.state.showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this student?</p>

              <div className="student-actions">
                <button
                  onClick={this.confirmDeleteStudent}
                  className="delete-btn"
                > Delete
                </button>

                <button
                  onClick={this.cancelDeleteStudent}
                  className="edit-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    )
  }
}

export default App
