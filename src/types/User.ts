export interface IUser {
  id?:  number | null;
  name: string;
  email: string;
  status: UserStatus;
}

export type UserStatus = 'active' | 'inactive';