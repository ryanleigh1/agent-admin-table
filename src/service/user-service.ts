import { IUser } from "../types/User";

const API_URL = "http://localhost:3001/users";

export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const postUser = async (user: Omit<IUser, 'id'>) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...user }),
  });
  const newUser = await response.json();
  return newUser;
};

export const putUser = async (user: IUser) => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUserById = async (userId: number) => {
  await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
};
