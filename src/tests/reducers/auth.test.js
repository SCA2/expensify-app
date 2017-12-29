import authReducer from '../../reducers/auth';

test('should login user', () => {
  const action = {
    type: 'LOGIN',
      uid: 'abc'
  };
  const state = authReducer({}, action);
  expect(state.uid).toEqual(action.uid);
});

test('should logout user', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'abc' }, action);
  expect(state).toEqual({});
});
