import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import cors from '@fastify/cors';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { desc, eq } from 'drizzle-orm';
import { db } from './db.js';
import { timelineMemories, approvedContents, devices } from './schema.js';

const fastify = Fastify({ logger: true });

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || 'minio_admin',
    secretAccessKey: process.env.S3_SECRET_KEY || 'minio_secret_password',
  },
});

const BUCKET_NAME = process.env.S3_BUCKET || 'babakiz-media';
const connectedClients = new Map<string, any>();

function broadcast(deviceId: string | null, payload: Record<string, any>) {
  const message = JSON.stringify(payload);
  if (deviceId && connectedClients.has(deviceId)) {
    connectedClients.get(deviceId)?.send(message);
  } else {
    for (const socket of connectedClients.values()) {
      socket.send(message);
    }
  }
}

async function start() {
  await fastify.register(cors, { origin: '*' });
  await fastify.register(fastifyWebsocket);

  fastify.get('/api/health', async () => ({ status: 'ok' }));

  fastify.post<{ Body: { fileName: string; contentType: string } }>(
    '/api/media/upload-url',
    async (req) => {
      const { fileName, contentType } = req.body;
      const key = `uploads/${Date.now()}-${fileName}`;
      const command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: key, ContentType: contentType });
      const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
      return { uploadUrl, key };
    }
  );

  fastify.get<{ Querystring: { key: string } }>('/api/media/read-url', async (req) => {
    const { key } = req.query;
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
    const viewUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return { viewUrl };
  });

  fastify.get('/api/memories', async () => {
    const items = await db.select().from(timelineMemories).orderBy(desc(timelineMemories.createdAt)).limit(50);
    return { items };
  });

  fastify.post<{ Body: any }>('/api/memories', async (req) => {
    const body = req.body;
    const [created] = await db.insert(timelineMemories).values(body).returning();
    broadcast(body.deviceId || null, { event: 'NEW_MEMORY_ARRIVED', data: created });
    return { item: created };
  });

  fastify.get('/api/contents', async () => {
    const items = await db.select().from(approvedContents).where(eq(approvedContents.isActive, true));
    return { items };
  });

  fastify.post<{ Body: any }>('/api/contents', async (req) => {
    const [created] = await db.insert(approvedContents).values(req.body).returning();
    broadcast(null, { event: 'CONTENT_LIST_UPDATED', data: created });
    return { item: created };
  });

  fastify.post<{ Body: { deviceId: string; isLocked: boolean; mode?: any } }>('/api/device/lock', async (req) => {
    const { deviceId, isLocked, mode } = req.body;
    await db.update(devices).set({ isLocked, currentMode: mode || (isLocked ? 'BEDTIME' : 'ACTIVE') }).where(eq(devices.id, deviceId));
    broadcast(deviceId, { event: isLocked ? 'LOCK_SCREEN' : 'UNLOCK_SCREEN' });
    return { success: true };
  });

  fastify.get('/ws', { websocket: true }, (connection) => {
    let clientId: string | null = null;
    connection.socket.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'REGISTER' && data.deviceId) {
          clientId = data.deviceId;
          connectedClients.set(clientId!, connection.socket);
        }
        if (data.type === 'HEARTBEAT' && data.deviceId) {
          await db.update(devices).set({ batteryLevel: data.batteryLevel, isCharging: data.isCharging, lastHeartbeat: new Date() }).where(eq(devices.id, data.deviceId));
        }
      } catch (e) {}
    });
    connection.socket.on('close', () => {
      if (clientId) connectedClients.delete(clientId);
    });
  });

  await fastify.listen({ port: 4000, host: '0.0.0.0' });
}
start();