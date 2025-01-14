import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { IUser } from "../types/User";
import { deleteUserById, postUser, putUser } from "../service/user-service";

interface UserContextType {
  users: IUser[];
  selectedUser: IUser | null;
  isCreateAndUpdateUserModalOpen: boolean;
  isDeleteUserModalOpen: boolean;
  createUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  deleteUser: (id: number | null) => void;
  selectUser: (user: IUser | null) => void;
  openCreateAndUpdateUserModal: () => void;
  closeCreateAndUpdateUserModal: () => void;
  openDeleteUserModal: () => void;
  closeDeleteUserModal: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isCreateAndUpdateUserModalOpen, setIsCreateAndUpdateUserModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const API_URL = 'http://localhost:3001/users';

  const fetchUsers = async () => {
    try {
      const response = await axios.get<IUser[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // TODO: Future feature: et loading to false
    }
  };

  const createUser = async (user: Omit<IUser, 'id'>) => {
    try {
      const response = await postUser(user);
      setUsers(prevUsers => [...prevUsers, response]);
      closeCreateAndUpdateUserModal();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  

  const updateUser = async (user: IUser) => {
    if (!user.id) {
      console.error('User ID is missing. Cannot update user.');
      return;
    }
  
    try {
      const response = await putUser(user);
  
      setUsers(prevUsers =>
        prevUsers.map(u => (u.id === user.id ? response : u))
      );
  
      closeCreateAndUpdateUserModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  
  const deleteUser = async (id: number | null) => {
    try {
      if (!id) {
        console.error('User ID is missing. Cannot delete user.');
        return;
      }
      
      await deleteUserById(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const selectUser = (user: IUser | null) => {
    setSelectedUser(user);
  };

  const openCreateAndUpdateUserModal = () =>
    setIsCreateAndUpdateUserModalOpen(true);
  const closeCreateAndUpdateUserModal = () =>
    setIsCreateAndUpdateUserModalOpen(false);
  const openDeleteUserModal = () => setIsDeleteUserModalOpen(true);
  const closeDeleteUserModal = () => setIsDeleteUserModalOpen(false);

  useEffect(() => {
    fetchUsers(); 
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        isCreateAndUpdateUserModalOpen,
        isDeleteUserModalOpen: isDeleteModalOpen,
        createUser,
        updateUser,
        deleteUser,
        selectUser,
        openCreateAndUpdateUserModal,
        closeCreateAndUpdateUserModal,
        openDeleteUserModal,
        closeDeleteUserModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
