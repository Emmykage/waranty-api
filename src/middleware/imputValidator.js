import Joi from "joi"

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required()
})


const validateUser = (req, res) => {
    const {error }= userSchema.validate(req.body)
    if(error) res.status(400).json({message: error.details[0].message})



    next(error)
}

export default validateUser