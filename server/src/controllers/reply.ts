import { prisma } from "../../index";
import { Request, Response } from "express";

export const createReply = async (req: Request, res: Response) => {
  const { user, content, witId } = req.body;

  try {
    const newReply = await prisma.reply.create({
      data: {
        content,
        user: {
          connect: {
            username: user.user.username,
          },
        },
        wit: {
          connect: {
            id: witId,
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
            picture: true,
          },
        },
      },
    });
    res.status(201).json(newReply);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};
