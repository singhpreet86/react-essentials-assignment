import { useState } from "react";

const useExpenses = () => {

     const[expences, setExpences] = useState([]);


     const addExpense = (expenseData) => {

        const newExpense = {
            id: Date.now(),
            ...expenseData,
            date: new Date().toISOString().split('T')[0]
        };

        setExpences(prevExpenses => [newExpense, ...prevExpenses]);

     }

     const removeExpense = (id) => {
        setExpences(prevExpenses => prevExpenses.filter(expences => expences.id !== id))

     }
    
     const getTotalAmount = () => {
        return expences.reduce((sum,expences) => sum+expences.amount,0);
     }

     const getExpensesByCategory = (category) => {
        if(!category || category === 'all' ) return expences;
            return expences.filter(expences => expences.category === category);
     }

     return{
        expences,
        addExpense,
        removeExpense,
        getTotalAmount,
        getExpensesByCategory
     }
 
}

export default useExpenses