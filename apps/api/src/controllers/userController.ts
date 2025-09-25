import express, { Request, Response } from "express"
//import logger from "@pnpmworkspace/logger"
import { PrismaClient } from "../generated/prisma"
import * as argon2 from "argon2";
import { error } from "console";
import jwt, { Jwt } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { connect } from "http2";
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

interface JwtPayload {
    userId: string,
    name: string,
    jwtId: string,
    iat: number,
    ipAddress: string,
    deviceInfo: string,
    issuedAt: number,
    expiresIn: number,
}



const SECRET_KEY = "jhiusdhfuih79y3hbsddifasb7923rindnf79us792345uihdfs";

const generateAccessToken = (userId: number, name: string): string => {

    const token: string = jwt.sign({
        user_id: userId,
        name: name,
        iat: Date.now()
    }, SECRET_KEY, {
        expiresIn: 60 * 15,
        jwtid: uuidv4(),
    })
    return token;
}

const generateRefreshToken = (userId: number, jwtPayload: JwtPayload, req: Request): string => {

    const userAgent = req.headers["user-agent"];
    console.log(userAgent);
    const token: string = jwt.sign({
        user_id: userId,
        ip_address: req.ip,
        device_info: userAgent,
        iat: Date.now()
    }, SECRET_KEY, {
        expiresIn: '30d',
        jwtid: jwtPayload.jwtId,
    })
    return token;

}
const signupUser = async (req: Request, res: Response) => {

    try {
        console.log(req.body);
        const { email, password, name }: SignupRequest = req.body;
        const doesEmailExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!doesEmailExists) {
            throw error("user already exists");
        }
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

const loginUser = async (req: Request, res: Response, jwtPayload: JwtPayload) => {
    try {
        const { email, name, inputPassword } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            throw error("invalid credentials");
        }

        if (!await argon2.verify(user.password, inputPassword)) {
            throw error("Invalid password");
        }

        //token generation
        const accessToken: string = generateAccessToken(user.id, user.name);
        const refreshToken: string = generateRefreshToken(user.id, jwtPayload, req);

        //token save and res
        const saveRefreshDb = await prisma.refreshTokens.create({
            data: {
                jti: jwtPayload.jwtId,
                expiresAt: jwtPayload.expiresIn,
                issuedAt: jwtPayload.iat,
                ipAddress: jwtPayload.ipAddress,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        if (saveRefreshDb) {
            res.status(201).json({
                message: "success",
                user: user.name,
                email: user.email,
                token: accessToken,
            })
            res.cookie("refresh_token", refreshToken, {
                sameSite: "lax",
                httpOnly: true,
                secure: false
            })
        }

    } catch (error) {
        console.error("error while logging in the user", error);
        res.status(401).json({ message: error })
    }
}


export { signupUser, loginUser };
