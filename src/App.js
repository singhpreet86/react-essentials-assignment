import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  
  return (
    <div className="App">

      <div className='app-header'>
            <h1> Header </h1>
      </div>

      <div className='app-main'>
          <div className='side-bar'>
              <TaskForm/>
          </div>
          <div className='content'>
              <TaskList/>
          </div>
      </div>
      
    </div>
  );
}

export default App;
