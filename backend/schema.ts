import { pgTable, uuid, varchar, text, integer, boolean, timestamp, time, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('user_role', ['FATHER', 'CHILD']);
export const deviceModeEnum = pgEnum('device_mode', ['ACTIVE', 'BEDTIME', 'RESTRICTED']);
export const memoryTypeEnum = pgEnum('memory_type', ['VOICE_NOTE', 'PHOTO', 'DRAWING', 'BEDTIME_STORY', 'NOTE']);
export const contentTypeEnum = pgEnum('content_type', ['YOUTUBE_VIDEO', 'YOUTUBE_PLAYLIST', 'APP']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  role: roleEnum('role').notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  avatarUrl: text('avatar_url'),
  pinHash: varchar('pin_hash', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  deviceName: varchar('device_name', { length: 100 }).notNull(),
  fcmToken: text('fcm_token'),
  batteryLevel: integer('battery_level').default(100),
  isCharging: boolean('is_charging').default(false),
  isLocked: boolean('is_locked').default(false),
  currentMode: deviceModeEnum('current_mode').default('ACTIVE').notNull(),
  lastHeartbeat: timestamp('last_heartbeat', { withTimezone: true }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const timelineMemories = pgTable('timeline_memories', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  deviceId: uuid('device_id').references(() => devices.id, { onDelete: 'set null' }),
  type: memoryTypeEnum('type').notNull(),
  mediaUrl: text('media_url').notNull(),
  audioDurationSeconds: integer('audio_duration_seconds'),
  title: varchar('title', { length: 200 }),
  description: text('description'),
  isListened: boolean('is_listened').default(false).notNull(),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const approvedContents = pgTable('approved_contents', {
  id: uuid('id').defaultRandom().primaryKey(),
  contentType: contentTypeEnum('content_type').notNull(),
  externalId: varchar('external_id', { length: 150 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  thumbnailUrl: text('thumbnail_url'),
  category: varchar('category', { length: 50 }).default('Genel').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  orderIndex: integer('order_index').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});