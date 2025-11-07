import type { NextApiRequest, NextApiResponse } from 'next';
import { springbigFetch } from '../../../lib/clients/springbig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Example: GET /api/springbig/proxy/rewards -> calls /v1/.../rewards on SpringBig
    const upstreamPath = req.url?.replace('/api/springbig/proxy', '') || '/';
    const method = req.method || 'GET';
    const body = method === 'GET' ? undefined : JSON.stringify(req.body);

    const result = await springbigFetch(upstreamPath, {
      method,
      body,
    });

    return res.status(result.status).json(result.data);
  } catch (err: any) {
    console.error('springbig proxy error', err);
    return res.status(502).json({ error: 'Upstream SpringBig request failed' });
  }
}
