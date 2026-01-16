/* 
React Forms and User Input


-> Traditional HTML from vs React Forms:


Controlled Components
  Why -> single source of truth
        real  time validation
        dynamic forms
        better testing

  How -> state and onChange handlers

uncontrolled Components



Personal info form -> user, name, country etc -> using controled components

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
      <h1> Personal Info Form </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input 
            type="text" 
            id="name" 
            name='name'
            value={formData.name} 
            onChange={handleInputChange} 
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span> }
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input 
            type="email" 
            id="email" 
            name='email'
            value={formData.email} 
            onChange={handleInputChange} 
            className={errors.email ? 'error' : ''}
          />

          {errors.email && <span className="error-message">{errors.email}</span> }
        </div>

         <div>
          <label htmlFor='country'>Country:</label>
          <select 
            id="country" 
            name='country'
            value={formData.country} 
            onChange={handleInputChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="in">India</option>
            <option value="cn">China</option>
            <option value="jp">Japan</option>
            <option value="br">Brazil</option>
          </select>
          {errors.country && <span className="error-message">{errors.country}</span> }
        </div>
        <div>
          <label htmlFor='bio'>Tell about yourself:</label>
          <textarea 
            id="bio" 
            name='bio'
            value={formData.bio} 
            onChange={handleInputChange} 
            rows={4}
            placeholder='Share a brief bio about yourelf...'
            className={errors.bio ? 'error' : ''} 
          />
          <small className={`character-count ${formData.bio.length > 450 ? 'warning' : ''}`}>{formData.bio.length}/500 characters</small>
          {errors.bio && <span className="error-message">{errors.bio}</span> }
        </div>

        <div>
          <label className='checkbox-label'>
            <input 
              type="checkbox" 
              name='agreeToTerms'
              checked={formData.agreeToTerms} 
              onChange={handleCheckboxChange}
              className={errors.agreeToTerms ? 'error' : ''}
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span> }
        </div>

        <button type="submit">Submit Form</button>   
      </form>

     
  </div>
  )
}

export default App;
