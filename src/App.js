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

  //Price calculation
  const calculateTotalPrice = () => {
    let total=0;

    //base price by size
    const sizePrices = {
      small: 12.99,
      medium: 15.99,
      large: 18.99,
      xlarge: 21.99
    };

    //add base prizza price

    total += sizePrices[pizzaOrder.size];

    //Add crust price
    const crustPrices = {
      thin: 1.00,
      thick: 2.00,
      stuffed: 3.00,
      regular: 0
    };

    total += crustPrices[pizzaOrder.crust];

    //Add toppings price (1.50 each)
    total += pizzaOrder.toppings.length * 1.50;


    // Add delivery fee if applicable
    if (customerInfo.isDelivery) {
      total += 2.99; 
    }

    return total.toFixed(2);
  }

  

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

            <div className='form-group'>
              <label htmlFor="pizza-size"> Pizza Size </label>
              <select 
                id="pizza-size" 
                name="pizza-size" 
                value={pizzaOrder.size} 
                onChange={(e) => setPizzaOrder({...pizzaOrder, size: e.target.value})}
              >
                <option value="small"> Small  10" - $12.99 </option>
                <option value="medium"> Medium  12" - $15.99 </option>
                <option value="large"> Large  14" - $18.99 </option>
                <option value="elarge"> Extra Large  16" - $21.99 </option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor="-pizza-crust"> Crust Type </label>
              <select 
                id="pizza-crust" 
                name="crust" 
                value={pizzaOrder.crust} 
                onChange={(e) => setPizzaOrder({...pizzaOrder, crust: e.target.value})}
              >
                <option value="regular"> Regular Crust </option>
                <option value="thin"> Thin Crust (+$1.00) </option>
                <option value="thick"> Thick Crust (+$2.00)</option>
                <option value="stuffed"> Stuffed Crust (+$3.00) </option>
              </select>
            </div>


            <div className='form-group'>
              <fieldset>
                <legend> Your Toppings  (Each +$1.50) </legend>

                <div className='toppings-grid'>
                  {
                    ['pepperoni', 'mushrooms', 'onions', 'sausage', 'bacon', 'extra cheese', 'black olives', 'green peppers', 
                      'pineapple', 'spinach'].map((topping) => (
                      <label key={topping} className="topping-option">
                        <input 
                          type="checkbox" 
                          name="toppings" 
                          value={topping} 
                          checked={pizzaOrder.toppings.includes(topping)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPizzaOrder({...pizzaOrder, toppings: [...pizzaOrder.toppings, topping]});
                            } else {
                              setPizzaOrder({...pizzaOrder, toppings: pizzaOrder.toppings.filter(t => t !== topping)});
                            }
                          }} 
                        />
                        {topping.charAt(0).toUpperCase() + topping.slice(1)}
                      </label>
                    ))    
                  }
                </div>
              </fieldset>
            </div>

        </section> 

        <section className="order-summary">
          <h3>Order summary</h3>

          <div className='summary-item'> 
            <span className='item-name'>
              {pizzaOrder.size.charAt(0).toUpperCase() + pizzaOrder.size.slice(1)} Pizza 
              {pizzaOrder.crust} Crust
            </span> 
            <span className='item-price'> 
              ${(() => {
                const sizePrices = {small: 12.99, medium: 15.99, large: 18.99, xlarge: 21.99};
                const crustPrices = {regular: 0, thin: 1.00, thick: 2.00, stuffed: 3.00};
                return (sizePrices[pizzaOrder.size] + crustPrices[pizzaOrder.crust]).toFixed(2);
              })()} 
            </span> 

           { pizzaOrder.toppings.length > 0 && (
            <div className='summary-item'>
              <span className='item-name'> Toppings: {pizzaOrder.toppings.join(', ')} </span>
              <span className='item-price'> 
                ${ (pizzaOrder.toppings.length * 1.50).toFixed(2) } 
              </span>
            </div>
           )}

           { customerInfo.isDelivery && (
            <div className='summary-item'>
              <span className='item-name'> Delivery Fee </span>
              <span className='item-price'> $2.99 </span>
            </div>
           )}


           <div className='summary-total'>
              <span className='total-label'> Total: </span>
              <span className='total-price'> ${calculateTotalPrice()} </span> 

          </div>
          </div>

          {customerInfo.name && (
            <div className='customer-detailed'>

              <p> <strong>Customer:</strong>{customerInfo.name}</p>
              {customerInfo.phone && <p> <strong>Phone:</strong> {customerInfo.phone} </p>}
              {customerInfo.isDelivery && customerInfo.address ? (
                <p> <strong>Delivery to:</strong> {customerInfo.address || "Address Needed"} </p>
              ): (
              <p> <strong> Pickup</strong> at marios pizza (Est. 20-30 mins) </p>

              )}

            </div>
          )}

          
         
        </section>

        <button type='submit' className='submit-btn'> Place Order - ${calculateTotalPrice()} </button>

        
      </form>
    </main>  
     
  </div>
  )
}

export default App;
