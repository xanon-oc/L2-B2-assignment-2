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
  const resultWithoutPassword = await User.findById(result._id).select({
    password: 0,
  });

  return resultWithoutPassword;
};

// retrieve a list of all users

const retrieveAllUsersFromDB = async () => {
  const result = await User.aggregate(
    // pipeline 1
    [
      // step 1
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
    ],
  );
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

const updateAUserByID = async (id: number, updatedDoc: Partial<TUser>) => {
  if (await User.isUserDoNotExists(id)) {
    throw new Error('User does not exist');
  }

  const result = await User.findOneAndUpdate({ userId: id }, updatedDoc, {
    new: true,
  }).select({ password: 0 });

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
  if (await User.isUserDoNotExists(id)) {
    throw new Error(`User with userId ${id} not found.`);
  }

  let user = await User.findOne({ userId: id });

  if (!user) {
    throw new Error(`User with userId ${id} not found.`);
  }

  if (user.orders) {
    // If orders property exists then it will append the new product
    user.orders.push({ productName, price, quantity });
  } else {
    // If orders property doesn't exist then it will create it and add the order data
    user.orders = [{ productName, price, quantity }];
  }

  const result = await user.save();

  return result;
};

// retrieve all orders for a specific user

const retrieveOrdersForASpecificUserDB = async (id: number) => {
  if (await User.isUserDoNotExists(id)) {
    throw new Error(`User with userId ${id} not found.`);
  }
  const result = await User.aggregate([
    { $match: { userId: id } },
    { $project: { _id: 0, orders: 1 } },
  ]);

  const orders = result[0];

  return orders;
};

// calculate Total Price of Orders for a Specific User

const calculateTotalPriceOfOrdersOfAUserDB = async (id: number) => {
  if (await User.isUserDoNotExists(id)) {
    throw new Error(`User with userId ${id} not found.`);
  }
  const result = await User.aggregate([
    { $match: { userId: id } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0, totalPrice: 1 } },
  ]);

  const totalPrice = result[0].totalPrice;

  return totalPrice;
};

export const userServices = {
  createAUserInDB,
  retrieveAllUsersFromDB,
  retrieveASpecificUserByID,
  updateAUserByID,
  deleteAUser,
  addNewProductsToDB,
  retrieveOrdersForASpecificUserDB,
  calculateTotalPriceOfOrdersOfAUserDB,
};
