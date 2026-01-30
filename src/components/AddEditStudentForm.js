import React from "react";

class AddEditStudentForm extends React.Component {
    render() {
        const { show, editingStudent, student, onInputChange, onSubmit } = this.props;

        if (!show) 
        return null;

        return (
            <section className="add-student-section">
                {editingStudent.id ? (
                    <h2>Edit Student</h2>
                ) : (
                    <h2>Add New Student</h2>
                )}

                <form onSubmit={onSubmit} className="add-student-form">
                    <div className="form-group">
                        <label htmlFor="studentName">Student Name:</label>
                        <input
                            type="text"
                            id="studentName"
                            name="name"
                            value={student.name}
                            onChange={onInputChange}
                            placeholder="Enter full student name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentGrade">Grade (0-100):</label>
                        <input
                            type="number"
                            id="studentGrade"
                            name="grade"
                            value={student.grade}
                            onChange={onInputChange}
                            placeholder="Enter grade (0-100)"
                            min="0"
                            max="100"
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        {editingStudent.id ? "Update Student" : "Add Student"}
                    </button>
                </form>
            </section>
        );
    }
}

export default AddEditStudentForm;
