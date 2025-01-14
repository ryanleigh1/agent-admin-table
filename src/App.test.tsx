import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { mockUserContext } from "./utils/test/mockUserContent";

// Mock the context
jest.mock("./context/UserContext");

describe("App", () => {
  const mockSelectUser = jest.fn();
  const mockOpenCreateAndUpdateUserModal = jest.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it("renders the Table component", () => {
    mockUserContext({
      isCreateAndUpdateUserModalOpen: false,
      isDeleteUserModalOpen: false,
      loading: false,      
      selectUser: mockSelectUser,
      openCreateAndUpdateUserModal: mockOpenCreateAndUpdateUserModal,
    });

    render(<App />);

    expect(screen.getByTestId("user-table")).toBeInTheDocument();
  });

  it("opens the CreateAndUpdateUserModal when Add User is clicked", () => {
    mockUserContext({
      isCreateAndUpdateUserModalOpen: false,
      selectUser: mockSelectUser,
      openCreateAndUpdateUserModal: mockOpenCreateAndUpdateUserModal,
    });

    render(<App />);

    // Simulate click on Add User button
    fireEvent.click(screen.getByTestId("add-user-btn"));

    // Check if the modal open function is called
    expect(mockOpenCreateAndUpdateUserModal).toHaveBeenCalled();
  });

  it("opens the DeleteUserModal when the delete button is clicked", async () => {
    const mockUser = { id: "1", name: "John Doe", email: "john@example.com", status: "active" };

    mockUserContext({
      selectedUser: mockUser,
      isCreateAndUpdateUserModalOpen: false,
      isDeleteUserModalOpen: true,
      selectUser: mockSelectUser,
      openCreateAndUpdateUserModal: mockOpenCreateAndUpdateUserModal,
    });

    render(<App />);

    const deleteButtons = screen.getAllByTestId("delete-btn");

    fireEvent.click(deleteButtons[0]);

    expect(screen.getByTestId("delete-user-modal")).toBeInTheDocument();
  });
});
