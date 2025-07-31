import Joi from "joi";

class CredentialsModel {
    public email: string;
    public password: string;

    // Constructor to initialize credentials with an object
    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // Validation schema using Joi for email and password
    private static validationScheme = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } }) 
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
    });

    // Validate the current instance of the CredentialsModel
    public validate(): string {
        const authorizationResult = CredentialsModel.validationScheme.validate(this);
        return authorizationResult.error?.message;
    }
}

export default CredentialsModel;
