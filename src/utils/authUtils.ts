import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { appConfig } from "./appConfig";
import { AppExcption, UnauthorizedError } from "../models/exceptions";
import bcrypt from "bcrypt"

export function verifyToken(token: string, adminRequired: boolean = false) {
    if (!token) {
        throw new UnauthorizedError("Missing Credentials!")
    }
    try {
        const res = jwt.verify(token, appConfig.jwtSecrete) as { userWithoutPassword: UserModel };
        if (adminRequired && !res.userWithoutPassword.isAdmin) {
            throw new UnauthorizedError("Only admin user has access!");
        }
        return res.userWithoutPassword

    } catch (error) {
        if (error instanceof AppExcption) {
            throw error;
        }
        throw new UnauthorizedError("ERROR: Wrong Credentials!");
    }
}

export function createToken(user: UserModel): string {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    // const options = {expiresIn: "3h"};
    const options = {};
    const token = jwt.sign({ userWithoutPassword }, appConfig.jwtSecrete, options)

    return token;
}

export async function encryptPassword(password: string): Promise<string> {
    console.log(password);
    const epw = await bcrypt.hash(password, 10);
    console.log(epw);
    return epw
}

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> { 
    console.log(password);
    console.log(hashedPassword);    
    const res = await bcrypt.compare(String(password), hashedPassword);
    console.log(res);
    
    return res
}