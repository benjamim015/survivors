import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const id = String(req.query.id);
    const isInfected = Boolean(req.body.isInfected);

    await prisma.survivor.update({
      where: { id },
      data: { isInfected },
    });

    return res.status(204).send({});
  }

  return res
    .status(200)
    .json({ message: 'Nothing here, go back or you will get infected!!' });
}
