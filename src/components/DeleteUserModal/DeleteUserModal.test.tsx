/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteUserModal from "./DeleteUserModal";
import { IUser } from "../../types/User";

describe("DeleteUserModal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test("calls onConfirmDeletion when confirming deletion", async () => {
    const mockOnClose = jest.fn();
    const mockOnConfirmDeletion = jest.fn();
    const user: IUser = {
      id: 123,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
    };

    const { container } = render(
      <DeleteUserModal
        user={user}
        onClose={mockOnClose}
        onConfirmDeletion={mockOnConfirmDeletion}
      />
    );

    // testing dialogs can be tricky, so I need to use a container method instead of getByRole
    const dialogElement = container.querySelector("dialog");
    dialogElement?.showModal();

    await screen.findByText((content, element) => {
      return content.includes("Are you sure you want to delete");
    });

    fireEvent.click(screen.getByText("Confirm"));

    // Expect the onConfirmDeletion function to be called with the correct user ID
    expect(mockOnConfirmDeletion).toHaveBeenCalledWith(user.id);
  });

  test("calls onClose when clicking Cancel", async () => {
    const mockOnClose = jest.fn();
    const mockOnConfirmDeletion = jest.fn();
    const user: IUser = {
      id: 123,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
    };

    const { container } = render(
      <DeleteUserModal
        user={user}
        onClose={mockOnClose}
        onConfirmDeletion={mockOnConfirmDeletion}
      />
    );

    /// testing dialogs can be tricky, so I need to use a container method instead of getByRole
    const dialogElement = container.querySelector("dialog");
    dialogElement?.showModal();

    // Simulate clicking on the "Cancel" button
    fireEvent.click(screen.getByText("Cancel"));

    // Expect the onClose function to be called
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnConfirmDeletion).not.toHaveBeenCalled();
  });
});
