import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma";
import { prisma } from "./userController";
import crypto from "node:crypto";


export const createWhiteboard = async (req: Request, res: Response) => {
    try {
        // const { userid, roomname } = req.body;
        const { roomname } = req.body;
        /*
        const user = await prisma.user.findUnique({
            where: {
                id: userid
            }
        })
        if (!user) {
            throw new Error("user doesnt exists");
        }*/
        const whiteboardCode = crypto.randomUUID();


        const whiteboard = await prisma.whiteboard.create({
            data: {
                name: roomname,
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

export const getAllWhiteboard = async (req: Request, res: Response) => {
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

export const fetchYdocFromDB = async (roomId: string) => {
    try {
        if (!roomId) {
            return;
        }
        const encodedYdoc = await prisma.whiteboard.findUnique({
            where: {
                whiteboardCode: roomId
            },
            select: {
                ydocEncoded: true
            }
        })
        if (encodedYdoc) {
            return encodedYdoc;
        }
    } catch (error) {
        console.error("error while fetching ydoc");
    }
}

export const saveYdocToDB = async (roomId: string, state: Uint8Array) => {
    try {
        if (!roomId) return;
        const isSaved = await prisma.whiteboard.update({
            where: {
                whiteboardCode: roomId
            },
            data: {
                ydocEncoded: state
            }
        })

        if (isSaved) {
            return true;
        }

    } catch (error) {
        console.error("error while saving the doc")
    }

}
