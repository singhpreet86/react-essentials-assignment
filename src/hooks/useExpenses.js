import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const useExpenses = () => {

   const [expences, setExpences] = useLocalStorage('expenses', []);


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

   const getTotalAmount = useMemo(() => {
      return expences.reduce((sum, expences) => sum + expences.amount, 0);
   }, [expences]);

   const getExpensesByCategory = (category) => {
      if (!category || category === 'all') return expences;
      return expences.filter(expences => expences.category === category);
   }

  const getMonthlySummary = useMemo(() => {
  const summary = {};

  expences.forEach(expense => {
    const month = expense.date.slice(0, 7);

    if (!summary[month]) summary[month] = 0;

    summary[month] += expense.amount;
  });
  const currentMonth = new Date().toISOString().slice(0, 7);
  if (!summary[currentMonth]) {
    summary[currentMonth] = 0;
  }

  return summary;
}, [expences]);


   return {
      expences,
      addExpense,
      removeExpense,
      getTotalAmount,
      getExpensesByCategory,
      getMonthlySummary
   }

}

export default useExpenses
