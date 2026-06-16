'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/utils/formatDate';
import {
  Users,
  UserCheck,
  CalendarX,
  Briefcase,
  PartyPopper,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const headcountData = [
  { month: 'Jan', employees: 120 },
  { month: 'Feb', employees: 128 },
  { month: 'Mar', employees: 135 },
  { month: 'Apr', employees: 132 },
  { month: 'May', employees: 140 },
  { month: 'Jun', employees: 148 },
];

const deptData = [
  { name: 'Engineering', value: 45 },
  { name: 'Sales', value: 25 },
  { name: 'HR', value: 10 },
  { name: 'Marketing', value: 15 },
  { name: 'Operations', value: 20 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const activities = [
  { id: '1', action: 'John Doe applied for leave', time: new Date().toISOString() },
  { id: '2', action: 'Sarah Smith approved a reimbursement', time: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '3', action: 'New job posting created: Senior React Dev', time: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: '4', action: 'June payroll finalized', time: new Date(Date.now() - 1000 * 60 * 300).toISOString() },
];

const approvals = [
  { id: '1', type: 'Leave', requester: 'John Doe', status: 'Pending' },
  { id: '2', type: 'Reimbursement', requester: 'Alice Brown', status: 'Pending' },
];

const birthdays = [
  { name: 'John Doe', date: 'Jun 20' },
  { name: 'Sarah Smith', date: 'Jun 22' },
];

export default function DashboardPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your organization" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Employees" value="148" change="+8 this month" changeType="positive" icon={Users} />
        <StatCard title="Present Today" value="132" change="89% attendance" changeType="positive" icon={UserCheck} />
        <StatCard title="On Leave" value="12" change="3 unplanned" changeType="warning" icon={CalendarX} />
        <StatCard title="Open Positions" value="6" change="2 new this week" changeType="neutral" icon={Briefcase} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Headcount Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={headcountData}>
                  <defs>
                    <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="employees" stroke="#2563eb" fill="url(#colorEmployees)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {deptData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {deptData.map((d, idx) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-text-muted">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-3">
                {activities.map((a) => (
                  <li key={a.id} className="flex items-start justify-between text-sm">
                    <span className="text-text">{a.action}</span>
                    <span className="shrink-0 text-xs text-text-muted">{formatDate(a.time, 'h:mm a')}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {approvals.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-3">
                {approvals.map((a) => (
                  <li key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-text">{a.type} — {a.requester}</span>
                    <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">{a.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Birthdays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <PartyPopper className="h-5 w-5 text-primary" />
              <ul className="space-y-2 text-sm">
                {birthdays.map((b, i) => (
                  <li key={i} className="text-text">{b.name} — <span className="text-text-muted">{b.date}</span></li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
