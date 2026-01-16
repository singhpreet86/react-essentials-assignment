/* 
maria s piza ordering

*/
import React, { useState } from 'react';
import './App.css';


function App() {

  const [formData, setFormData] = useState({
    name: '',    
    email: '',
    country: '',
    bio: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState([]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } 
  

  const handleInputChange = (event) => {  
    const {name, value} = event.target;

    setFormData(prevState => ({ 
      ...prevState,
      [name]: value
    }));

    if(name === 'email'){
      if(value && !validateEmail(value)){
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Invalid email format',
        }));
      } else {
        setErrors(prevErrors => {
          const newErrors = {...prevErrors};  
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const {name, checked} = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: checked
    }));
  }; 

  const validateForm = () => {
    const newErrors = {};

    //name validation

    if(!formData.name.trim()){
      newErrors.name = 'Name is required';
    }

    if(!formData.email.trim()){
      newErrors.email = 'Email is required';
    } else if(!validateEmail(formData.email)){
      newErrors.email = 'Please enter a valid email';
    }

    if(!formData.country){
      newErrors.country = 'Please select a country';
    }

    if(formData.bio.length > 500){
      newErrors.bio = 'Bio must be less than 500 characters';
    } 

    if(!formData.agreeToTerms){
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

   
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();

    if(Object.keys(formErrors).length > 0){
      setErrors(formErrors);
      return;
    } 

     setErrors({});
     console.log('Form submitted successfully:', formData);
     alert('Form submitted successfully!');

     resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',    
      email: '',
      country: '',
      bio: '',
      agreeToTerms: false
    });
    setErrors({});
  };  



  return (
    <div className="App">
      <header>
      <h1> Maria's Pizza  - Online ordering </h1>
      <p>Authentic pizza since 1987</p>
    </header> 

    <main>
      <form className="pizza-order-form" onSubmit={handleSubmit}>
        <h2>Order Your Pizza</h2>

        <section className="customer-info">
          <h3>Customer Information</h3>  
          </section>

          <section className="pizzza-customization">
            <h3>Build your pizza</h3>
        </section> 

        <section className="order-summary">
          <h3>Order summary</h3>
        </section>

        <button type='submit'> Place Order - $0.00 </button>

        
      </form>
    </main>  
     
  </div>
  )
}

export default App;
