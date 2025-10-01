import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  console.log(`[Validating user]: Validating ${req.body.email}`);
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error);

    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

export default validateUser;
