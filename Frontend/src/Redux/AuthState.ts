import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

// Global state:
export class AuthState {
    roleId: any;
    static token(token: any) {
        throw new Error("Method not implemented.");
    }
    public token: string = null;
    public user: UserModel = null;
    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            this.user = jwtDecode<{user: UserModel}>(this.token).user;
        }
    }
}

// Action type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// Action:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// Reducer:
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = {...currentState};

    switch(action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            localStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
}

// Store:
export const authStore = createStore(authReducer);