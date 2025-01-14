import './App.css';
import Table from './components/Table/Table';
import { IUser } from './types/User';
import CreateAndUpdateUserModal from './components/CreateAndUpdateUserModal/CreateAndUpdateUserModal';
import DeleteUserModal from './components/DeleteUserModal/DeleteUserModal';
import { useUserContext } from './context/UserContext';

function App() {
  const {
    selectedUser,
    isCreateAndUpdateUserModalOpen,
    isDeleteUserModalOpen,
    selectUser,
    openCreateAndUpdateUserModal,
    closeCreateAndUpdateUserModal,
    openDeleteUserModal,
    closeDeleteUserModal,
    createUser,
    updateUser,
    deleteUser,
  } = useUserContext();

  const confirmDeleteUser = (userId: number | null) => {
    deleteUser(userId);
    closeDeleteUserModal();
  };

  /**
   * when no user is selected, it means we are adding a new user
   */
  const handleCreateUser = () => {
    selectUser(null);
    openCreateAndUpdateUserModal();
  };

  const handleDeleteUser = (user: IUser) => {
    selectUser(user);
    openDeleteUserModal();
  };

  /**
   * when a user is selected, it means we are editing an existing user
   * @param user
   */
  const handleEditUser = (user: IUser) => {
    selectUser(user);
    openCreateAndUpdateUserModal();
  };

  const handleSaveUser = (user: IUser) => {
    if (user.id === undefined) {
      // Omit the `id` before passing to createUser
      const { id, ...newUser } = user;
      createUser(newUser);
    } else {
      updateUser(user);
    }
  };
  

  return (
    <div className="App rounded-md min-h-screen bg-gray-100 text-gray-900">
      <div>
        <Table onCreateUserClick={handleCreateUser} onDeleteUserClick={handleDeleteUser} onEditUserClick={handleEditUser}/>

        {isCreateAndUpdateUserModalOpen && (
          <CreateAndUpdateUserModal
            user={selectedUser}
            onClose={closeCreateAndUpdateUserModal}
            onSave={handleSaveUser}
          />
        )}

      {isDeleteUserModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={closeDeleteUserModal}
          onConfirmDeletion={confirmDeleteUser}
        />
      )}
      </div>
    </div>
  );
}

export default App;
