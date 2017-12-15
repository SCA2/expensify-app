const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(e => { return e.id != action.id });
    case 'EDIT_EXPENSE':
      return state.map(e => {
        if(e.id === action.id) {
          return {...e, ...action.updates}
        } else {
          return e;
        }
      })
    default: return state;
  }
};