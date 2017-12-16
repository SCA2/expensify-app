import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { expenses } from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

test('can display total of one expense', () => {
  const wrapper = shallow(<ExpensesSummary
    expenseCount={1}
    expensesTotal={selectExpensesTotal([expenses[0]])}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('can display total of multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary
    expenseCount={expenses.length}
    expensesTotal={selectExpensesTotal(expenses)}
  />);
  expect(wrapper).toMatchSnapshot();
});