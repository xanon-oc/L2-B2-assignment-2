import { TUser } from './user.interface';
import { UserModel } from './user.model';

// create a user in the DB

const createAUserInDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

// retrieve a list of all users

const retrieveAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// retrieve a specific user by ID

const retrieveASpecificUserByID = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

export const userServices = {
  createAUserInDB,
  retrieveAllUsersFromDB,
  retrieveASpecificUserByID,
};
