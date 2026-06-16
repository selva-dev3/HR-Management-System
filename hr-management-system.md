# HR Management System — Full Project Blueprint

> Senior-level feature specification, page breakdown, and action matrix for a production-grade HR Management System.

---

## 📊 Project Summary

| Item | Count |
|---|---|
| Total Modules | 12 |
| Total Pages | 70+ |
| Total Routes | 70+ |
| User Roles | 5 (Super Admin, HR Admin, Manager, Employee, Auditor) |
| Tech Stack | React 18 + TypeScript + Vite + TanStack Query + Zustand + React Hook Form + Zod |

---

## 👥 User Roles & Permissions Matrix

| Role | Description |
|---|---|
| `super_admin` | Full access — all modules, all actions |
| `hr_admin` | All HR operations — no system settings |
| `manager` | Team-level view — attendance, leave approve, performance review |
| `employee` | Self-service — own profile, leave apply, payslip view |
| `auditor` | Read-only + export — all modules, no create/edit/delete |

---

## 🔐 Module 1 — Authentication & Access

### Pages

#### `/login`
**Actions:** View, Submit
- Email + password login form
- JWT token stored in httpOnly cookie (never localStorage)
- Redirect to dashboard on success
- Max 5 failed attempts → account lock (15 min cooldown)

#### `/forgot-password`
**Actions:** View, Submit
- Email input → send OTP/reset link
- Zod validation on email format
- Rate limit: 3 requests per 10 minutes per IP

#### `/reset-password`
**Actions:** View, Submit
- Token-based reset (URL param)
- Password strength meter
- Confirm password match validation
- Token expires in 15 minutes

#### `/unauthorized`
**Actions:** View
- 403 page — shown when role lacks permission
- Redirect link based on user role

#### `/roles-permissions`
**Actions:** View, Create, Edit, Delete
- Role list with permission toggles per module
- Granular action-level permission (view / create / edit / delete / export)
- Changes require super_admin confirmation

**Route guard:** `super_admin` only

---

## 📊 Module 2 — Dashboard

### Pages

#### `/dashboard`
**Actions:** View, Export
- KPI cards: Total employees, Present today, On leave, Open positions
- Headcount trend chart (last 6 months)
- Department-wise strength pie chart
- Recent activity feed (last 10 actions)
- Upcoming birthdays & work anniversaries
- Pending approvals widget (leave, reimbursements)

**Roles:** All roles (data scoped by role)

#### `/dashboard/analytics`
**Actions:** View, Export
- Advanced charts: attrition rate, cost-per-hire, absenteeism rate
- Date range filter
- Export as PDF / Excel

**Roles:** `super_admin`, `hr_admin`, `auditor`

#### `/notifications`
**Actions:** View, Mark as Read, Delete
- In-app notification center
- Filter: All / Unread / System / Approval
- Bulk mark as read
- Auto-delete after 90 days

---

## 👤 Module 3 — Employee Management

### Pages

#### `/employees`
**Actions:** View, Create, Export
- Data table: Name, ID, Department, Designation, Status, Join Date
- Search, filter (department, status, location), sort
- Bulk export (CSV, Excel, PDF)
- Quick status toggle (Active / Inactive)

**Roles:** `super_admin`, `hr_admin`, `manager` (own team only)

#### `/employees/new`
**Actions:** Create
- Multi-step form (Personal → Job → Bank → Documents)
- Auto-generate Employee ID
- Photo upload (max 2MB, JPG/PNG only)
- Zod schema validation on every step
- Draft save (auto-save every 30s)

#### `/employees/:id`
**Actions:** View
- Full profile view: personal info, job info, bank details, documents
- Tab navigation: Overview / Documents / History / Assets / Payroll
- Activity timeline

#### `/employees/:id/edit`
**Actions:** Edit
- Same multi-step form as create (pre-filled)
- Track changed fields (audit log)
- Role-based field restriction (bank details: hr_admin only)

#### `/employees/:id/documents`
**Actions:** View, Upload, Delete, Export
- Document list: Offer letter, ID proof, Experience certs, etc.
- Upload with type tag + expiry date
- Preview in modal (PDF / Image)
- Download individual or bulk zip

#### `/employees/:id/work-history`
**Actions:** View, Create, Edit, Delete
- Previous employment records
- Internal job changes (promotion, transfer)
- Timeline view

