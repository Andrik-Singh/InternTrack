# InternTrack — Internship Task Tracking & Grading System

> **Product Requirements and Feature Specification**
>
> InternTrack is a web-based platform for managing internship programs, assigning work, collecting submissions, reviewing performance, and creating reliable records of intern progress.
>
> The platform turns internship work into structured, reviewable evidence:
>
> ```text
> Internship Program
>   → Task Definition
>   → Task Assignment
>   → Work and Progress
>   → Submission and Evidence
>   → Mentor Review
>   → Rubric Evaluation
>   → Feedback and Revision
>   → Approval
>   → Progress and Performance Reports
> ```

---

## Document Information

| Field | Value |
|---|---|
| Product | InternTrack |
| Related concept | TaskGrader |
| Document type | Product requirements and feature specification |
| Intended audience | Product, design, engineering, QA, and program administrators |
| Status | Draft |
| Primary users | Interns, mentors, administrators |

---

## 1. Product Overview

### 1.1 Product Vision

InternTrack provides a centralized way for organizations to plan, manage, assess, and report on internship programs.

Rather than relying on physical logbooks, informal messages, inconsistent spreadsheets, or end-of-internship reviews, InternTrack supports a continuous workflow where:

- Interns know what work is expected.
- Mentors can assign and monitor tasks.
- Submissions are stored with supporting evidence.
- Evaluations use consistent criteria.
- Feedback is linked to specific work.
- Progress is visible throughout the internship.
- Historical records can support final evaluations and reports.

### 1.2 Product Principle

> **Every meaningful piece of internship work should produce structured evidence that can be reviewed, evaluated, and used to support learning.**

### 1.3 Product Positioning

> **InternTrack is an internship management and evaluation platform that transforms internship work into structured tasks, verifiable submissions, rubric-based evaluations, continuous feedback, and measurable performance records.**

Short version:

> **Plan. Submit. Review. Improve. Measure.**

---

## 2. Problem Statement

Internship programs often rely on fragmented or manual processes. These can make it difficult to understand what interns are working on, how their work is progressing, and whether evaluations are consistent.

### 2.1 Current Problems

#### Manual or Inconsistent Logbooks

Interns may use paper logbooks, spreadsheets, or informal notes. Formats and levels of detail can vary, and mentors may have difficulty reviewing or verifying records.

#### Ad-hoc Reporting

Reports may be submitted irregularly or only at the end of an internship. This makes it harder to identify problems early and provide timely guidance.

#### Subjective Assessment

Without shared criteria, task evaluation may depend heavily on individual mentor judgment. This can make assessments difficult to compare or explain.

#### Limited Transparency

Interns may not know the expected deliverables, evaluation criteria, current progress, or reasons for a grade.

#### Delayed Intervention

If progress is visible only through periodic reports, mentors may not identify missed deadlines or blockers until significant time has passed.

#### Communication Gaps

Interns, mentors, and academic supervisors may lack a shared place to discuss tasks, submissions, feedback, and program progress.

### 2.2 Product Opportunity

InternTrack addresses these issues by connecting task definition, work evidence, evaluation, feedback, and reporting in one auditable workflow.

---

## 3. Product Goals

### 3.1 Operational Goals

- Reduce manual internship administration.
- Centralize internship and task records.
- Standardize task creation and review.
- Maintain a traceable history of submissions and feedback.
- Make deadlines, workload, and review queues visible.
- Support multiple internship programs within one organization.

### 3.2 Learning Goals

- Make expectations explicit before work begins.
- Provide actionable feedback tied to specific work.
- Track improvement across revisions and tasks.
- Connect completed work to competencies or skills.
- Encourage reflection through logbooks and reports.

### 3.3 Institutional Goals

- Provide universities and program administrators with structured evidence of internship activity.
- Support consistent reporting across companies and programs.
- Preserve records for final evaluations and audits.
- Improve visibility into program health and completion.

---

## 4. Success Measures

Product success should be measured through platform adoption and workflow outcomes. Activity metrics must not automatically be interpreted as judgments about an individual intern.

### 4.1 Adoption Metrics

- Number of active organizations.
- Number of active internship programs.
- Number of active interns and mentors.
- Percentage of active programs using task submissions and reviews.

### 4.2 Workflow Metrics

- Percentage of assigned tasks with a recorded status.
- Percentage of submissions reviewed.
- Average time from submission to first review.
- Percentage of weekly reports submitted on time.
- Number of overdue tasks.
- Average number of revision cycles per task.

### 4.3 Evaluation Metrics

- Percentage of graded tasks using a rubric.
- Feedback completion rate.
- Distribution of rubric scores.
- Percentage of grades with written comments.

---

## 5. Users and Roles

### 5.1 Student / Intern

**Primary needs**

