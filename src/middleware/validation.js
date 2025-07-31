// middleware/validation.js
import Joi from 'joi';

export const serviceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
  date: Joi.date().iso(),
  participants: Joi.number().integer().min(0),
  image: Joi.string().uri().allow('')
});

export const validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};