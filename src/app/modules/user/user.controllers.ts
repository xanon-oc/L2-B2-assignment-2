import { Request, Response } from 'express';
import { userServices } from './user.services';
import zodUserValidation from './user.zod.validation';

// create a user in the DB

const createAUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;
    //zod validation
    const userZodValidatedData = await zodUserValidation.parse(userData);
    const result = await userServices.createAUserInDB(userZodValidatedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: 'User creation failed!',
      data: error.message,
    });
  }
};

// retrieve a list of all users

// retrieve a specific user by ID

// update a user information using id

// delete a user

export const userControllers = { createAUser };