- View assigned tasks and expectations.
- Understand deadlines and acceptance criteria.
- Record progress.
- Submit work and supporting evidence.
- Receive and respond to feedback.
- Track grades and overall progress.
- Submit daily logs or weekly reports where required.
- Review personal performance history.

### 5.2 Mentor

**Primary needs**

- Manage assigned interns.
- Create, assign, and update tasks.
- Define deliverables and evaluation criteria.
- Review submissions and evidence.
- Grade work and provide actionable feedback.
- Request revisions or approve submissions.
- Monitor workload, progress, and review queues.
- Generate reports for interns and programs.

### 5.3 Administrator

**Primary needs**

- Manage users and roles.
- Manage companies and internship programs.
- Configure program membership and permissions.
- Monitor system and program activity.
- Configure grading policies.
- Generate organization-level reports.
- Review audit records.

### 5.4 Optional Future Role: University Supervisor

A university supervisor may:

- View assigned students and internship status.
- Review weekly reports and final evaluations.
- Monitor progress and task completion.
- Communicate with interns and mentors.
- Generate institution-level reports.

This role should be introduced only when the product needs to support university-side workflows.

---

## 6. Scope

### 6.1 MVP Scope

The first release should support:

- Authentication and user profiles.
- Role-based access control.
- Company and internship program management.
- Internship membership.
- Task creation and assignment.
- Task statuses and deadlines.
- Submission with links or files.
- Mentor review.
- Rubric-based grading.
- Written feedback.
- Student and mentor dashboards.
- Basic internship and performance reports.

### 6.2 Out of Scope for MVP

- Internship placement or recruitment marketplace.
- Payroll, compensation, or advanced HR features.
- Attendance hardware integrations.
- Full learning management system.
- Complex predictive analytics.
- Automatic final grading.
- General-purpose project management suite.
- A full chat product comparable to Slack or Teams.

### 6.3 Later Product Extensions

- Digital logbooks.
- Weekly reports.
- Submission version history.
- Notifications.
- Activity timelines.
- Task templates.
- Skill and competency tracking.
- GitHub and calendar integrations.
- Advanced analytics.
- AI-assisted drafting and summarization.

---

## 7. Core Product Modules

```text
1. Identity and Access
2. Company Management
3. Internship Program Management
4. Internship Membership
5. Task Management
6. Submission and Evidence
7. Review and Evaluation
8. Feedback and Communication
9. Progress Tracking
10. Reports and Analytics
11. Notifications
12. Audit and Administration
```

---

## 8. Identity and Access

### 8.1 Authentication Requirements

The system should support:

- Registration.
- Login and logout.
- Email verification.
- Password reset.
- Session expiration and renewal.
- Logout from the current session.
- Optional logout from all sessions.
- Optional single sign-on in a future release.

### 8.2 User Profile

A user profile should include:

```text
id
email
full_name
avatar_url
phone
created_at
updated_at
```

Optional intern profile fields:

```text
student_id
college
degree
semester
skills
bio
resume_url
```

Optional mentor profile fields:

```text
job_title
department
company
professional_bio
```

### 8.3 Roles and Permissions

Initial roles:

```text
STUDENT
MENTOR
ADMIN
```

Optional future role:

```text
UNIVERSITY_SUPERVISOR
```

Permissions should be checked on the server for every protected action. Examples:

```text
task:create
task:assign
task:submit
submission:review
grade:create
report:view
program:manage
user:manage
```

---

## 9. Company and Internship Management

### 9.1 Company

A company is an organization participating in one or more internship programs.

Suggested fields:

```text
Company
-------
id
name
description
address
website
contact_email
status
created_at
updated_at
```

Company features:

- Create and edit company records.
- Manage company members.
- View active and historical internship programs.
- Archive inactive companies.

### 9.2 Internship Program

A company may run multiple programs or cohorts.

Examples:

```text
Company
├── Summer Internship 2026
├── Winter Internship 2026
└── Software Engineering Internship 2027
```

Suggested fields:

```text
Internship
----------
id
company_id
name
description
start_date
end_date
status
created_at
updated_at
```

Statuses:

```text
DRAFT
UPCOMING
ACTIVE
COMPLETED
CANCELLED
```

Program features:

- Create and edit programs.
- Set start and end dates.
- Invite or add interns.
- Assign mentors.
- Configure grading rules.
- Select task templates.
- Monitor program progress.
- Close and archive programs.

---

## 10. Internship Membership

A user may participate in multiple internship programs. Membership should be represented separately from company membership.

```text
InternshipMember
----------------
id
internship_id
user_id
role
status
joined_at
left_at
```

Roles:

```text
STUDENT
MENTOR
SUPERVISOR
```

Membership should determine which program records a user can access.

---

## 11. Task Management

### 11.1 Task Data

```text
Task
----
id
internship_id
created_by
title
description
instructions
category
priority
start_date
due_date
estimated_hours
status
created_at
updated_at
```

### 11.2 Task Status

Use explicit states instead of a single completed/incomplete flag.

