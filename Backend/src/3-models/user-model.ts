import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {
    // Properties for user details
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    // Constructor to initialize user properties with an object
    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Validation schema using Joi for user properties
    private static validationScheme = Joi.object({
        userId: Joi.number()
            .optional()
            .integer()
            .positive()
            .messages({
                'number.base': 'User ID must be a number',
                'number.integer': 'User ID must be an integer',
                'number.positive': 'User ID must be a positive number',
            }),
        firstName: Joi.string()
            .required()
            .min(2)
            .max(25)
            .messages({
                'string.base': 'First Name must be a string',
                'string.empty': 'First Name is required',
                'string.min': 'First Name must be at least 2 characters long',
                'string.max': 'First Name cannot be longer than 25 characters',
            }),
        lastName: Joi.string()
            .required()
            .min(2)
            .max(25)
            .messages({
                'string.base': 'Last Name must be a string',
                'string.empty': 'Last Name is required',
                'string.min': 'Last Name must be at least 2 characters long',
                'string.max': 'Last Name cannot be longer than 25 characters',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please insert a valid email address',
                'any.required': 'Email is required',
            }),
        password: Joi.string()
            .required()
            .min(4)
            .max(30)
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 4 characters long',
                'string.max': 'Password cannot be longer than 30 characters',
            }),
        roleId: Joi.number()
            .required()
            .integer()
            .positive()
            .messages({
                'number.base': 'Role ID must be a number',
                'number.integer': 'Role ID must be an integer',
                'number.positive': 'Role ID must be a positive number',
            }),
    });

    // Validate the current instance of the UserModel
    public validate(): void {
        const validationResult = UserModel.validationScheme.validate(this);
        // If validation fails, throw a ValidationError with the error message
        if (validationResult.error?.message) throw new ValidationError(validationResult.error.message);
    }
}

export default UserModel;
