class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    // Validation rules for first name
    public static firstNameValidation = {
        required: { value: true, message: "First name is required" },
        minLength: { value: 2, message: "First name must be at least 2 characters long" },
        maxLength: { value: 25, message: "First name cannot exceed 25 characters" },
    };

    // Validation rules for last name
    public static lastNameValidation = {
        required: { value: true, message: "Last name is required" },
        minLength: { value: 2, message: "Last name must be at least 2 characters long" },
        maxLength: { value: 25, message: "Last name cannot exceed 25 characters" },
    };

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

export default UserModel;
