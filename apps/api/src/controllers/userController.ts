import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import * as argon2 from "argon2";
import { error } from "console";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { connect } from "http2";
import { UserSchema, type User, SignupRequestSchema, type Signup, JwtPayloadSchema, type JwtPayloadType } from "@pnpmworkspace/types";
const prisma = new PrismaClient();
const secretKey = process.env.ACCESS_TOKEN_SECRET || "default key";



const generateAccessToken = (userId: string, name: string): string => {
    const token: string = jwt.sign({
        user_id: userId,
        name: name,
        iat: Date.now(),
    }, secretKey, {
        expiresIn: 60 * 15,
        jwtid: uuidv4(),
    })

    return token;
}

const generateRefreshToken = (userId: string, jwtid: string, userAgent: string): string => {

    const token: string = jwt.sign({
        user_id: userId,
        device_info: userAgent,
        iat: Date.now()
    }, secretKey, {
        expiresIn: '30d',
        jwtid: jwtid,
    })
    return token;

}
const signupUser = async (req: Request, res: Response) => {

    try {
        console.log(req.body);
        const { email, password, name }: Signup = req.body;
        const doesEmailExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (doesEmailExists) {
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

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password }: Signup = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            throw error("invalid credentials");
        }

        if (!await argon2.verify(user.password, password)) {
            throw error("Invalid password");
        }

        const userAgent = req.headers["user-agent"] || "default details";
        console.log(userAgent);
        //token generation
        const accessToken: string = generateAccessToken(user.id, user.name);
        const jwtid: string = uuidv4();
        const refreshToken: string = generateRefreshToken(user.id, jwtid, userAgent);


        //token save and res
        const saveRefreshDb = await prisma.refreshTokens.create({
            data: {
                jti: jwtid,
                expiresAt: Math.floor((Date.now() / 1000) + (60 * 60 * 24 * 30)),
                issuedAt: Date.now(),
                deviceInfo: userAgent,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        if (saveRefreshDb) {
            res.cookie("refresh_token", refreshToken, {
                sameSite: "lax",
                httpOnly: true,
                secure: false
            })

            res.status(201).json({
                message: "success",
                user: user.name,
                email: user.email,
                token: accessToken,
            })
        }

    } catch (error) {
        console.error("error while logging in the user", error);
        res.status(401).json({ message: error })
    }
}


export { signupUser, loginUser, prisma };
