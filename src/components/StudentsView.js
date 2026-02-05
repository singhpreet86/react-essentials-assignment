import React from "react";

class StudentsView extends React.Component {
    render() {
        const { students, onEdit, onDelete, onMarkPassed, onMarkFailed } = this.props;

        if (students.length === 0) {
            return (
                <div className="no-students">
                    <p>No students added yet, Add your first student</p>
                </div>
            );
        }

        return (
            <div className="students-grid">
                {students.map(student => (
                    <div
                        key={student.id}
                        className={`student-card ${student.passed ? "passed" : "failed"}`}>

                        <div className="student-info">
                            <h3>{student.name}</h3>
                            <p><strong>Grade:</strong> {student.grade}%</p>
                        </div>

                        <div className="student-status">
                            <span className={`status ${student.passed ? "status-passed" : "status-failed"}`}>
                                {student.passed ? "PASSED" : "FAILED"}
                            </span>
                        </div>

                        <div className="student-actions">
                            <button onClick={() => onDelete(student.id)} className="delete-btn">
                                <img src="delete.png" alt="Delete"></img>

                            </button>

                            <button onClick={() => onEdit(student)} className="edit-btn">
                                <img src="edit.png" alt="Edit"></img>
                            </button>

                            {!student.passed && (
                                <button onClick={() => onMarkPassed(student)} className="edit-btn">                                
                                    <img src="accept.png" alt="Mark as passed"></img>
                                </button>
                            )}

                            {student.passed && (
                                <button onClick={() => onMarkFailed(student)} className="edit-btn">                                
                                    ❌
                                </button>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    }
}

export default StudentsView;
