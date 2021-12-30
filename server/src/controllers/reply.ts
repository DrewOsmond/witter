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
        likes: true,
      },
    });
    res.status(201).json(newReply);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};

export const likeReply = (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body.reply || !req.body.user) return res.sendStatus(400);
  const { reply } = req.body;
  const { user } = req.body.user;

  prisma.replyLikes
    .create({
      data: {
        userId: user.id,
        replyId: reply.id,
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
    })
    .then((data) => res.status(201).json(data))
    .catch((_e) => res.sendStatus(400));

  return;
};

export const unlikeReply = (req: Request, res: Response) => {
  if (!req.body.reply || !req.body.user) return res.sendStatus(400);
  const { reply } = req.body;
  const { user } = req.body.user;
  console.log("??");
  prisma.replyLikes
    .delete({
      where: {
        userId_replyId: {
          userId: user.id,
          replyId: reply.id,
        },
      },
    })
    .then((data) => res.status(202).json(data))
    .catch((_e) => res.sendStatus(400));

  return;
};
