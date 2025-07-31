import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

function verifyUser(request: Request, response: Response, next: NextFunction): void {
    // Extract the token from the authorization header
    const token = request.header("authorization")?.substring(7);

    // Use cyber utility to verify the user's token
    cyber.verifyToken(token);

    next();
}

export default verifyUser;
