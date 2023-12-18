import mongoose from 'mongoose';
import Joi from 'joi';
import { schemaOptionsWithTimestamp } from '../utils/schemaOptions.js';

export const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'Teacher' },
        status: { type: String, default: 'active' },
    },
    schemaOptionsWithTimestamp
);

export const validationUserSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3),
    role: Joi.string().pattern(/^Teacher|Admin|Student$/),
    status: Joi.string().pattern(/^active|inactive$/),
});
