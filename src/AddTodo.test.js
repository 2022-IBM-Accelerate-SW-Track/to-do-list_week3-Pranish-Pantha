import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Test/i);
  expect(check.length).toEqual(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkDate = screen.queryByText(new RegExp("5/30/2023", "i"));
  expect(checkDate).toBe(null);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.click(element);
  const check = screen.queryByText(/Test/i);
  expect(check).toBe(null);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Test/i);
  const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const checkDeleted = screen.getByText(/You have no todo's left/i);
  expect(checkDeleted).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = new Date()
  console.log(dueDate.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}))
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/Test/i).style.background;
  expect(historyCheck).toBe("white")

  dueDate.setDate(dueDate.getDate() - 1)
  fireEvent.change(inputTask, { target: { value: "Test2"}});
  fireEvent.change(inputDate, { target: { value: dueDate.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}});
  fireEvent.click(element);
  const historyCheck2 = screen.getByTestId(/Test2/i).style.background;
  expect(historyCheck2).toBe("red")
 });
