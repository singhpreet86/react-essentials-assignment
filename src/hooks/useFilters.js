import { useMemo } from "react";

export function useFilters(expenses = [], filters) {
  return useMemo(() => {
    let data = expenses.filter(Boolean);

    if (filters.search) {
      data = data.filter(e =>
        e.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      data = data.filter(e => e.category === filters.category);
    }

    if (filters.sort === "amount") {
      data.sort((a, b) => b.amount - a.amount);
    }

    if (filters.sort === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [expenses, filters]);
}
