import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home/Home';
import Register from '../components/Register/Register';
import EmployeeManagement from '../components/EmployeeManagement/EmployeeManagement';
import ShiftManagement from '../components/ShiftManagement/ShiftManagement';

// Describe block for grouping all component tests
describe('Component Rendering Tests', () => {
  // 1. Test for Home component
  test('renders Home component', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Welcome to Staff Scheduling System/i);
    expect(headingElement).toBeInTheDocument();
  });

  
  test('renders Register heading', () => {
    render(<Register />);
    const headingElement = screen.getByText(/Register to Create an Account/i);
    expect(headingElement).toBeInTheDocument();
  });

  // 3. Test for Register name field
  test('renders Name input field in Register component', () => {
    render(<Register />);
    const nameField = screen.getByPlaceholderText(/Name/i);
    expect(nameField).toBeInTheDocument();
  });

  // 4. Test for Register email field
  test('renders Email input field in Register component', () => {
    render(<Register />);
    const emailField = screen.getByPlaceholderText(/Email/i);
    expect(emailField).toBeInTheDocument();
  });

  // 5. Test for Register password field
  test('renders Password input field in Register component', () => {
    render(<Register />);
    const passwordField = screen.getByPlaceholderText(/Password/i);
    expect(passwordField).toBeInTheDocument();
  });

  // 6. Test for Register button
  test('renders Register button in Register component', () => {
    render(<Register />);
    // const button = screen.getByText(/Register/i);
    const button = screen.getByRole('button',{name:/Register/i});
    expect(button).toBeInTheDocument();
  });

  // 7. Test for Employee Management heading
  test('renders Employee Management heading', () => {
    render(<EmployeeManagement />);
    const headingElement = screen.getByText(/Employee Management/i);
    expect(headingElement).toBeInTheDocument();
  });

  // 8. Test for Add Employee button in Employee Management
  test('renders Add Employee button', () => {
    render(<EmployeeManagement />);
    const button = screen.getByText(/Add Employee/i);
    expect(button).toBeInTheDocument();
  });

  // 9. Test for Shift Management heading
  test('renders Shift Management heading', () => {
    render(<ShiftManagement />);
    const headingElement = screen.getByText(/Shift Management/i);
    expect(headingElement).toBeInTheDocument();
  });

  // 10. Test for Add Shift button in Shift Management
  test('renders Add Shift button', () => {
    render(<ShiftManagement />);
    const button = screen.getByText(/Add Shift/i);
    expect(button).toBeInTheDocument();
  });

  // 11. Test Add Employee button functionality in Employee Management
  test('clicking Add Employee button adds a new employee', () => {
    render(<EmployeeManagement />);
    const button = screen.getByText(/Add Employee/i);
    fireEvent.click(button);
    const newEmployee = screen.getByText(/New Employee/i);
    expect(newEmployee).toBeInTheDocument();
  });

  
});
