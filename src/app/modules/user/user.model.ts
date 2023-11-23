import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrders,
  TUser,
  TUserNameFullName,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import config from '../../../config';
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

const UserSchema = new Schema<TUser, UserModel>({
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

// middlewares password hashing
UserSchema.pre('save', async function (next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

// checking if the user exists
UserSchema.statics.isUserExists = async function (id: number) {
  const existedUser = await User.findOne({ userId: id });
  return existedUser;
};
UserSchema.statics.isEmailExists = async function (username: string) {
  const existedUsername = await User.findOne({ username });
  return existedUsername;
};
UserSchema.statics.isUserDoNotExists = async function (id: number) {
  const existedUser = await User.findOne({ userId: id });
  return existedUser === null;
};

export const User = model<TUser, UserModel>('Users', UserSchema);
