

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read an book'
const expectedValueThree = 'Drink a coffee-Edited!'

const addNewItems = (items = [], screen) => {
  const input = screen.getByTestId('input-text');
  const submitButton = screen.getByTestId('submit');

  items.forEach(newItem => {
    userEvent.type(input, newItem)
    fireEvent.click(submitButton);
  });
}

const editItem = (item, screen) => {
  const input = screen.getByTestId('input-text');
  const submitButton = screen.getByTestId('submit');

  fireEvent.click(screen.getByTestId('edit-button-0'));

  userEvent.type(input, '')
  userEvent.type(input, item)
  fireEvent.click(submitButton);
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


test('remove an item of the list',  async () => {
  const screen = render(<App />);
  const todoList = screen.getByTestId("todo-list");

  expect(todoList.children.length).toBe(0);

  addNewItems([expectedValueOne], screen);
  expect(todoList.children.length).toBe(1);

  fireEvent.click(screen.getByTestId('remove-button-0'));
  expect(todoList.children.length).toBe(0);
});


test('edit an item of the list',  async () => {
  const screen = render(<App />);
  const todoList = screen.getByTestId("todo-list");
  const newChange= '-Edited!'

  expect(todoList.children.length).toBe(0);

  addNewItems([expectedValueOne], screen);
  expect(todoList.children.length).toBe(1);

  editItem(newChange, screen)

  expect(todoList.children.length).toBe(1);
  expect(screen.getByText(expectedValueThree)).toBeInTheDocument();
});
