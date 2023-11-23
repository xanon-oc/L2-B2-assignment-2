import { Model } from 'mongoose';

export type TUserNameFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserNameFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  isEmailExists(username: string): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  isUserDoNotExists(id: number): Promise<TUser | null>;
}
