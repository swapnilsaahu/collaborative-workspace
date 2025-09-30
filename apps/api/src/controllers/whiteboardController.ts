import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma";
import { prisma } from "./userController";
import crypto from "node:crypto";


const createWhiteboard = async (req: Request, res: Response) => {
    try {
        const { userid, whiteboardName } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userid
            }
        })
        if (!user) {
            throw new Error("user doesnt exists");
        }
        const whiteboardCode = crypto.randomUUID();
        const whiteboard = await prisma.whiteboard.create({
            data: {
                name: whiteboardName,
                whiteboardCode: whiteboardCode,

            }
        })


        res.status(201).json({
            status: "success",
            message: "whiteboard created",
            whiteboardCode: whiteboardCode
        })

    } catch (error) {
        console.error("error while creating a whiteboard", error);
    }




}

const getAllWhiteboard = async (req: Request, res: Response) => {
    try {
        const { userid } = req.body;
        const user = await prisma.user.findUnique({
            where: userid
        })
        if (!user) {
            throw new Error("user doesnt exists");
        }

        const listOfWhiteBorads = await prisma.whiteboardUser.findMany({
            where: {
                userId: user.id
            },
            include: {
                whiteboard: true
            }
        })

        res.status(200).json({
            status: "success",
            message: "successfully fetched whiteboards",
            whtieboards: listOfWhiteBorads
        })
    } catch (error) {
        res.status(404)
        console.error("error while getting whiteboards")
    }
}