```text
DRAFT
ASSIGNED
IN_PROGRESS
SUBMITTED
UNDER_REVIEW
CHANGES_REQUESTED
RESUBMITTED
APPROVED
REJECTED
CANCELLED
```

### 11.3 Priority

```text
LOW
MEDIUM
HIGH
URGENT
```

### 11.4 Categories

Example categories:

```text
DEVELOPMENT
DESIGN
RESEARCH
DOCUMENTATION
TESTING
MEETING
PRESENTATION
DEPLOYMENT
OTHER
```

### 11.5 Task Requirements

A mentor should be able to:

- Create a task.
- Edit a task within permitted workflow states.
- Assign the task to one or more interns.
- Set priority and due date.
- Define instructions and deliverables.
- Add acceptance criteria.
- Attach a rubric.
- Cancel or archive a task.

### 11.6 Acceptance Criteria

Acceptance criteria should make expectations visible before work begins.

Example:

```text
[ ] API supports GET requests
[ ] API supports POST requests
[ ] Input validation is implemented
[ ] Errors return appropriate responses
[ ] Tests are included
[ ] README documentation is updated
```

---

## 12. Task Assignment

A task and an assignment should be separate records. This allows one task definition to be assigned to multiple interns while preserving each intern’s individual status.

```text
TaskAssignment
--------------
id
task_id
student_id
assigned_by
assigned_at
status
started_at
completed_at
```

Assignment features:

- Assign a task to one or more interns.
- Track progress independently for each intern.
- Preserve assignment history.
- Support reassignment where policy permits.
- Calculate due and overdue status per assignment.

---

## 13. Task Templates

Mentors should be able to save reusable tasks.

Example template:

```text
Title:
Build REST API

Expected deliverables:
- API endpoints
- Input validation
- Error handling
- Tests
- Documentation

Suggested rubric:
- Functionality: 40%
- Code quality: 25%
- Documentation: 15%
- Testing: 20%
```

Template features:

- Create and edit templates.
- Duplicate templates.
- Archive templates.
- Create a task from a template.
- Allow program-specific templates.

Task templates are a post-MVP feature unless task setup is a major operational requirement.

---

## 14. Submission and Evidence

### 14.1 Submission Data

```text
Submission
----------
id
task_assignment_id
version
description
status
submitted_by
submitted_at
reviewed_at
```

Submission types may include:

- Text response.
- File upload.
- GitHub or GitLab URL.
- Pull request URL.
- Deployment URL.
- Screenshot.
- Video or demo.
- Document link.

### 14.2 Submission Evidence

A submission may include multiple evidence items.

```text
SubmissionEvidence
------------------
id
submission_id
type
url
file_name
file_size
mime_type
description
created_at
```

Possible evidence types:

```text
FILE
LINK
IMAGE
VIDEO
GITHUB
DEPLOYMENT
DOCUMENT
```

### 14.3 Submission Versioning

Submissions must not be overwritten when a student revises work.

Example:

```text
Submission v1
  → Mentor requests changes
  → Submission v2
  → Mentor approves
```

Each version should preserve its own:

- Submitted content.
- Evidence.
- Timestamp.
- Status.
- Review comments.
- Grade history, if applicable.

---

## 15. Review Workflow

Recommended workflow:

```text
Student submits work
        ↓
Mentor receives notification
        ↓
Mentor reviews submission and evidence
        ↓
Mentor evaluates rubric
        ↓
Mentor writes feedback
        ↓
 ┌─────────────────────┐
 │                     │
Approve          Request changes
 │                     │
Task approved     Student revises
                       │
                    Resubmit
                       │
                 Mentor reviews again
```

A mentor should be able to:

- Open a submission and inspect evidence.
- Score rubric criteria.
- Add overall comments.
- Request changes.
- Approve or reject a submission.
- View earlier versions.
- Review the history of the task.

---

## 16. Rubric-Based Grading

### 16.1 Rubric Model

```text
Rubric
------
id
name
description
created_by
```

```text
RubricCriterion
---------------
id
rubric_id
name
description
weight
max_score
```

Example rubric:

| Criterion | Weight |
|---|---:|
| Technical correctness | 40% |
| Code quality | 20% |
| Documentation | 15% |
| Testing | 15% |
| Timeliness | 10% |

### 16.2 Grade Model

```text
TaskGrade
---------
id
submission_id
criterion_id
score
comment
graded_by
graded_at
```

### 16.3 Score Calculation

The overall score should be calculated from stored criterion scores and weights.

```text
Overall score =
Σ(normalized criterion score × criterion weight)
```

For example, if a criterion has a maximum score of 5 and receives 4:

```text
Normalized score = 4 / 5 = 0.8
Weighted contribution = 0.8 × criterion weight
```

### 16.4 Grading Policies

Support, where configured by program:

- Numeric scores.
- Letter grades.
- Pass/fail.
- Weighted rubrics.
- Maximum score.
- Minimum passing score.
- Late submission policies.

