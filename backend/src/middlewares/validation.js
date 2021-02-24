/* eslint-disable import/extensions */
import Joi from 'joi';
import handleErrorsUtil from '../utils/error.util.js';

// eslint-disable-next-line import/prefer-default-export
export const validateListBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
    }),
    description: Joi.string().required().min(5).messages({
      'any.required': 'Description is required',
      'string.empty': 'Description is not allowed to be empty',
    }),
    priority: Joi.string()
      .valid('LOW', 'MEDIUM', 'HIGH')
      .required()
      .messages({
        'any.required': 'Priority is required',
        'string.empty': 'Priority is not allowed to be empty',
        'any.only': 'Priority must be one of [Low, Medium, High]',
      }),
  }).options({ abortEarly: false });

  return handleErrorsUtil(schema, req.body, res, next);
};

export const validateUpdateListBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5),
    description: Joi.string().min(10),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').messages({
      'any.only': 'Priority must be one of [Low, Medium, High]',
    }),
  }).options({ abortEarly: false });

  return handleErrorsUtil(schema, req.body, res, next);
};
