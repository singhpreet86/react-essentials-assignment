import './App.css';
import TaskProvider from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';

function App() {
  
  return (
    <TaskProvider>
    <div className="App">

      <div className='app-header'>
            <h1> Task Manager </h1>
      </div>

      <div className='app-main'>
          <div className='side-bar'>
              <TaskForm/>
          </div>
          <div className='content'>
              <TaskSummary/>
              <TaskList/>
          </div>
      </div>
      
    </div>
    </TaskProvider>
  );
}

export default App;
