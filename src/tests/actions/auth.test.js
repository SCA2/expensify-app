import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout } from '../../actions/auth';

const createMockStore = configureMockStore([thunk]);

test('should create login action object', () => {
  const action = login('uid');
  expect(action.type).toEqual('LOGIN');
  expect(action.uid).toEqual('uid');
});

test('should create logout action object', () => {
  const action = logout();
  expect(action.type).toEqual('LOGOUT');
});