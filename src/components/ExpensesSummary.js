import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const pluralize = (noun, length) => (
  length > 1 ? noun + 's' : noun
);

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <h1>
    {`Viewing ${expenseCount} ${pluralize('expense', expenseCount)} totalling ${numeral(expensesTotal / 100).format('$0,0.00')}`}
  </h1>
);

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);