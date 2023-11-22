import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

router.post('/', userControllers.createAUser);
router.get('/', userControllers.gatAllUsers);
router.get('/:userId', userControllers.getAUserByID);

export const userRouter = router;
