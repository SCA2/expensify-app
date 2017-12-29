import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import { expenses } from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  const path = `users/${uid}/expenses`;
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(path).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
});

test('should dispatch remove expense action to store', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[0].id
    });
    done();
  });
});

test('should remove expense from database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[0].id
    });

    const path = `users/${uid}/expenses/${actions[0].id}`;
    return database.ref(path).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBe(null);
    done();
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123', { description: 'description'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: { description: 'description'}
  })
});

test('should edit expense in database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  const expenseData = {
    description: 'Thing',
    note: 'Nice thing',
    amount: 100,
    createdAt: 1
  };

  store.dispatch(startEditExpense(expenses[0].id, expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expenses[0].id,
      updates: expenseData
    });

    const path = `users/${uid}/expenses/${actions[0].id}`;
    return database.ref(path).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test ('should create custom addExpense action object', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  const expenseData = {
    description: 'Thing',
    note: 'Nice thing',
    amount: 100,
    createdAt: 1
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    const path = `users/${uid}/expenses/${actions[0].expense.id}`;
    return database.ref(path).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    });

    const path = `users/${uid}/expenses/${actions[0].expense.id}`;
    return database.ref(path).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});