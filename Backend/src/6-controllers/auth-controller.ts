import express, { NextFunction, Request, Response } from "express";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
import StatusCode from "../3-models/status-code";
import CredentialsModel from "../3-models/credentials-model";

const router = express.Router();

// Route for user registration
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create a UserModel instance from the request body
        const user = new UserModel(request.body);

        // Register the user and get the authentication token
        const token = await authService.register(user);

        response.status(StatusCode.Created).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// Route for user login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create a CredentialsModel instance from the request body
        const credentials = new CredentialsModel(request.body);

        // Log in the user and get the authentication token
        const token = await authService.login(credentials);

        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
