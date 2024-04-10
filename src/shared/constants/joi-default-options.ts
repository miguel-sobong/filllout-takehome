import Joi from 'joi';

export const joiDefaultOptions: Joi.ValidationOptions = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};