Grading scales should be configurable at the program level rather than hardcoded.

Example:

```text
90–100 = A
80–89  = B
70–79  = C
60–69  = D
<60    = F
```

---

## 17. Feedback and Communication

### 17.1 Feedback Model

```text
Feedback
--------
id
submission_id
author_id
parent_feedback_id
content
status
created_at
updated_at
```

Statuses:

```text
OPEN
RESOLVED
```

### 17.2 Feedback Features

- Mentor comments.
- Student replies.
- Threaded feedback.
- Timestamped history.
- Feedback tied to a rubric criterion.
- Feedback resolution status.
- Optional mentions and notifications.

### 17.3 Actionable Feedback

Feedback should explain what worked and what should change.

Example:

```text
Criterion: Testing

The primary authentication flow works as expected. Please add tests for:
- Invalid credentials
- Expired refresh tokens
- Missing request fields
```

---

## 18. Dashboards

### 18.1 Student Dashboard

Recommended information:

```text
Internship progress
- Completion percentage
- Total assigned tasks
- Completed tasks
- In-progress tasks
- Pending tasks
- Overdue tasks

Performance
- Average score
- Recent grades
- Feedback awaiting response

Upcoming
- Tasks due soon
- Reports due soon
```

Sections:

1. Overview.
2. My internship.
3. My tasks.
4. Submissions.
5. Feedback.
6. Grades.
7. Reports.
8. Activity.
9. Profile.

### 18.2 Mentor Dashboard

Recommended metrics:

- Active interns.
- Tasks awaiting review.
- Overdue tasks.
- Average intern progress.
- Average task score.
- Reports awaiting review.

Views:

- Intern list.
- Task queue.
- Review queue.
- Recent submissions.
- Overdue work.
- Feedback activity.
- Progress by intern.

### 18.3 Admin Dashboard

Recommended metrics:

- Companies.
- Active programs.
- Active interns.
- Active mentors.
- Total tasks.
- Pending tasks.
- Average program completion.

Views:

- Companies.
- Internship programs.
- Users.
- Memberships.
- Reports.
- System activity.
- Audit logs.

---

## 19. Progress Tracking

### 19.1 Basic Completion

```text
Completion percentage =
approved or completed assignments / total active assignments
```

The product should define clearly which statuses count as completed.

### 19.2 Dashboard Metrics

Possible metrics:

- Total assigned tasks.
- Completed tasks.
- In-progress tasks.
- Pending tasks.
- Overdue tasks.
- Awaiting-review tasks.
- Average task score.
- Overall program progress.
- Submission turnaround time.

Metrics should be descriptive and should not replace mentor judgment.

---

## 20. Digital Logbook

A digital logbook supports regular work records.

```text
DailyLog
--------
id
internship_id
student_id
date
hours_worked
work_completed
learning
challenges
next_steps
status
created_at
updated_at
```

Example entry:

```text
Date: 2026-09-23
Hours worked: 5
Work completed: Implemented JWT authentication.
Challenges: Refresh-token rotation.
What I learned: Access and refresh token architecture.
Evidence: GitHub pull request #42
```

Features:

- Create and edit draft entries.
- Submit entries for review if required.
- Mentor comments.
- Search and filter by date.
- Include approved entries in reports.

The digital logbook is a recommended post-MVP feature.

---

## 21. Weekly Reports

```text
WeeklyReport
------------
id
internship_id
student_id
week_start
week_end
summary
accomplishments
challenges
learning
next_goals
status
created_at
updated_at
```

Suggested sections:

- Tasks completed.
- Tasks still in progress.
- Hours worked, if required.
- Key accomplishments.
- Learning outcomes.
- Challenges.
- Goals for the next week.
- Mentor comments.

Statuses:

```text
DRAFT
SUBMITTED
REVIEWED
APPROVED
```

---

## 22. Final Internship Evaluation

A final evaluation may contain:

```text
FinalEvaluation
---------------
id
internship_id
student_id
mentor_id
overall_score
summary
strengths
areas_for_improvement
recommendation
created_at
updated_at
```

Suggested evaluation areas:

- Task performance.
- Technical skills.
- Problem solving.
- Communication.
- Documentation.
- Consistency.
- Professionalism.
- Overall performance.

The final evaluation should reference underlying tasks, grades, submissions, and feedback rather than standing alone as an unsupported opinion.

---

## 23. Activity Timeline

A unified timeline should display important program events.

Example:

```text
Today
10:32 — Student submitted Authentication API
09:15 — Mentor assigned Database Design

Yesterday
16:42 — Mentor requested changes
14:21 — Student uploaded documentation

Monday
11:20 — Student completed UI task
```

Possible event types:

