import { TUser } from './user.interface';
import { User } from './user.model';

// create a user in the DB

const createAUserInDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already Exists');
  } else if (await User.isEmailExists(userData.username)) {
    throw new Error('Username already Exists');
  }
  const result = await User.create(userData);
  // deleting the password before sending it to frontend
  const userFilteredData = result.toObject();
  delete userFilteredData.password;
  return userFilteredData;
};

// retrieve a list of all users

const retrieveAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// retrieve a specific user by ID

const retrieveASpecificUserByID = async (id: number) => {
  const result = await User.aggregate([
    { $match: { userId: id } },
    { $project: { password: 0, orders: 0, isDeleted: 0 } },
  ]);
  return result;
};

// update a user information using id

const updateAUserByID = async (id: number, updatedDoc: TUser) => {
  const result = await User.updateOne({ userId: id }, { $set: { updatedDoc } });
  return result;
};

// delete a user

const deleteUpdateAUser = async (id: number) => {
  const result = await User.updateOne({ userId: id }, { isDeleted: true });

  return result;
};

export const userServices = {
  createAUserInDB,
  retrieveAllUsersFromDB,
  retrieveASpecificUserByID,
  updateAUserByID,
  deleteUpdateAUser,
};
