import { z } from 'zod';

const zodUserFullName = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const zodAddress = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const zodOrders = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const zodUserValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: zodUserFullName,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: zodAddress,
  orders: z.array(zodOrders).optional(),
  isDeleted: z.boolean().default(false),
});

export default zodUserValidation;