#### `/employees/:id/emergency-contacts`
**Actions:** View, Create, Edit, Delete
- Name, relationship, phone, email
- Min 1 contact required

#### `/org-chart`
**Actions:** View, Export
- Hierarchical tree: CEO → Department Heads → Managers → Employees
- Zoom + pan (D3 or react-d3-tree)
- Click node → employee profile
- Export as PNG / SVG

---

## 💼 Module 4 — Recruitment

### Pages

#### `/recruitment/jobs`
**Actions:** View, Create, Edit, Delete, Export
- Job posting list: Title, Department, Status, Applicants count, Posted date
- Status: Draft / Open / On Hold / Closed
- Filter by department, status, date range

#### `/recruitment/jobs/new`
**Actions:** Create
- Job title, department, location, type (Full-time/Part-time/Contract)
- Rich text JD editor (react-quill or tiptap)
- Skills tags input
- Openings count, salary range (optional)
- Publish immediately or schedule

#### `/recruitment/jobs/:id/edit`
**Actions:** Edit, Delete

#### `/recruitment/jobs/:id/applicants`
**Actions:** View, Export
- Kanban board: Applied → Screening → Interview → Offer → Hired / Rejected
- Drag-drop stage change
- Bulk reject with template email
- Source tracking (LinkedIn, Naukri, Referral, Direct)

#### `/recruitment/applicants/:id`
**Actions:** View, Edit
- Resume viewer (PDF embed)
- Stage history timeline
- Interview feedback from each round
- Internal notes (private, recruiter-only)
- Status change with email trigger

#### `/recruitment/interviews`
**Actions:** View, Create, Edit, Delete
- Calendar view + list view
- Schedule: Applicant, Interviewer(s), Date/Time, Mode (In-person/Video/Phone)
- Google Calendar / Outlook sync (optional)
- Auto email invite to interviewer + applicant

#### `/recruitment/offers/:id`
**Actions:** View, Create, Edit, Export
- Offer letter template with dynamic fields
- Generate PDF
- Digital acceptance tracking (link sent via email)
- Expiry date + reminder

#### `/recruitment/onboarding/:id`
**Actions:** View, Create, Edit
- Pre-onboarding checklist: documents, IT setup, access provisioning
- Day 1 checklist: welcome kit, induction schedule
- Task assignment to HR / Manager / IT
- Completion % tracker

---

## 🕐 Module 5 — Attendance & Time

### Pages

#### `/attendance`
**Actions:** View, Export
- Today's attendance summary: Present / Absent / Late / WFH / On Leave
- Department-wise breakdown bar chart
- Real-time update (polling every 5 min)

#### `/attendance/log`
**Actions:** View, Create (manual entry), Edit
- Daily log table: Employee, Check-in, Check-out, Hours worked, Status
- Manual entry for missed punches (requires reason + manager approval)
- Filter by date, department, status

#### `/attendance/shifts`
**Actions:** View, Create, Edit, Delete
- Shift templates: Morning (9–6), Night (10PM–7AM), Flexible, etc.
- Assign shift to employee or department
- Effective date range
- Shift swap request workflow

#### `/attendance/overtime`
**Actions:** View, Create, Edit, Export
- Overtime log with reason + approver
- OT rate calculation (1.5x / 2x based on policy)
- Monthly OT summary per employee
- Export for payroll processing

#### `/attendance/wfh`
**Actions:** View, Create, Edit
- WFH request: Date(s), reason
- Manager approval flow
- Monthly WFH count vs policy limit
- Calendar view

---

## 🏖️ Module 6 — Leave Management

### Pages