```text
TASK_CREATED
TASK_ASSIGNED
TASK_STARTED
SUBMISSION_CREATED
SUBMISSION_REVIEWED
FEEDBACK_CREATED
GRADE_UPDATED
TASK_APPROVED
REPORT_SUBMITTED
```

---

## 24. Notifications

### 24.1 Notification Triggers

Student notifications:

- New task assigned.
- Deadline approaching.
- Task overdue.
- Submission reviewed.
- Feedback received.
- Changes requested.
- Task approved.

Mentor notifications:

- New submission.
- Task overdue.
- Weekly report submitted.
- Student replied to feedback.
- Program nearing completion.

Administrator notifications:

- New program created.
- Program completed.
- User or membership changes requiring attention.
- Report generation completed.

### 24.2 Notification Channels

MVP:

- In-app notifications.

Future:

- Email.
- Browser push notifications.
- Calendar reminders.

### 24.3 Notification Model

```text
Notification
------------
id
user_id
type
title
message
reference_type
reference_id
read_at
created_at
```

---

## 25. Reporting and Export

### 25.1 Student Report

A student report may include:

- Student information.
- Company and internship program.
- Internship dates.
- Assigned and completed tasks.
- Submission history.
- Rubric scores.
- Mentor feedback.
- Weekly reports.
- Final evaluation.

### 25.2 Mentor Report

A mentor report may include:

- Assigned interns.
- Task and review queues.
- Completion progress.
- Average scores.
- Feedback activity.
- Submission turnaround time.

### 25.3 Program Report

A program report may include:

- Number of interns and mentors.
- Number of assigned tasks.
- Completion rate.
- Overdue task count.
- Average score distribution.
- Weekly report completion.
- Final evaluations.

### 25.4 Export Formats

Recommended formats:

- PDF.
- CSV.
- XLSX in a later release.

MVP may begin with PDF and CSV exports.

---

## 26. Search and Filtering

Search should support, as appropriate to the user’s permissions:

- Interns.
- Mentors.
- Companies.
- Programs.
- Tasks.
- Submissions.
- Reports.

Task filters:

- Status.
- Priority.
- Intern.
- Mentor.
- Program.
- Category.
- Due date.
- Grade.

Sorting options:

- Newest.
- Oldest.
- Due soon.
- Recently submitted.
- Highest score.
- Lowest score.

---

## 27. Audit Logging

Important administrative and evaluation actions should be recorded.

```text
AuditLog
--------
id
actor_id
action
entity_type
entity_id
old_value
new_value
created_at
```

Examples:

```text
Mentor changed grade: 82 → 87
Admin changed role: STUDENT → MENTOR
Mentor changed deadline: Sep 25 → Sep 28
```

Audit records should be protected from ordinary user modification.

---

## 28. Data Model

### 28.1 Core Entities

```text
User
Company
CompanyUser
Internship
InternshipMember
Task
TaskAssignment
Submission
SubmissionEvidence
Rubric
RubricCriterion
TaskGrade
Feedback
Notification
DailyLog
WeeklyReport
FinalEvaluation
ActivityLog
AuditLog
```

### 28.2 Entity Relationships

```text
Company
├── CompanyUser
└── Internship
    ├── InternshipMember
    │   ├── Student
    │   └── Mentor
    └── Task
        └── TaskAssignment
            └── Submission
                ├── SubmissionEvidence
                ├── Feedback
                └── TaskGrade
                    └── RubricCriterion
```

### 28.3 Recommended Core Schema

```text
User
----
id
email
password_hash
full_name
avatar_url
created_at
updated_at
```

```text
Company
-------
id
name
description
address
website
created_at
updated_at
```

```text
CompanyUser
-----------
id
company_id
user_id
role
status
joined_at
```

```text
Internship
----------
id
company_id
name
description
start_date
end_date
status
created_at
updated_at
```

```text
InternshipMember
----------------
id
internship_id
user_id
role
status
joined_at
left_at
```

```text
Task
----
id
internship_id
created_by
title
description
instructions
category
priority
start_date
due_date
estimated_hours
status
created_at
updated_at
```

```text
TaskAssignment
--------------
id
task_id
student_id
assigned_by
status
assigned_at
started_at
completed_at
```

```text
Submission
----------
id
task_assignment_id
version
description
status
submitted_at
submitted_by
```

```text
SubmissionEvidence
------------------
id
submission_id
type
url
file_name
mime_type
file_size
description
created_at
```

```text
Rubric
------
id
name
description
created_by
```

```text
RubricCriterion
---------------
id
rubric_id
name
description
weight
max_score
```

```text
TaskGrade
---------
id
submission_id
criterion_id
score
comment
graded_by
graded_at
```

```text
Feedback
--------
id
submission_id
author_id
parent_feedback_id
content
status
created_at
updated_at
```

```text
Notification
------------
id
user_id
type
title
message
reference_type
reference_id
read_at
created_at
```

```text
DailyLog
--------
id
internship_id
student_id
date
hours_worked
work_completed
learning
challenges
next_steps
status
```

