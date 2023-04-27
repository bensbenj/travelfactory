import Joi from "joi";

export const userSchema = Joi.object({
  id: Joi.string().id(),
  firstname: Joi.string().min(2).max(50),
  lastname: Joi.string().min(2).max(50),
  phone: Joi.string()
    .pattern(/^(\+972|0)([ \-_/]*)(\d[ \-_/]*){9}$/)
    .required(),
  picture: Joi.string(),
  address: Joi.string().min(10).max(100),
  job: Joi.string().min(2).max(50),
  workAdress: Joi.string().min(2).max(50),
  company: Joi.string().min(2).max(50),
});
