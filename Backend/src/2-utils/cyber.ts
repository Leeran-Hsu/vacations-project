import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import UserModel from "../3-models/user-model";

// Secret key for JWT
const tokenSecretKey = "Leeran-Hsu";

// Generate a new JWT token for the given user
function getNewToken(user: UserModel): string {
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, tokenSecretKey, options);
    return token;
}

// Verify the validity of a JWT token
function verifyToken(token: string): void {
    if (!token) throw new UnauthorizedError("You have to be logged in.");
    try {
        jwt.verify(token, tokenSecretKey);
    } catch (err: any) {
        throw new UnauthorizedError(err.message);
    }
}

// Verify if the user has admin privileges based on the JWT token
function verifyAdmin(token: string): void {
    verifyToken(token);
    const container = jwt.verify(token, tokenSecretKey) as { user: UserModel };
    const user = container.user;
    if (user.roleId !== 1) throw new ForbiddenError("You are not admin.");
}

// Salt for password hashing
const salt = "d#s6kE2!loRqaX^v";

// Hash a plain password using SHA-512 and a salt
function hashPassword(plainPassword: string): string {
    const hashedPassword = crypto.createHmac("sha512", salt).update(plainPassword).digest('hex');
    return hashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hashPassword
}
