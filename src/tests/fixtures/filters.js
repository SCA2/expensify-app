import moment from 'moment';

const filterOne = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterTwo = {
  text: 'Bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { filterOne, filterTwo };