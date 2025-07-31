import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import CredentialsModel from "../3-models/credentials-model";
import UserModel from "../3-models/user-model";

async function register(user: UserModel): Promise<string> {

    user.validate();

    // Check if the email is already taken
    if (await isEmailTaken(user.email)) throw new ValidationError("Email already taken");

    // Hash the user's password before storing it
    user.password = cyber.hashPassword(user.password);

    // Insert user data into the database
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

    user.userId = info.insertId;

    // Generate a new authentication token for the user
    const token = cyber.getNewToken(user);
    
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    // Validate user credentials
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // Hash the user's password for comparison
    credentials.password = cyber.hashPassword(credentials.password);
    
    // Check if a user with provided credentials exists in the database
    const sql = `SELECT * FROM users WHERE email = ? AND password_hash = ?`;
    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    // If no matching user is found, throw an UnauthorizedError
    if (users.length === 0) throw new UnauthorizedError("Incorrect email or password");

    const user = users[0];

    // Generate a new authentication token for the user
    const token = cyber.getNewToken(user);

    return token;
}

// Check if an email is already registered in the system
async function isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
    const result = await dal.execute(sql);
    const count = result[0].count;

    return count > 0;
}

export default {
    register,
    login
}
