import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filterOne, filterTwo } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filterOne}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with filterTwo correctly', () => {
  wrapper.setProps({
    filters: filterTwo
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const e = { target: { value: 'filter text' }};
  wrapper.find('input').prop('onChange')(e);
  expect(setTextFilter).toHaveBeenCalledWith(e.target.value);
});

test('should sort by date', () => {
  const e = { target: { value: 'date' }};
  wrapper.find('select').prop('onChange')(e);
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const e = { target: { value: 'amount' }};
  wrapper.find('select').prop('onChange')(e);
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
  const startDate = filterTwo.startDate;
  const endDate = filterTwo.endDate;
  wrapper
    .find('withStyles(DateRangePicker)')
    .prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus change', () => {
  const focused = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
  expect(wrapper.state('calendarFocused')).toBe(focused);
});