import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserNameFullName } from './user.interface';

const fullNameSchema = new Schema<TUserNameFullName>({
  firstName: { type: String },
  lastName: { type: String },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const UserSchema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: [ordersSchema],
  isDeleted: { type: Boolean },
});

export const UserModel = model<TUser>('Users', UserSchema);
