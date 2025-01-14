import { useUserContext } from "../../context/UserContext";

export const mockUserContext = (overrides = {}) => {
  const defaultContext = {
    users: [{ id: "1", name: "John Doe", email: "john@example.com", status: "active" }],
    selectedUser: null,
    isCreateAndUpdateUserModalOpen: false,
    isDeleteUserModalOpen: false,
    loading: false,
    selectUser: jest.fn(),
    openCreateAndUpdateUserModal: jest.fn(),
    closeCreateAndUpdateUserModal: jest.fn(),
    openDeleteUserModal: jest.fn(),
    closeDeleteUserModal: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const contextValue = { ...defaultContext, ...overrides };

  (useUserContext as jest.Mock).mockReturnValue(contextValue);
};
