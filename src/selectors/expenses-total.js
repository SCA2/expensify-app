export default (expenses) => {
  if(Array.isArray(expenses)) {
    return expenses
      .map(expense => (expense && expense.amount ? expense.amount : 0))
      .reduce((sum, expense) => (sum += expense), 0);
  }

  return 0;
}