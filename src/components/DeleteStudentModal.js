import React from "react";

class DeleteStudentModal extends React.Component {
  render() {
    const { isOpen, student, onCancel, onConfirm } = this.props;

    if (!isOpen || !student) 
    return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Confirm Delete</h3>

          <p>
            Are you sure you want to delete?
          </p>

          <div className="student-actions">
            <button className="edit-btn" onClick={onCancel}>
              Cancel
            </button>

            <button className="delete-btn" onClick={() => onConfirm(student.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteStudentModal;