```text
WeeklyReport
------------
id
internship_id
student_id
week_start
week_end
summary
accomplishments
challenges
learning
next_goals
status
```

```text
FinalEvaluation
---------------
id
internship_id
student_id
mentor_id
overall_score
summary
strengths
areas_for_improvement
recommendation
created_at
```

---

## 29. Key User Flows

### 29.1 Student Onboarding

```text
Register
  → Verify email
  → Join internship
  → View dashboard
  → Review assigned tasks
```

### 29.2 Mentor Onboarding

```text
Register
  → Join company
  → Receive mentor role
  → Select or create internship
  → Add interns
  → Create tasks
```

### 29.3 Task Completion

```text
Student opens task
  → Reviews instructions and criteria
  → Starts work
  → Adds evidence
  → Submits
  → Mentor receives notification
```

### 29.4 Review

```text
Mentor opens submission
  → Reviews work and evidence
  → Completes rubric
  → Writes feedback
  → Approves or requests changes
```

### 29.5 Revision

```text
Changes requested
  → Student reviews feedback
  → Student creates a new submission version
  → Mentor reviews the new version
  → Submission approved or returned again
```

---

## 30. State Machines

### 30.1 Task and Assignment Workflow

```text
DRAFT
  → ASSIGNED
  → IN_PROGRESS
  → SUBMITTED
  → UNDER_REVIEW
      ├── APPROVED
      ├── REJECTED
      └── CHANGES_REQUESTED
             → RESUBMITTED
             → UNDER_REVIEW
```

The implementation should define whether `Task` and `TaskAssignment` have separate statuses. Assignment-level status is recommended when tasks can be assigned to multiple interns.

### 30.2 Internship Workflow

```text
DRAFT
  → UPCOMING
  → ACTIVE
  → COMPLETED
```

A program may also be cancelled according to administrative policy.

### 30.3 Weekly Report Workflow

```text
DRAFT
  → SUBMITTED
  → REVIEWED
  → APPROVED
```

---

## 31. Business Rules and Validation

### 31.1 Task Rules

- Title is required.
- Description or instructions are required.
- Due date must not precede the start date.
- Task must belong to a valid internship.
- Only authorized users may create or modify tasks.
- Task changes should respect the current task state.

### 31.2 Assignment Rules

- An assignment must reference a valid task and student.
- A student can submit only an assignment assigned to them.
- Assignment status must follow the defined workflow.
- Reassignment must preserve history where required.

### 31.3 Submission Rules

- Submission version must be unique within its assignment.
- Submission must be created by the assigned student or an authorized user.
- Required evidence must be present if the task requires it.
- Previous submission versions must not be overwritten.

### 31.4 Grade Rules

- A score cannot exceed the criterion’s maximum score.
- Rubric weights should total 100%, unless the rubric explicitly defines another calculation.
- Only authorized mentors or administrators may grade.
- Grade changes must be auditable.
- Approved submissions should not be silently changed.

### 31.5 Program Rules

- Program dates must be valid.
- Program membership must be verified before access is granted.
- Access after program completion or membership removal should follow program policy.

---

## 32. Permission Matrix

| Action | Student | Mentor | Admin |
|---|---:|---:|---:|
| View own tasks | Yes | No | Yes |
| Create task | No | Yes | Yes |
| Assign task | No | Yes | Yes |
| Submit task | Yes | No | No |
| Review submission | No | Yes | Yes |
| Grade submission | No | Yes | Yes |
| Give feedback | No | Yes | Yes |
| Reply to feedback | Yes | Yes | Yes |
| View own report | Yes | No | Yes |
| Generate program report | No | Yes, if authorized | Yes |
| Manage users | No | No | Yes |
| Manage company | No | No | Yes |
| Manage internship | No | Yes, if authorized | Yes |

Permission checks must be enforced by the backend, not only by hiding interface controls.

---

## 33. API Design

Example REST endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/internships
POST   /api/internships
GET    /api/internships/:id
PATCH  /api/internships/:id

GET    /api/internships/:id/tasks
POST   /api/internships/:id/tasks

GET    /api/tasks/:id
PATCH  /api/tasks/:id
POST   /api/tasks/:id/assign

POST   /api/assignments/:id/submissions
GET    /api/assignments/:id/submissions

POST   /api/submissions/:id/review
POST   /api/submissions/:id/feedback

GET    /api/reports/internships/:id
```

The implementation may use REST, RPC, server actions, or another architecture, provided access control and business rules are consistently enforced.

---

## 34. Recommended Architecture

```text
Frontend
  ↓
Authentication and Authorization
  ↓
Application/API Layer
  ↓
Domain Services
  ↓
