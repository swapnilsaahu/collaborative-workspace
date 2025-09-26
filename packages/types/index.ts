import z from "zod"
const SignupRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string()
})

const UserSchema = z.object({
    email: z.string,
    password: z.string,
    name: z.string
})

const JwtPayloadSchema = z.object({
    token: z.string(),
    userId: z.string(),
    name: z.string(),
    jwtId: z.string(),
    iat: z.number(),
    ipAddress: z.string(),
    deviceInfo: z.string(),
    issuedAt: z.number(),
    expiresIn: z.number(),
})

type User = z.infer<typeof UserSchema>;
type Signup = z.infer<typeof SignupRequestSchema>;
type JwtPayloadType = z.infer<typeof JwtPayloadSchema>

export { UserSchema, type User, SignupRequestSchema, type Signup, JwtPayloadSchema, type JwtPayloadType }
