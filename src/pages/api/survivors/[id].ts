import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync, writeFileSync } from 'fs';
import { SurvivorProps } from '@/types/survivor.types';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const id = String(req.query.id);
    const isInfected = Boolean(req.body.isInfected);

    const jsonDirectory = join(process.cwd(), 'json');

    const data = readFileSync(`${jsonDirectory}/survivors-data.json`, 'utf-8');
    const { survivors } = JSON.parse(data) as {
      survivors: SurvivorProps[];
    };

    const survivorIndex = survivors.findIndex((survivor) => survivor.id === id);
    survivors[survivorIndex].isInfected = isInfected;

    writeFileSync(
      `${jsonDirectory}/survivors-data.json`,
      JSON.stringify({ survivors }, null, 2)
    );

    return res.status(200).json({ ok: true });
  }

  return res.status(400);
}
