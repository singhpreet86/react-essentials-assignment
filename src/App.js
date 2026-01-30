import React from 'react'
import './App.css';
import FilterBar from './components/FilterBar';
import StudentsView from './components/StudentsView';
import AddEditStudentForm from './components/AddEditStudentForm';
import DeleteStudentModal from "./components/DeleteStudentModal";

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

  statuses = ['ALL', 'PASSED', 'FAILED'];

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

  handleDeleteStudent = (studentId) => {
    this.setState({
      showDeleteModal: true,
      studentToDelete: studentId,
      showAddStudentForm: false,
      editingStudent: { id: null, name: '', grade: '' }
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

    const sortedAndFileredStudents = [...filteredStudents].sort((a, b) => {
      switch (this.state.sortOrder) {
        case 'ASC':
          return a.grade - b.grade;
        case 'DESC':
          return b.grade - a.grade;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return (
      <StudentsView
        students={sortedAndFileredStudents}
        onEdit={this.handleEditStudent}
        onDelete={this.handleDeleteStudent}
        onMarkPassed={this.handleMarkStudentPassed}
      />
    );
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

            <FilterBar
              statuses={this.statuses}
              activeFilter={this.state.filter}
              sortOrder={this.state.sortOrder}
              onSortChange={this.handleSortChange}
              onFilterChange={this.handleFilterChange}
              studentsCount={this.state.students.length}
            />

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

            <AddEditStudentForm
              show={this.state.showAddStudentForm}
              editingStudent={this.state.editingStudent}
              student={this.state.newStudent}
              onInputChange={this.handleInputChange}
              onSubmit={this.handleAddSubmit}
            />

            {this.renderStudentList()}
          </section>

        </main>

          <DeleteStudentModal
            isOpen={this.state.showDeleteModal}
            student={this.state.studentToDelete}
            onCancel={this.cancelDeleteStudent}
            onConfirm={this.confirmDeleteStudent}
          />

      </div>
    )
  }
}

export default App
