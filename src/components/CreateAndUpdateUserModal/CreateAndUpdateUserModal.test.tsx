import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateAndUpdateUserModal from "./CreateAndUpdateUserModal";
import { IUser } from "../../types/User";

describe("CreateAndUpdateUserModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const user: IUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
  };

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with 'Edit User' when user is passed", () => {
    render(
      <CreateAndUpdateUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />
    );
    expect(screen.getByText("Edit User")).toBeInTheDocument();
  });

  it("renders modal with 'Add New User' when user is not passed", () => {
    render(
      <CreateAndUpdateUserModal user={null} onClose={mockOnClose} onSave={mockOnSave} />
    );
    expect(screen.getByText("Add New User")).toBeInTheDocument();
  });

  it("form fields are pre-populated for editing", () => {
    render(
      <CreateAndUpdateUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />
    );
    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe("John Doe");
    expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe("john.doe@example.com");
    expect((screen.getByLabelText(/status/i) as HTMLInputElement).value).toBe("active");
  });

  it("form fields are empty when adding a new user", () => {
    render(
      <CreateAndUpdateUserModal user={null} onClose={mockOnClose} onSave={mockOnSave} />
    );
    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/status/i) as HTMLInputElement).value).toBe("inactive");
  });

  it("calls onSave with correct data on form submission (edit user)", async () => {
    render(
      <CreateAndUpdateUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jane.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "inactive" } });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        id: "1",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        status: "inactive",
      });
    });
  });

  it("calls onSave with correct data on form submission (new user)", async () => {
    render(
      <CreateAndUpdateUserModal user={null} onClose={mockOnClose} onSave={mockOnSave} />
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "New User" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "new.user@example.com" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "active" } });

    fireEvent.click(screen.getByText("Add User"));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        id: "new",
        name: "New User",
        email: "new.user@example.com",
        status: "active",
      });
    });
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <CreateAndUpdateUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });  
});
