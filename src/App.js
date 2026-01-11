import React from 'react'
import './App.css';

class App extends React.Component{

    constructor(props){
      super(props);
      console.log("Constructor: Component is beging created");
      this.state = {
        counter: 0,
        userName: 'User',
        theme: 'light',
        tempName: '',
        lastUpdated: null
      };
    }

  componentDidMount(){
    console.log("this is where you would typically ");
    console.log( "Fetch data from api,set up sebscription");

    const savedCount = localStorage.getItem("counterValue");

    if(savedCount){
      console.log("loading from local ", savedCount);
      this.setState({counter: savedCount});

    this.setState({lastUpdated: new Date().toLocaleTimeString()});
  } 
} 

  componentDidUpdate( prevProps, prevState) {
    console.log("Component has updted");
    console.log("previosu state", prevState);
    console.log("current state", this.state);

    if(prevState.counter !== this.state.counter){
      console.log("saving to localstorage");
      localStorage.setItem('counterValue', this.state.counter.toString());

    this.setState({lastUpdated: new Date().toLocaleTimeString()});
    }
  }

  componentWillUnmount(){
    console.log("Componen is about to removed");
  }
  incrimentCount = () => {
     this.setState({counter: this.state.counter + 1}, () =>{
      console.log("After immidete incriment click");
    })
    console.log("count: ", this.state.counter);
  }  


  decrementCount = () => {
    if(this.state.counter > 0){
    console.log("Decrement clicked");
    this.setState({counter: this.state.counter - 1})
    console.log("count: ", this.state.counter);
    }else{
      console.log("Counter shoud be greater then 0");
    }
  }

  resetCount = () => {
    this.setState({counter: 0})

    console.log("reset clicked");
    
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({theme: newTheme});
  }

  handleNameChange = (event) => {
    this.setState({tempName: event.target.value});
  }

  updateUserName = ()=> {
    if(this.state.tempName.trim()!== ''){
      this.setState({
        userName: this.state.tempName,
        tempName: ''
      })
    }
  }

  render(){
    const {counter, userName, theme, tempName, lastUpdated} = this.state;
    const containerClass = `counter-container ${theme}-theme`;

    return(
      <div className='App'>
        <div className={containerClass}>
          <h1> Hello, {userName}!</h1>
          <h2> Counter: {counter }</h2>

          {lastUpdated &&  <p className='timesection'> Last update: {lastUpdated}</p>}

          <div className='button-group'>
          <button onClick={this.incrimentCount}> + </button>
          <button onClick={this.decrementCount}> - </button>
          <button onClick={this.resetCount}> Reset </button>
          </div>


          <div className='name-changer'>
            <input
              type='text'
              value={tempName}
              onChange={this.handleNameChange}
              placeholder='Enter new name'
              />
              
              <button onClick={this.updateUserName}>Update Name</button>

          </div>

          <div className='theme-section'>
          <p> Theme: {theme} </p>
            <button onClick={this.toggleTheme}> Switch to {theme === 'light' ? 'dark' : 'light'}</button>
          </div>
          </div>
      </div>
    )
  }
}

export default App