import { z } from 'zod';

const zodUserFullName = z.object({
  firstName: z.string().min(1, { message: 'First name must not be empty' }),
  lastName: z.string().min(1, { message: 'Last name must not be empty' }),
});

const zodAddress = z.object({
  street: z.string().min(1, { message: 'Street must not be empty' }),
  city: z.string().min(1, { message: 'City must not be empty' }),
  country: z.string().min(1, { message: 'Country must not be empty' }),
});

const zodOrders = z.object({
  productName: z.string().min(1, { message: 'Product name must not be empty' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const zodUserValidation = z.object({
  userId: z.number().int({ message: 'User ID must be an integer' }),
  username: z.string().min(1, { message: 'Username must not be empty' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  fullName: zodUserFullName,
  age: z.number().min(0, { message: 'Age must be a non-negative number' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1, { message: 'Hobby must not be empty' })),
  address: zodAddress,
  orders: z.array(zodOrders).optional(),
  isDeleted: z.boolean().default(false),
});

// update

const updateZodUserFullName = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must not be empty' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must not be empty' })
    .optional(),
});
const updateZodAddress = z.object({
  street: z.string().min(1, { message: 'Street must not be empty' }).optional(),
  city: z.string().min(1, { message: 'City must not be empty' }).optional(),
  country: z
    .string()
    .min(1, { message: 'Country must not be empty' })
    .optional(),
});

const updateZodOrders = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name must not be empty' })
    .optional(),
  price: z
    .number()
    .min(0, { message: 'Price must be a positive number' })
    .optional(),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .optional(),
});
const updateZodUserValidation = z.object({
  userId: z.number().int({ message: 'User ID must be an integer' }).optional(),
  username: z
    .string()
    .min(1, { message: 'Username must not be empty' })
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
  fullName: zodUserFullName.optional(),
  age: z
    .number()
    .min(0, { message: 'Age must be a non-negative number' })
    .optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z
    .array(z.string().min(1, { message: 'Hobby must not be empty' }))
    .optional(),
  address: zodAddress.optional(),
  orders: z.array(zodOrders).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const zodValidation = { zodUserValidation, updateZodUserValidation };
