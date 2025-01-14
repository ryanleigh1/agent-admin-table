import React, { useEffect, useRef } from "react";
import { IUser } from "../../types/User";

interface DeleteModalProps {
  user: IUser;
  onClose: () => void;
  onConfirmDeletion: (userId: number | null) => void;
}

const DeleteUserModal: React.FC<DeleteModalProps> = ({
  user,
  onClose,
  onConfirmDeletion: onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // Close the dialog when clicking outside
  const handleCancel = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      className="p-4 rounded-md"
      data-testid="delete-user-modal"
      ref={dialogRef}
      onClick={handleCancel}
    >
      <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
      <p className="text-md font-medium text-gray-800 my-4">
        Are you sure you want to delete <strong>{user.name}</strong>?
      </p>
      <section className="flex align-middle justify-end gap-2">
        <button
          className="relative max-h-8 rounded-md inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          data-testid="cancel-delete-button"
          onClick={() => {
            dialogRef.current?.close();
            onClose();
          }}
        >
          Cancel
        </button>
        <button
          className="relative max-h-8 rounded-md inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={() => onConfirm(user.id ?? null)}
        >
          Confirm
        </button>
      </section>
    </dialog>
  );
};

export default DeleteUserModal;
