import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
  <div>
    {`Viewing ${props.expenses.length} expenses totalling ${numeral(props.expensesTotal / 100).format('$0,0.00')}`}
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
  expensesTotal: selectExpensesTotal(state.expenses)
});

export default connect(mapStateToProps)(ExpensesSummary);