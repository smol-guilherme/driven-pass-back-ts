import Joi from "joi";

export const registrySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
  repeatPassword: Joi.ref('password'),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
});

export const credentialsSchema = Joi.object({
  url: Joi.string().required(), 
  title: Joi.string().required(), 
  username: Joi.string().required(), 
  password: Joi.string().min(10).required() 
});

export const notesSchema = Joi.object({
  title: Joi.string().max(50).required(), 
  description: Joi.string().max(1000).required() 
});

export const cardSchema = Joi.object({
  title: Joi.string().max(50).required(), 
  cardholderName: Joi.string().pattern(/[A-Z]{2,}\W[A-Z]+\W[A-Z]{2,}/).required(),
  number: Joi.string().pattern(/[0-9]{4}-{1}[0-9]{4}-{1}[0-9]{4}-{1}[0-9]{4}/).required(), 
  expirationDate: Joi.string().pattern(/(^0[1-9]|^1[0-2])\/[0-9]{2}/).required(), 
  password: Joi.string().pattern(/[0-9]{4}/).required(), 
  CVV: Joi.string().pattern(/[0-9]{3}/).required(), 
  type: Joi.string().valid('credit', 'debit', 'full').required(),
  description: Joi.string().max(1000).required() 
});

export const wifiSchema = Joi.object({
  name: Joi.string().required(), 
  title: Joi.string().required(), 
  password: Joi.string().required() 
});