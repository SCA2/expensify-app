import selectExpensesTotal from '../../selectors/expenses-total';
import { expenses } from '../fixtures/expenses';

test('should return 0 if expenses is undefined', () => {
  const total = selectExpensesTotal(undefined);
  expect(total).toBe(0);
});

test('should return 0 if expenses is null', () => {
  const total = selectExpensesTotal(null);
  expect(total).toBe(0);
});

test('should return 0 if expenses is not an array', () => {
  const total = selectExpensesTotal(1);
  expect(total).toBe(0);
});

test('should return 0 if expenses array is empty', () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test('should return 0 if expenses array is strange', () => {
  const total = selectExpensesTotal([null, 'what?', 42]);
  expect(total).toBe(0);
});

test('should total a single expense', () => {
  const expense = [{ amount: 100 }];
  const total = selectExpensesTotal(expense);
  expect(total).toBe(expense[0].amount);
});

test('should correctly total multiple expenses', () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(114195);
});