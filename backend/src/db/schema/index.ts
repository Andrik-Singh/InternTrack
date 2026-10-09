import {
  pgTable,
  pgEnum,
  uuid,
  text,
  date,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const roleEnum = pgEnum('user_role', ['ADMIN', 'INTERN', 'MENTOR']);

export const taskStatusEnum = pgEnum('task_status', [
  'ASSIGNED',
  'SUBMITTED',
  'UNDER_REVIEW',
  'CHANGES_REQUESTED',
  'RESUBMITTED',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
]);

export const priorityEnum = pgEnum('priority', ['HIGH', 'MEDIUM', 'LOW']);

export const submissionStatusEnum = pgEnum('submission_status', [
  'SUBMITTED',
  'UNDER_REVIEW',
  'CHANGES_REQUESTED',
  'RESUBMITTED',
  'APPROVED',
  'REJECTED',
]);

export const companyTable = pgTable('companies', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  address: text('address'),
  website: text('website'),
});

export const userTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userName: text('user_name').notNull(),
    email: text('email').notNull(),
    companyId: uuid('company_id')
      .notNull()
      .references(() => companyTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    passwordHash: text('passwordHash').notNull(),
    avatar: text('avatar'),
    role: roleEnum('role').notNull(),
    active: boolean('is_active').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    emailUnique: uniqueIndex('users_email_unique').on(
      sql`lower(${table.email})`,
    ),
    companyIdx: index('users_company_id_idx').on(table.companyId),
  }),
);

export const programTable = pgTable(
  'programs',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    companyId: uuid('company_id')
      .notNull()
      .references(() => companyTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    active: boolean('active').notNull(),
  },
  (table) => ({
    companyIdx: index('programs_company_id_idx').on(table.companyId),
  }),
);

export const programMembersTable = pgTable(
  'program_members',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    programId: uuid('program_id')
      .notNull()
      .references(() => programTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    programUserUnique: uniqueIndex('program_members_program_user_unique').on(
      table.programId,
      table.userId,
    ),
    userIdx: index('program_members_user_id_idx').on(table.userId),
  }),
);

export const taskTable = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    programId: uuid('program_id')
      .notNull()
      .references(() => programTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    assignedTo: uuid('assigned_to')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    assignedBy: uuid('assigned_by')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    priority: priorityEnum('priority').notNull(),
    status: taskStatusEnum('status').notNull(),
    dueDate: date('due_date').notNull(),
  },
  (table) => ({
    programIdx: index('tasks_program_id_idx').on(table.programId),
    assignedToIdx: index('tasks_assigned_to_idx').on(table.assignedTo),
    assignedByIdx: index('tasks_assigned_by_idx').on(table.assignedBy),
    statusIdx: index('tasks_status_idx').on(table.status),
  }),
);

export const submissionTable = pgTable(
  'submissions',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    taskId: uuid('task_id')
      .notNull()
      .references(() => taskTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    version: integer('version').default(1).notNull(),
    description: text('description'),
    submittedAt: timestamp('submitted_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    status: submissionStatusEnum('status').notNull(),
  },
  (table) => ({
    taskVersionUnique: uniqueIndex('submissions_task_version_unique').on(
      table.taskId,
      table.version,
    ),
    taskIdx: index('submissions_task_id_idx').on(table.taskId),
  }),
);

export const submissionEvidenceTable = pgTable(
  'submission_evidence',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    submissionId: uuid('submission_id')
      .notNull()
      .references(() => submissionTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    evidence: text('evidence').notNull(),
    type: text('type').notNull(),
  },
  (table) => ({
    submissionIdx: index('submission_evidence_submission_id_idx').on(
      table.submissionId,
    ),
  }),
);

export const feedbackTable = pgTable(
  'feedback',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    submissionId: uuid('submission_id')
      .notNull()
      .references(() => submissionTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    feedback: text('feedback').notNull(),
    feedbackBy: uuid('feedback_by')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    submissionIdx: index('feedback_submission_id_idx').on(table.submissionId),
    feedbackByIdx: index('feedback_feedback_by_idx').on(table.feedbackBy),
  }),
);

export const gradeTable = pgTable(
  'grades',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    submissionId: uuid('submission_id')
      .notNull()
      .references(() => submissionTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    grade: integer('grade').notNull(),
    gradedBy: uuid('graded_by')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    submissionUnique: uniqueIndex('grades_submission_id_unique').on(
      table.submissionId,
    ),
    gradedByIdx: index('grades_graded_by_idx').on(table.gradedBy),
    gradeRangeCheck: check(
      'grade_range_check',
      sql`${table.grade} >= 0 AND ${table.grade} <= 100`,
    ),
  }),
);

export const notificationTable = pgTable(
  'notifications',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    title: text('title').notNull(),
    description: text('description'),
    type: text('type').notNull(),
    referenceType: text('reference_type'),
    referenceId: uuid('reference_id'),
    readAt: timestamp('read_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdx: index('notifications_user_id_idx').on(table.userId),
    readAtIdx: index('notifications_read_at_idx').on(table.readAt),
  }),
);
