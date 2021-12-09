import { prisma } from "../../index";
import { Request, Response } from "express";

export const makeComment = async (req: Request, res: Response) => {
  const { user, content, witId } = req.body;

  const newComment = await prisma.reply.create({
    data: {
      content,
      user: {
        connect: {
          username: user.username,
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
};
