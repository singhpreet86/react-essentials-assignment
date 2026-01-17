import './App.css';
import TaskProvider from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import { useState } from 'react';


function App() {
  const [showForm, setShowForm] = useState(true);

  
  return (
    <TaskProvider>
    <div className="App">

      <div className='app-header'>
            <h1> Task Manager </h1>
      </div>

      <div className={`app-main ${showForm ? "" : "no-sidebar"}`}>

        {showForm && (
          <div className='side-bar'>

            
            
              <div  
              className="add-task-toggle" 
                onClick={() => setShowForm(prev => !prev)}>
                
                <span>Hide Task Form</span>
                <span className='toggle-icon'>-</span>
              </div>

              <TaskForm />
          
              </div>
            )}
          


          <main className={`content ${showForm ? "" : "hide-content"}`}>

            {!showForm && (
              <div  
              className="add-task-toggle main-toggle" 
                onClick={() => setShowForm(prev => !prev)}>
                
                <span>Add Task</span>
                <span className='toggle-icon'>+</span>
              </div>

            )}


              <TaskSummary/>
              <TaskList/>
          </main>
      </div>
      
    </div>
    </TaskProvider>
  );
}

export default App;
