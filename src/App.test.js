

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read an book'

const addNewItems = (items = [], screen) => {
  const input = screen.getByTestId('input-text');
  const submitButton = screen.getByTestId('submit');

  items.forEach(newItem => {
    userEvent.type(input, newItem)
    fireEvent.click(submitButton);
  });
}

test('add items to the list',  async () => {
  const screen = render(<App />);
  const todoList = screen.getByTestId("todo-list");

  expect(todoList.children.length).toBe(0);

  addNewItems(
    [expectedValueOne, expectedValueTwo],
    screen,
  );

  expect(todoList.children.length).toBe(2);

  expect(screen.getByText(expectedValueOne)).toBeInTheDocument();
  expect(screen.getByText(expectedValueTwo)).toBeInTheDocument();
});