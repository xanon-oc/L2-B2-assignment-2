import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

router.post('/', userControllers.createAUser);
router.get('/', userControllers.gatAllUsers);
router.get('/:userId', userControllers.getAUserByID);
router.put('/:userId', userControllers.updateAUser);
router.delete('/:userId', userControllers.deleteAUser);
router.put('/:userId/orders', userControllers.addANewProductOrder);
router.put('/:userId/orders', userControllers.addANewProductOrder);
router.get(
  '/:userId/orders',
  userControllers.retrieveAllOrdersForASpecificUser,
);
router.get(
  '/:userId/orders/total-price',
  userControllers.calculateTotalPriceOfAUserOrder,
);

export const userRouter = router;
