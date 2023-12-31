import { Request, Response } from 'express';
import { userServices } from './user.services';
import { zodValidation } from './user.zod.validation';

// create a user in the DB

const createAUser = async (req: Request, res: Response) => {
  try {
    //zod validation
    const userZodValidatedData = await zodValidation.zodUserValidation.parse(
      req.body,
    );
    const result = await userServices.createAUserInDB(userZodValidatedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User creation failed!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// retrieve a list of all users

const gatAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.retrieveAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to fetch all users!',
      error: {
        code: 404,
        description: 'Failed to fetch all users!',
      },
    });
  }
};

// retrieve a specific user by ID

const getAUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.retrieveASpecificUserByID(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// update a user information using id

const updateAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userZodValidatedData =
      await zodValidation.updateZodUserValidation.parse(req.body);
    const result = await userServices.updateAUserByID(
      Number(userId),
      userZodValidatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// delete a user

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await userServices.deleteAUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// add order in user

const addANewProductOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newOrder = req.body;

    const result = await userServices.addNewProductsToDB(
      Number(userId),
      newOrder,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// retrieve all orders for a specific user

const retrieveAllOrdersForASpecificUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const orders = await userServices.retrieveOrdersForASpecificUserDB(
      Number(userId),
    );
    res.json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// calculate Total Price of Orders for a Specific User

const calculateTotalPriceOfAUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.calculateTotalPriceOfOrdersOfAUserDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const userControllers = {
  createAUser,
  gatAllUsers,
  getAUserByID,
  updateAUser,
  deleteAUser,
  addANewProductOrder,
  retrieveAllOrdersForASpecificUser,
  calculateTotalPriceOfAUserOrder,
};
