import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    // Handles form submission and attempts to log in the user
    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("You have been logged in successfully");
            navigate("/list");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>
                {/* Email input field with validation and error message */}
                <label>Email:</label>
                <input type="email" {...register("email", CredentialsModel.emailValidation)}/>
                <span className="Error">{formState.errors.email?.message}</span>

                {/* Password input field with validation and error message */}
                <label>Password:</label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)}/>
                <span className="Error">{formState.errors.password?.message}</span>

                <button>Login</button>

                <p>Don't have an account yet? <NavLink to="/register">create one</NavLink></p>
            </form>
        </div>
    );
}

export default Login;
