/* 
maria s piza ordering

*/
import React, { useState } from 'react';
import './App.css';


function App() {

 const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address:  '',
    isDelivery: true
  });

  //Pizza Customization
  const [pizzaOrder, setPizzaOrder] = useState({
    size: 'medium',
    crust: 'regular',
    toppings: [],      
    specialInstructions: ''
  });

  // UI state for form behavior

  const [formState, setFormState] = useState({
    errors: {},
    isSubmitting: false,
    showOrderSummary: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

  }

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

          <div className='form-group'>
            <label htmlFor="name"> Full Name </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={customerInfo.name} 
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} 
              placeholder='Enter your full name'
              required
            />
          </div>

           <div className='form-group'>
            <label htmlFor="customer-phone"> Phone Number </label>
            <input 
              type="text" 
              id="customer-phone" 
              name="customer-phone" 
              value={customerInfo.phone} 
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
              placeholder='(555) 123-4567'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="customer-email"> Email Address </label>
            <input 
              type="email" 
              id="customer-email" 
              name="customer-email" 
              value={customerInfo.email} 
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              placeholder='you.email@example.com'   
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="customer-address"> Delivery Address </label>
            <textarea
              id="customer-address"
              name="customer-address" 
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              placeholder='123 Main St, Brooklyn, NY 10001'
              rows={3}              
            />
          </div>

          <div className='form-group'>
            <fieldset>
              <legend> Order Type! </legend>

              <div className='radio-group'>
                <label>
                  <input 
                    type="radio" 
                    name="order-type" 
                    value="delivery" 
                    checked={customerInfo.isDelivery === true} 
                    onChange={() => setCustomerInfo({...customerInfo, isDelivery: true})} 
                  />
                  Delivery  (45-60 minutes)
                </label>

                <label>
                  <input 
                    type="radio" 
                    name="order-type" 
                    value="pickup" 
                    checked={customerInfo.isDelivery === false} 
                    onChange={() => setCustomerInfo({...customerInfo, isDelivery: false})} 
                  />
                  Pickup  (20-30 minutes)
                </label>
                
              </div>
            </fieldset>

            

          </div>


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
