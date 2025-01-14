import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  test('renders the input field with initial filter value', () => {
    const mockOnFilterChange = jest.fn();
    const filterValue = 'John';

    render(<Filter filterValue={filterValue} onFilterChange={mockOnFilterChange} />);

    // Check if the input field has the correct initial value
    const input = screen.getByPlaceholderText('Search by name or email...');
    expect(input).toHaveValue(filterValue);
  });

  test('calls onFilterChange when the input value changes', () => {
    const mockOnFilterChange = jest.fn();
    const filterValue = 'John';

    render(<Filter filterValue={filterValue} onFilterChange={mockOnFilterChange} />);

    // Simulate user typing in the input
    const input = screen.getByPlaceholderText('Search by name or email...');
    fireEvent.change(input, { target: { value: 'Jane' } });

    // Ensure that onFilterChange is called with the correct value
    expect(mockOnFilterChange).toHaveBeenCalledWith('Jane');
  });

  test('renders the input field with an empty value when no filter value is provided', () => {
    const mockOnFilterChange = jest.fn();

    render(<Filter filterValue="" onFilterChange={mockOnFilterChange} />);

    // Check if the input field is empty
    const input = screen.getByPlaceholderText('Search by name or email...');
    expect(input).toHaveValue('');
  });

  test('renders the correct placeholder text', () => {
    const mockOnFilterChange = jest.fn();

    render(<Filter filterValue="" onFilterChange={mockOnFilterChange} />);

    // Check if the placeholder text is present
    const input = screen.getByPlaceholderText('Search by name or email...');
    expect(input).toHaveAttribute('placeholder', 'Search by name or email...');
  });
});
