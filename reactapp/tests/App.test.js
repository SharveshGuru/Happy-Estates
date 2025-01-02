import { render, screen } from '@testing-library/react';
import App from '../App';
import Navbar from '../components/Navbar/Navbar';
import Property from '../components/Property/Property';
import Lease from '../components/Lease/Lease';
import Tenant from '../components/Tenant/Tenant';

test('renders Lease component header', () => {
  render(<Lease />);
  const leaseHeader = screen.getByRole('heading', { name: /Leases/i });
  expect(leaseHeader).toBeInTheDocument();
});

test('renders Add Lease button', () => {
  render(<Lease />);
  const addLeaseButton = screen.getByRole('button', { name: /Add Lease/i });
  expect(addLeaseButton).toBeInTheDocument();
});

test('renders Lease Property ID input field', () => {
  render(<Lease />);
  const propertyIdInput = screen.getByPlaceholderText(/Property ID/i);
  expect(propertyIdInput).toBeInTheDocument();
});

test('renders Lease Tenant ID input field', () => {
  render(<Lease />);
  const tenantIdInput = screen.getByPlaceholderText(/Tenant ID/i);
  expect(tenantIdInput).toBeInTheDocument();
});

test('renders Lease Term input field', () => {
  render(<Lease />);
  const leaseTermInput = screen.getByPlaceholderText(/Lease Term/i);
  expect(leaseTermInput).toBeInTheDocument();
});

test('renders list of leases', () => {
  render(<Lease />);
  const leaseList = screen.getByRole('list');
  expect(leaseList).toBeInTheDocument();
});

test('renders Lease item with property and tenant information', () => {
  render(<Lease />);
  const leaseItem = screen.getByText(/Property ID: 1/);  // Replace with actual data if necessary
  expect(leaseItem).toBeInTheDocument();
});

test('renders Lease item with term details', () => {
  render(<Lease />);
  const leaseTermItem = screen.getByText(/12 months/); // Replace with actual data if necessary
  expect(leaseTermItem).toBeInTheDocument();
});

test('renders correct Lease item count', () => {
  render(<Lease />);
  const leaseItems = screen.getAllByRole('listitem');
  expect(leaseItems.length).toBeGreaterThan(0);  // Adjust based on expected number of leases
});


