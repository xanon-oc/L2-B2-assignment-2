import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

// create a user in the DB

const createAUserInDB = async (userData: TUser) => {
  // checking if the user exists
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
  // checking if the user exists

  if (await User.isUserDoNotExists(id)) {
    throw new Error('User does not exist');
  }

  const user = await User.aggregate([
    { $match: { userId: id } },
    { $project: { password: 0, orders: 0, isDeleted: 0 } },
  ]);

  return user;
};

// update a user information using id

const updateAUserByID = async (id: number, updatedDoc: TUser) => {
  if (await User.isUserDoNotExists(id)) {
    throw new Error('User does not exist');
  }

  const result = await User.findOneAndUpdate({ userId: id }, updatedDoc, {
    new: true,
  });

  return result;
};

// delete a user

const deleteAUser = async (id: number) => {
  if (await User.isUserDoNotExists(id)) {
    throw new Error('User does not exist');
  }

  const result = await User.deleteOne({ userId: id });

  return result;
};

// adding New Product in Order

const addNewProductsToDB = async (id: number, newOrder: TOrders) => {
  const { productName, price, quantity } = newOrder;

  const user = await User.findOne({ userId: id });
  if (await User.isUserDoNotExists(id)) {
    // Handle the case where the user is not found
    throw new Error(`User with userId ${id} not found.`);
  }

  if (user.orders) {
    // If 'orders' property exists, append the new product
    user.orders.push({ productName, price, quantity });
  } else {
    // If 'orders' property doesn't exist, create it and add the order data
    user.orders = [{ productName, price, quantity }];
  }

  const result = await user.save();

  return result;
};

export const userServices = {
  createAUserInDB,
  retrieveAllUsersFromDB,
  retrieveASpecificUserByID,
  updateAUserByID,
  deleteAUser,
  addNewProductsToDB,
};
