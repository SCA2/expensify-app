import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123', { description: 'description'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: { description: 'description'}
  })
})

test ('should create default addExpense action object', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  })
})

test ('should create custom addExpense action object', () => {
  const expenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData,
    }
  })
})