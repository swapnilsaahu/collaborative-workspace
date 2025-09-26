import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const dataValidation = <T extends ZodSchema>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("control at dataValidation middleware")
            const validateData = schema.safeParse(req.body);
            if (!validateData.success) {
                return res.status(400).json({
                    error: "validation failed"
                })
            }
            req.body = validateData.data;
            next();
        } catch (error) {
            console.error("validation error", error);
            return res.status(500).json({
                error: "internal server error during validation"
            })
        }
    }
}

export { dataValidation };
