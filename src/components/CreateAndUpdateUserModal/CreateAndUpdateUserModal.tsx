import { useEffect, useRef, useState } from "react";
import { IUser, UserStatus } from "../../types/User";

interface CreateAndUpdateUserModalProps {
  user?: IUser | null;
  onClose: () => void;
  onSave: (updatedUser: IUser) => void;
}

const CreateAndUpdateUserModal = ({
  user,
  onClose,
  onSave,
}: CreateAndUpdateUserModalProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [status, setStatus] = useState<UserStatus>(user?.status || "inactive");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: IUser = {
      id: user?.id || undefined,
      name,
      email,
      status,
    };
    onSave(userData);
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog className="p-4 rounded-md" ref={dialogRef} onClick={handleCancel}>
      <h3 className="mb-1 text-xl font-semibold text-gray-800">
        {user ? "Edit User" : "Add New User"}
      </h3>
      <form
        className="flex flex-col gap-0.5"
        onSubmit={handleSubmit}
        method="dialog"
      >
        <label className="flex flex-col">
          Name:
          <input
            className="mt-1 block min-w-[240px] text-md font-medium rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter name..."
          />
        </label>
        <br />
        <label className="flex flex-col">
          Email:
          <input
            className="mt-1 block min-w-[240px] text-md font-medium rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email..."
          />
        </label>
        <br />
        <label className="flex flex-col">
          Status:
          <select
            className="mt-1 block min-w-[240px] text-md font-medium rounded-md border-gray-300 shadow-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br />
        <section className="flex align-middle justify-end gap-2">
          <button
            className="relative max-h-8 rounded-md inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              onClose();
            }}
          >
            Cancel
          </button>
          <button 
            className="relative max-h-8 rounded-md inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            data-testid="submit-btn" 
            type="submit"
          >
            {user ? "Save Changes" : "Add User"}
          </button>
        </section>
      </form>
    </dialog>
  );
};

export default CreateAndUpdateUserModal;