Database
```

Supporting services may include:

```text
Object storage
Email provider
Notification service
Background jobs
Analytics or reporting service
```

Recommended domain modules:

```text
auth
users
companies
internships
memberships
tasks
assignments
submissions
grading
feedback
reports
notifications
audit
```

Separate domain logic into focused services such as:

```text
TaskService
SubmissionService
GradingService
FeedbackService
ReportService
NotificationService
```

---

## 35. Security Requirements

Minimum requirements:

- Hash passwords using a secure password-hashing algorithm.
- Validate authorization on every protected operation.
- Verify organization membership and resource access.
- Validate user input on the server.
- Apply rate limits to sensitive endpoints.
- Use secure session handling.
- Protect against CSRF where applicable.
- Configure secure HTTP headers.
- Log sensitive administrative and grading actions.
- Never trust a role or grade value supplied by the client.
- Prevent access to another intern’s submissions without authorization.
- Use least-privilege access for integrations and background services.

### 35.1 File Upload Security

For uploaded evidence:

- Enforce file-size limits.
- Validate file types and MIME types.
- Do not trust user-provided filenames.
- Generate safe storage keys.
- Restrict potentially executable formats.
- Use private or signed URLs for confidential evidence.
- Scan files where supported by the infrastructure.

---

## 36. Non-Functional Requirements

### 36.1 Reliability

- Persist submissions, grades, and feedback reliably.
- Avoid losing user work during form submission.
- Record enough event history to investigate workflow issues.

### 36.2 Performance

- Common dashboard and task-list views should load promptly under expected program sizes.
- Use pagination for large lists.
- Avoid loading large report datasets in a single unbounded request.

### 36.3 Accessibility

- Support keyboard navigation.
- Provide meaningful form labels and error messages.
- Use accessible color contrast.
- Do not rely on color alone to communicate task status or grade state.

### 36.4 Maintainability

- Keep workflow rules in application/domain logic rather than duplicating them across interface components.
- Use explicit enums for state.
- Document grading calculations.
- Add automated tests for permission and workflow rules.

### 36.5 Data Retention

Retention and deletion policies should be configurable to comply with organizational, institutional, and legal requirements.

---

## 37. Integrations

Potential future integrations:

### GitHub or GitLab

- Link a repository to a task.
- Attach pull requests, commits, or issues.
- Display integration data as evidence.
- Do not use commit counts as an automatic measure of quality.

### Google Drive or Similar Storage

- Attach documents and shared files.
- Link evidence stored in external systems.

### Slack or Microsoft Teams

- Deliver selected notifications.

### Calendar

- Add task deadlines and internship events.

Integrations should be optional and should not be required for the core task and evaluation workflow.

---

## 38. Skills and Competencies

A future release may associate tasks with skills.

```text
Skill
-----
id
name
description
```

```text
TaskSkill
---------
task_id
skill_id
weight
```

Example:

```text
Task: Build REST API

Skills:
- REST API design
- Backend development
- Input validation
- Testing
- Documentation
```

Task evaluation can provide evidence of skill development, but skill summaries should remain transparent and reviewable by a mentor.

---

## 39. AI-Assisted Features — Future

AI may assist with organization and drafting, but should not make final grading decisions.

Potential features:

- Draft clearer task descriptions from mentor notes.
- Suggest acceptance criteria.
- Suggest a draft rubric for mentor review.
- Summarize feedback into action items.
- Draft report summaries from existing records.
- Identify potential skills associated with a task for mentor confirmation.

> **AI may assist with drafting, summarization, and organization. The mentor remains responsible for evaluation and grading.**

AI-generated content should be clearly labeled and editable.

---

## 40. MVP Definition

### 40.1 MVP Must Include

**Identity and access**

- Registration and login.
- Role-based authorization.
- User profiles.

**Organization**

- Company records.
- Internship programs.
- Internship membership.

**Task management**

- Task creation.
- Task assignment.
- Task status.
- Priority and deadlines.
- Task details and acceptance criteria.

**Submissions**

- Submission creation.
- File or link evidence.
- Submission review.
- Basic revision handling.

**Evaluation**

- Rubrics and criteria.
- Scores and written comments.
- Mentor feedback.
- Approval or changes-requested outcome.

**Dashboards**

- Student dashboard.
- Mentor dashboard.
- Admin dashboard.

**Reporting**

- Basic internship report.
- Basic student performance report.

### 40.2 V2

- Full submission version history.
- Task templates.
- Digital logbook.
- Weekly reports.
- In-app notifications.
- Activity timeline.
- Audit logs.
- Search and advanced filters.
- PDF exports.
- Expanded analytics.

### 40.3 V3

- Skill and competency mapping.
- GitHub or GitLab integration.
- Calendar integration.
- AI-assisted drafting.
- Advanced analytics.
- University supervisor workflows.
- Multi-tenant SaaS support.

---

## 41. Recommended Screens

### Public

```text
Landing page
Login
Register
Forgot password
```

### Student

```text
Dashboard
My internship
My tasks
Task details
Submit task
Submission history
Feedback
Grades
Weekly reports
Activity
Profile
```

### Mentor

```text
Dashboard
My interns
Tasks
Create task
Task details
Review submission
Rubric editor
Feedback
Reports
Activity
Templates
```

### Admin

```text
Dashboard
Users
Companies
Internships
Memberships
Reports
Audit logs
Settings
```

---

## 42. Recommended Navigation

### Student

```text
Dashboard
Internship
├── Overview
├── Tasks
├── Reports
└── Activity
Performance
├── Grades
└── Feedback
Profile
```

### Mentor

```text
Dashboard
Interns
Tasks
Reviews
Reports
Activity
Templates
```

### Admin

```text
Dashboard
Companies
Internships
Users
Reports
Audit logs
Settings
```

---

## 43. Example End-to-End Scenario

### Program

```text
Company: ABC Technologies
Program: Software Engineering Internship
Duration: 3 months
```

### Task

```text
Title: Build Authentication API
```

Requirements:

```text
POST /register
POST /login
POST /refresh
Input validation
Error handling
Tests
Documentation
```

### Evidence

```text
GitHub pull request
Deployment URL
README
Test report
```

### Rubric

```text
Functionality       40%
Code quality        20%
Testing             15%
Documentation       15%
Timeliness          10%
```

### Example Evaluation

```text
Functionality: 36/40
Code quality: 17/20
Testing: 12/15
Documentation: 14/15
Timeliness: 10/10

