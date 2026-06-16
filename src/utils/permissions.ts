export type UserRole = 'super_admin' | 'hr_admin' | 'manager' | 'employee' | 'auditor';

export const ROLES = {
  SUPER_ADMIN: 'super_admin' as UserRole,
  HR_ADMIN: 'hr_admin' as UserRole,
  MANAGER: 'manager' as UserRole,
  EMPLOYEE: 'employee' as UserRole,
  AUDITOR: 'auditor' as UserRole,
} as const;

export interface Permission {
  module: string;
  actions: Array<'view' | 'create' | 'edit' | 'delete' | 'export' | 'approve'>;
}

export const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [{ module: '*', actions: ['view', 'create', 'edit', 'delete', 'export', 'approve'] }],
  hr_admin: [
    { module: 'dashboard', actions: ['view', 'export'] },
    { module: 'employees', actions: ['view', 'create', 'edit', 'export'] },
    { module: 'recruitment', actions: ['view', 'create', 'edit', 'delete', 'export'] },
    { module: 'attendance', actions: ['view', 'create', 'edit', 'export'] },
    { module: 'leave', actions: ['view', 'create', 'edit', 'delete', 'export', 'approve'] },
    { module: 'payroll', actions: ['view', 'create', 'edit', 'export'] },
    { module: 'performance', actions: ['view', 'create', 'edit', 'export'] },
    { module: 'training', actions: ['view', 'create', 'edit', 'delete', 'export'] },
    { module: 'assets', actions: ['view', 'create', 'edit', 'delete', 'export'] },
    { module: 'reports', actions: ['view', 'export'] },
  ],
  manager: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'employees', actions: ['view'] },
    { module: 'attendance', actions: ['view'] },
    { module: 'leave', actions: ['view', 'approve'] },
    { module: 'performance', actions: ['view', 'edit'] },
  ],
  employee: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'leave', actions: ['view', 'create'] },
    { module: 'payroll', actions: ['view'] },
    { module: 'performance', actions: ['view'] },
    { module: 'training', actions: ['view', 'create'] },
  ],
  auditor: [
    { module: 'dashboard', actions: ['view', 'export'] },
    { module: 'employees', actions: ['view', 'export'] },
    { module: 'recruitment', actions: ['view', 'export'] },
    { module: 'attendance', actions: ['view', 'export'] },
    { module: 'leave', actions: ['view', 'export'] },
    { module: 'payroll', actions: ['view', 'export'] },
    { module: 'performance', actions: ['view', 'export'] },
    { module: 'training', actions: ['view', 'export'] },
    { module: 'assets', actions: ['view', 'export'] },
    { module: 'reports', actions: ['view', 'export'] },
  ],
};

export function hasPermission(
  role: UserRole,
  module: string,
  action: Permission['actions'][number]
): boolean {
  const perms = DEFAULT_PERMISSIONS[role] ?? [];
  const modulePerms = perms.find((p) => p.module === module || p.module === '*');
  if (!modulePerms) return false;
  return modulePerms.actions.includes(action) || modulePerms.actions.includes('edit'); // rough check
}
