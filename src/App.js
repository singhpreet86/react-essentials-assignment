import React , {useState, useEffect} from "react";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secondsOnPage, setSecondsOnPage] = useState(0);
  

  const fetchUser = async () => {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users/4');
    if(!response.ok){
      throw new Error(`Http Error! status ${response.status}`);
    }

    const userData = await response.json();
    setUser(userData);
    setLoading(false);
  }
  catch(err){
    setError(err.message);
    setLoading(false);
  }
}

useEffect(() => {
  fetchUser();
},[]);

useEffect(() => {
  if(user){
    document.title = `Profile: ${user.name} | Uer Dashboard`;
  }else{
    document.title = 'Loading............ | User Dashboard';
  }
},[user]);

useEffect(() => {
  const timer = setInterval(() =>{
    setSecondsOnPage(prev => prev+1);
  },1000);

  return () => {
    clearInterval(timer);
  };

},[]);
  
  return (
    <div className="App">
      <h1>User Profile Dashboard</h1>
      <p style={{textAlign: 'center', color: '#666', marginBottom: '20px'}}>
        Time on page: {secondsOnPage} seconds
      </p>

      {error && (
        <div style={{color: 'red', padding: '20px'}}> 
            <h2>Error</h2>
              <p>{error}</p>
        </div>
      )}

      {loading && !error && (
        <div style={{padding: '20px', textAlign: 'center'}}>
          <p> Loading.................</p>
          </div>
      )}

      {user && !loading && !error && (
        <div style={{padding: '20px'}}>
          <h2> User Information</h2>
          <p> {user.name} </p>
          <p> {user.email} </p>
          <p> {user.phone} </p>
        </div>
      )}
    </div>
  );
}

export default App;
