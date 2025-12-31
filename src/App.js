import { useState } from 'react';
import './App.css';
import MovieAppContainer from './components/Assignment1/MovieApp/MoveAppContainer';
import PortfolioAppContainer from './components/Assignment1/PortfolioApp/PortfolioAppContainer';

function App() {
  const [theme, setTheme] = useState("light");
  const [app, setApp] = useState("portfolioapp");
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="App">
      <div className='switch-app'>
        <button onClick={() => setApp("portfolioapp")} className={app === "portfolioapp" ? "active" : ""}>
            PortfolioApp
        </button>
        <button onClick={() => setApp("movieapp")} className={app === "portfolioapp" ? "" : "active"}>
            MoveApp
        </button>
        <button onClick={toggleTheme} className='active'>
            {theme === "light" ? "Dark" : "Light"}
        </button>
        
      </div>

      {app === "portfolioapp" && <PortfolioAppContainer/>}
      {app === "movieapp" && <MovieAppContainer/>}

    </div>
  );
}

export default App;
