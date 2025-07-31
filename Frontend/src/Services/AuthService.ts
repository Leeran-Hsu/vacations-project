import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {
    // Register a new user
    public async register(user: UserModel): Promise<void> {

        user.roleId = 2;

        const response = await axios.post<string>(appConfig.registerUrl, user);

        const token = response.data;

        const action: AuthAction = { type: AuthActionType.Register, payload: token };

        authStore.dispatch(action);
    }

    // Log in a user with provided credentials
    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        const token = response.data;

        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // Log out the current user
    public logout(): void {
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;
