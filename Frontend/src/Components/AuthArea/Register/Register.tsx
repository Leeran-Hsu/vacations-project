import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import "./Register.css";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    // Handles form submission and attempts to register the user
    async function send(user: UserModel) {
        try {
            // Call the authService to perform user registration
            await authService.register(user);
            notifyService.success("You have been successfully registered");
            navigate("/list");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

			<h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>
                {/* First Name input field with validation and error message */}
                <label>First Name:</label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)}/>
                <span className="Error">{formState.errors.firstName?.message}</span>

                {/* Last Name input field with validation and error message */}
                <label>Last Name:</label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)}/>
                <span className="Error">{formState.errors.lastName?.message}</span>

                {/* Email input field with validation and error message */}
                <label>Email:</label>
                <input type="email" {...register("email", UserModel.emailValidation)}/>
                <span className="Error">{formState.errors.email?.message}</span>

                {/* Password input field with validation and error message */}
                <label>Password:</label>
                <input type="password" {...register("password", UserModel.passwordValidation)}/>
                <span className="Error">{formState.errors.password?.message}</span>

                <button>Register</button>

                <p>Already a member? <NavLink to="/login">login</NavLink></p>
            </form>
        </div>
    );
}

export default Register;