Total: 89/100
```

### Example Feedback

```text
The authentication flow is implemented correctly.

Please improve:
- Refresh-token error handling.
- Tests for invalid credentials.
```

The resulting record should connect the task, submission versions, evidence, rubric scores, mentor feedback, and approval status.

---

## 44. Development Roadmap

### Phase 1 — Foundation

```text
Authentication
Users and roles
Companies
Internship programs
Memberships
```

### Phase 2 — Task System

```text
Tasks
Assignments
Statuses
Deadlines
Acceptance criteria
```

### Phase 3 — Evaluation

```text
Submissions
Evidence
Rubrics
Grades
Feedback
Revision workflow
```

### Phase 4 — Dashboards

```text
Student dashboard
Mentor dashboard
Admin dashboard
Progress metrics
```

### Phase 5 — Reporting

```text
Weekly reports
Final evaluation
PDF export
CSV export
```

### Phase 6 — Product Polish

```text
Notifications
Activity timeline
Search
Filters
Audit logs
```

### Phase 7 — Advanced Capabilities

```text
Skill mapping
GitHub integration
AI assistance
Advanced analytics
External integrations
```

---

## 45. Product Principles

### Structured Work

Tasks should define the expected work, deadline, deliverables, and evaluation criteria.

### Traceable Evaluation

Grades and feedback should be connected to specific submissions and rubric criteria.

### Immutable History

Do not silently overwrite important historical records. Preserve submission versions, grade changes, feedback, and audit events.

### Explicit State

Prefer explicit states over ambiguous booleans.

Avoid:

```text
completed: true
```

Prefer:

```text
status: APPROVED
```

### Backend Authorization

Every mutation must verify:

```text
authenticated user
+ role
+ organization or program membership
+ resource access
+ allowed workflow state
```

### Human Accountability

The platform can organize and support evaluation, but authorized people remain responsible for grading decisions.

---

## 46. Final Product Model

```text
Company
  ↓
Internship program
  ↓
Members
  ↓
Tasks
  ↓
Assignments
  ↓
Submissions
  ↓
Evidence
  ↓
Rubrics
  ↓
Grades and feedback
  ↓
Revisions and approval
  ↓
Progress records
  ↓
Reports and evaluations
```

InternTrack should not become a generic project-management system. Its distinguishing value is the relationship between work, evidence, evaluation, feedback, and learning:

```text
Work
  → Evidence
  → Evaluation
  → Feedback
  → Improvement
  → Performance record
```

## 47. Product North Star

At any point during an internship, InternTrack should help users answer four questions:

1. **What is the intern expected to do?**  
   Tasks, instructions, and acceptance criteria.

2. **What work did the intern complete?**  
   Submissions, evidence, and activity history.

3. **How was the work evaluated?**  
   Rubrics, scores, and mentor feedback.

4. **How did the intern improve?**  
   Revisions, progress history, and skill evidence.

---

## 48. Summary

InternTrack brings internship management, task tracking, submission, review, grading, feedback, and reporting into one structured system.

Its core workflow is:

```text
Company
  → Internship
  → Tasks
  → Assignments
  → Submissions
  → Evidence
  → Rubrics
  → Grades
  → Feedback
  → Revisions
  → Performance records
  → Reports
```

The initial release should focus on the essential internship lifecycle: creating programs, assigning tasks, collecting submissions, evaluating work consistently, and giving interns clear feedback. Later releases can add digital logbooks, broader reporting, skill mapping, integrations, and AI-assisted tools.
