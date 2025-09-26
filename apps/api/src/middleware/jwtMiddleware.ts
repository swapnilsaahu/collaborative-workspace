import jwt, { Secret } from "jsonwebtoken";
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { error } from "console";
const envToken: Secret = process.env.ACCESS_TOKEN_SECRET || "default token";

const jwtValidation = <T extends ZodSchema>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authoriztion")?.replace("Bearer ", "");
            if (!token) {
                throw new Error("error token not found");
            }
            const decodedToken = jwt.verify(token, envToken);

            if (!decodedToken) {
                return res.status(400).json({
                    error: "authentication failed"
                })
            }
            const jwtPayload = schema.safeParse(decodedToken);
            req.body = jwtPayload.data;
            next();
        } catch (error) {
            console.error("auth error", error);
            return res.status(500).json({
                error: "internal server error during validation"
            })
        }
    }
}

export { jwtValidation };
