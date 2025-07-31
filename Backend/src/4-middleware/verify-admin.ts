import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

function verifyAdmin(request: Request, response: Response, next: NextFunction): void {
    // Extract the token from the authorization header
    const token = request.header("authorization")?.substring(7);

    // Use cyber utility to verify admin privileges
    cyber.verifyAdmin(token);

    next();
}

export default verifyAdmin;
