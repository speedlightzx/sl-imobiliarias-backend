import { LeadTemperature } from '@/types/LeadTemperatureEnum';
import { LeadStatus } from '@/types/LeadStatusEnum';
import { varchar } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
});

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: varchar('name', { length: 40 }).notNull(),
  color: varchar('color', { length: 10 }).default('#000000'),
});

export const leadTemperatureEnum = pgEnum('lead_temperature', LeadTemperature);
export const leadStatusEnum = pgEnum('lead_status', LeadStatus);

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  list_id: integer('list_id')
    .references(() => lists.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: varchar('name', { length: 120 }).notNull(),
  temperature: leadTemperatureEnum('temperature').notNull(),
  status: leadStatusEnum('status').notNull(),
});
