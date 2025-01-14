import { render, screen, fireEvent } from "@testing-library/react";
import { useUserContext } from "../../context/UserContext"; // Import your hook
import Table from "./Table";

jest.mock("../../context/UserContext");

describe("Table", () => {
  const mockOnCreateUserClick = jest.fn();
  const mockOnDeleteUserClick = jest.fn();
  const mockOnEditUserClick = jest.fn();

  it("renders loading state when users are loading", () => {
    (useUserContext as jest.Mock).mockReturnValue({
      users: [],
      loading: true,
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      selectUser: jest.fn(),
    });

    render(
      <Table
        onCreateUserClick={mockOnCreateUserClick}
        onDeleteUserClick={mockOnDeleteUserClick}
        onEditUserClick={mockOnEditUserClick}
      />
    );

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("renders the table when there are users", () => {
    const mockUsers = [
      { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
      { id: "2", name: "Jane Doe", email: "jane@example.com", status: "inactive" },
    ];

    (useUserContext as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      selectUser: jest.fn(),
    });

    render(
      <Table
        onCreateUserClick={mockOnCreateUserClick}
        onDeleteUserClick={mockOnDeleteUserClick}
        onEditUserClick={mockOnEditUserClick}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });

  it("calls onDeleteUserClick when delete button is clicked", () => {
    const mockUsers = [
      { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
    ];

    (useUserContext as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      selectUser: jest.fn(),
    });

    render(
      <Table
        onCreateUserClick={mockOnCreateUserClick}
        onDeleteUserClick={mockOnDeleteUserClick}
        onEditUserClick={mockOnEditUserClick}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnDeleteUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("calls onEditUserClick when edit button is clicked", () => {
    const mockUsers = [
      { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
    ];

    (useUserContext as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      selectUser: jest.fn(),
    });

    render(
      <Table
        onCreateUserClick={mockOnCreateUserClick}
        onDeleteUserClick={mockOnDeleteUserClick}
        onEditUserClick={mockOnEditUserClick}
      />
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(mockOnEditUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });
});