#### `/leave`
**Actions:** View, Export
- Leave dashboard: Today's leaves, Pending approvals, Leave utilization %
- Team calendar (who's on leave this week/month)

#### `/leave/apply`
**Actions:** Create, View (own history)
- Leave type dropdown (Annual, Sick, Casual, Maternity, etc.)
- Date range picker (excludes weekends + holidays)
- Half-day toggle
- Reason text
- Remaining balance shown live

#### `/leave/requests`
**Actions:** View, Approve, Reject, Delete (cancel own)
- List: Requester, Type, Dates, Days, Status, Applied on
- Filter by status, leave type, department, date
- Bulk approve/reject

#### `/leave/requests/:id`
**Actions:** View, Edit (approve/reject)
- Full request detail
- Leave balance at time of request
- Approval chain (if multi-level)
- Rejection reason required

#### `/leave/balances`
**Actions:** View, Edit (hr_admin only — manual adjustment)
- Employee-wise leave balance table
- Per leave type: Allocated / Used / Pending / Remaining
- Carry-forward tracking
- Lapse date (if policy has expiry)

#### `/leave/policies`
**Actions:** View, Create, Edit, Delete
- Leave type config: name, days/year, carry-forward limit, gender restriction, notice period
- Accrual rules (monthly, quarterly, upfront)
- Assign policy to department or designation

#### `/leave/holidays`
**Actions:** View, Create, Edit, Delete
- Annual holiday list with date + name + type (National / Regional / Optional)
- Import from CSV
- Multi-location support (different holidays per office location)

---

## 💰 Module 7 — Payroll

### Pages

#### `/payroll`
**Actions:** View, Export
- Payroll dashboard: Total payroll cost this month, Processed count, Pending count
- Month-wise payroll trend chart
- Quick actions: Run payroll, Download reports

#### `/payroll/salary-structures`
**Actions:** View, Create, Edit, Delete
- CTC breakdown templates: Basic, HRA, DA, Special Allowance, PF, ESI, PT, TDS
- % of CTC or fixed amount per component
- Assign structure to designation or individual employee

#### `/payroll/run`
**Actions:** Create, View
- Select month + year
- Preview payroll computation (editable overrides)
- Attendance integration: deductions for LOP (loss of pay)
- Validate before finalize (errors shown inline)
- Finalize → lock payroll → trigger payslip generation

#### `/payroll/payslips`
**Actions:** View, Export
- Payslip list: Employee, Month, Net Pay, Status (Generated/Sent/Viewed)
- Bulk download (ZIP of all PDFs)
- Bulk email (send payslip to employee email)

#### `/payroll/payslips/:id`
**Actions:** View, Export (PDF)
- Full payslip: Earnings, Deductions, Net Pay, YTD totals
- Company letterhead
- Digital signature option

#### `/payroll/taxes`
**Actions:** View, Create, Edit
- TDS configuration per slab
- Investment declaration by employee
- Form 16 generation (end of year)
- PT (Professional Tax) state-wise config

#### `/payroll/reimbursements`
**Actions:** View, Create, Edit, Delete
- Claim types: Travel, Medical, Internet, Food
- Employee submits with receipt upload
- Manager approval → HR approval → payroll inclusion
- Monthly cap per claim type

#### `/payroll/reports`
**Actions:** View, Export
- Bank transfer report (for salary upload to bank)
- PF / ESI monthly challan report
- PT deduction report
- Cost centre-wise payroll report

---

## 📈 Module 8 — Performance Management

### Pages

#### `/performance`
**Actions:** View, Export
- Performance dashboard: Active review cycles, Avg rating, Goal completion %
- Department-wise performance heatmap

#### `/performance/goals`
**Actions:** View, Create, Edit, Delete
- OKR / Goal list per employee
- Title, description, metric (KPI), target, current value, due date
- Status: Not started / In progress / At risk / Completed
- Manager can add / comment on employee goals

#### `/performance/cycles`
**Actions:** View, Create, Edit, Delete
- Review cycle config: Name, Period (Quarterly/Half-yearly/Annual), Start/End date
- Auto-trigger self-appraisal emails
- Phases: Goal Setting → Mid Review → Final Review
- Participant filter (All / Department / Designation)

#### `/performance/review/:cycleId/self`
**Actions:** View, Create, Edit
- Self appraisal form
- Goal-wise rating + comment
- Competency ratings (Communication, Leadership, etc.)
- Overall self-rating
- Submit → locks form → triggers manager review

#### `/performance/review/:cycleId/manager`
**Actions:** View, Create, Edit
- Same form + manager override rating
- Private notes (not visible to employee)
- Final rating (1–5 scale)
- Calibration flag (for normalization)

#### `/performance/360/:employeeId`
**Actions:** View, Create
- Anonymous peer feedback form
- Select peers from team
- 5-question structured form
- Responses visible to HR only (summary to employee)

#### `/performance/reports`
**Actions:** View, Export
- Rating distribution report
- High performers list
- PIP (Performance Improvement Plan) candidates
- Year-on-year rating trend per employee

---

## 🎓 Module 9 — Training & Development

### Pages

#### `/training/calendar`
**Actions:** View, Create, Edit, Delete
- Monthly calendar of scheduled trainings
- Training card: Title, Trainer, Date, Mode (Online/Offline), Seats
- Register / withdraw action for employees

#### `/training/courses`
**Actions:** View, Create, Edit, Delete
- Course library: Internal + External courses
- Category tags (Soft skills, Technical, Compliance, Leadership)
- Course detail: Duration, material links, prerequisites
- Assign mandatory courses to designation/department

#### `/training/my-trainings`
**Actions:** View, Register
- Employee's enrolled and completed trainings
- Completion certificate download
- Upcoming training reminders

#### `/training/reports`
**Actions:** View, Export
- Training hours per employee
- Completion rate per course
- Department-wise training investment
- Skills gap analysis (planned)

---

## 💻 Module 10 — Asset Management

### Pages

#### `/assets`
**Actions:** View, Create, Edit, Delete, Export
- Asset list: Asset ID, Name, Category, Assigned to, Status, Purchase date, Value
- Category filter: Laptop, Monitor, Mobile, Furniture, Vehicle, etc.
- Status: Available / Assigned / Under Repair / Retired

#### `/assets/new` & `/assets/:id/edit`
**Actions:** Create, Edit
- Asset details: Serial number, brand, model, purchase cost, warranty expiry
- QR code / barcode generation for asset tag

#### `/assets/:id/assign`
**Actions:** Create, Edit
- Assign to employee with date
- Condition at handover (Good / Fair / Damaged)
- Digital acknowledgement (employee signs off)

#### `/assets/:id/return`
**Actions:** Create, Edit
- Return date + condition at return
- Damage notes + deduction flag
- Auto update asset status to Available

#### `/assets/:id/history`
**Actions:** View, Export
- Full assignment history: who had it, when, return date, condition
- Repair records
- Depreciation value over time

---

## 📋 Module 11 — Reports & Analytics

### Pages

#### `/reports/headcount`
**Actions:** View, Export
- Total employees over time (monthly trend)
- Department-wise, location-wise, designation-wise breakdown
- New hires vs exits per month

#### `/reports/attrition`
**Actions:** View, Export
- Attrition rate % (monthly, quarterly, annual)
- Voluntary vs involuntary exit breakdown
- Avg tenure of exited employees
- Exit reason analysis (from exit interview data)

#### `/reports/payroll-summary`
**Actions:** View, Export
- Month-wise total payroll cost
- Component-wise breakdown (Basic, PF, TDS, Net)
- Department-wise cost center report

#### `/reports/leave-summary`
**Actions:** View, Export
- Leave utilization per employee
- Department-wise absenteeism
- Most taken leave types

#### `/reports/custom`
**Actions:** View, Create, Export
- Drag-drop report builder
- Choose fields from any module
- Apply filters, group by, sort
- Save as template
- Schedule email delivery (daily / weekly / monthly)

---

## ⚙️ Module 12 — Settings

### Pages

#### `/settings/company`
**Actions:** View, Edit
- Company name, logo, address, GST/TAN/PAN
- Financial year config (Apr–Mar / Jan–Dec)
- Default currency, timezone, date format
- Multi-location setup

#### `/settings/departments`
**Actions:** View, Create, Edit, Delete
- Department name, code, head (employee lookup)
- Parent department (for hierarchy)
- Cost centre code

#### `/settings/designations`
**Actions:** View, Create, Edit, Delete
- Designation name, level (L1–L8), department mapping
- Grade / band assignment

#### `/settings/email-templates`
**Actions:** View, Create, Edit, Delete
- Template types: Offer letter, Payslip, Leave approval, Interview invite, etc.
- Rich text editor with dynamic variables `{{employee_name}}`, `{{leave_dates}}`
- Preview before save

#### `/settings/integrations`
**Actions:** View, Create, Edit, Delete
- Slack (leave / attendance notifications)
- Google Calendar (interview sync)
- Biometric device (attendance punch API)
- Accounting software (payroll export)
- Webhook config per event type

#### `/settings/audit-logs`
**Actions:** View, Export
- All system actions with: User, Action, Module, Record ID, IP, Timestamp
- Filter by user, module, date range
- Tamper-proof (read-only, no delete)
- Export for compliance

---

## 🔔 Cross-Module Features

### Notifications & Alerts
| Trigger | Channel | Recipients |
|---|---|---|
| Leave approved / rejected | In-app + Email | Employee |
| Payslip generated | Email | Employee |
| New applicant on job post | In-app | HR Admin |
| Document expiry (30 days) | In-app + Email | HR Admin |
| Performance review due | In-app + Email | Employee + Manager |
| Asset warranty expiry | In-app | HR Admin |
| Probation end date | In-app | HR Admin + Manager |

### File Uploads — Global Rules
- Max size: 5MB per file
- Allowed types per context: `pdf`, `jpg`, `png`, `xlsx`, `csv`
- Storage: S3 or equivalent (never local filesystem in production)
- Virus scan on upload (ClamAV or cloud equivalent)
- Signed URL for download (expires in 15 min)

### Search — Global
- Global search bar (Cmd+K): employees, jobs, assets, documents
- Debounced input (300ms)
- Results grouped by module
- Recent searches stored in localStorage (last 10)

---

## 🗂️ Route Map Summary

| Module | Routes |
|---|---|
| Auth | `/login`, `/forgot-password`, `/reset-password`, `/unauthorized`, `/roles-permissions` |
| Dashboard | `/dashboard`, `/dashboard/analytics`, `/notifications` |
| Employee | `/employees`, `/employees/new`, `/employees/:id`, `/employees/:id/edit`, `/employees/:id/documents`, `/employees/:id/work-history`, `/employees/:id/emergency-contacts`, `/org-chart` |
| Recruitment | `/recruitment/jobs`, `/recruitment/jobs/new`, `/recruitment/jobs/:id/edit`, `/recruitment/jobs/:id/applicants`, `/recruitment/applicants/:id`, `/recruitment/interviews`, `/recruitment/offers/:id`, `/recruitment/onboarding/:id` |
| Attendance | `/attendance`, `/attendance/log`, `/attendance/shifts`, `/attendance/overtime`, `/attendance/wfh` |
| Leave | `/leave`, `/leave/apply`, `/leave/requests`, `/leave/requests/:id`, `/leave/balances`, `/leave/policies`, `/leave/holidays` |
| Payroll | `/payroll`, `/payroll/salary-structures`, `/payroll/run`, `/payroll/payslips`, `/payroll/payslips/:id`, `/payroll/taxes`, `/payroll/reimbursements`, `/payroll/reports` |
| Performance | `/performance`, `/performance/goals`, `/performance/cycles`, `/performance/review/:cycleId/self`, `/performance/review/:cycleId/manager`, `/performance/360/:employeeId`, `/performance/reports` |
| Training | `/training/calendar`, `/training/courses`, `/training/my-trainings`, `/training/reports` |
| Assets | `/assets`, `/assets/new`, `/assets/:id/edit`, `/assets/:id/assign`, `/assets/:id/return`, `/assets/:id/history` |
| Reports | `/reports/headcount`, `/reports/attrition`, `/reports/payroll-summary`, `/reports/leave-summary`, `/reports/custom` |
| Settings | `/settings/company`, `/settings/departments`, `/settings/designations`, `/settings/email-templates`, `/settings/integrations`, `/settings/audit-logs` |

---

## 🚀 Recommended Build Order

```
Phase 1 — Foundation (Week 1–2)
  Auth + Role system + Dashboard skeleton + Employee CRUD

Phase 2 — Core HR (Week 3–4)
  Attendance + Leave Management + Leave Approvals

Phase 3 — Payroll (Week 5–6)
  Salary structure + Run payroll + Payslips

Phase 4 — Talent (Week 7–8)
  Recruitment pipeline + Performance cycles

Phase 5 — Support modules (Week 9–10)
  Training + Assets + Reports + Settings

Phase 6 — Polish (Week 11–12)
  Notifications + Global search + Audit logs + E2E testing + Lighthouse audit
```

---

*Generated for opencode — use alongside `senior-frontend.md` rules file.*
