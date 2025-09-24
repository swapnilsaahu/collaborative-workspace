import express, { Request, Response } from "express"
//import logger from "@pnpmworkspace/logger"
import { PrismaClient } from "../generated/prisma"
import * as argon2 from "argon2";

const prisma = new PrismaClient();


interface SignupRequest {
    email: string,
    password: string,
    name: string
}

interface User {
    email: string,
    password: string,
    name: string

}

const signupUser = async (req: Request, res: Response) => {

    try {
        const { email, password, name }: SignupRequest = req.body;
        const doesEmailExists = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            }
        })

        const hashPassword = await argon2.hash(password);

        const user: User = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                name: name
            }
        })

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: {
                user: {
                    name: name,
                    email: email
                }
            }
        })
    } catch (error) {

        console.error("error while signingup", error)
    }
}

export { signupUser };
