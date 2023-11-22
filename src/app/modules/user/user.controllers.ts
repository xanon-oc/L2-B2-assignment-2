import { Request, Response } from 'express';
import { userServices } from './user.services';

// create a user in the DB

const createAUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;

    const result = await userServices.createAUserInDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'User creation failed!',
      data: error,
    });
  }
};

// retrieve a list of all users

// retrieve a specific user by ID

// update a user information using id

// delete a user

export const userControllers = { createAUser };
