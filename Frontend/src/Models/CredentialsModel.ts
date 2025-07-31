class CredentialsModel {
    public email: string;
    public password: string;

    // Validation rules for email
    public static emailValidation = {
        required: { value: true, message: "Email is required" },
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
    };

    // Validation rules for password
    public static passwordValidation = {
        required: { value: true, message: "Password is required" },
        minLength: { value: 4, message: "Password must be at least 4 characters long" },
        maxLength: { value: 30, message: "Password cannot exceed 30 characters" },
    };
}

export default CredentialsModel;
