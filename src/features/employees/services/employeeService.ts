import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee.types';

const DELAY = 600;

const MOCK_EMPLOYEES: Employee[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `emp-${i + 1}`,
  employeeId: `E${1000 + i + 1}`,
  firstName: ['John', 'Sarah', 'Alex', 'Emily', 'Michael', 'Jessica', 'David', 'Emma', 'Daniel', 'Sophia', 'James', 'Olivia', 'Robert', 'Isabella', 'William'][i],
  lastName: ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Perez'][i],
  email: `user${i + 1}@company.com`,
  phone: `555-010${i}`,
  department: ['Engineering', 'Sales', 'HR', 'Marketing', 'Operations'][i % 5],
  designation: ['Senior Engineer', 'Sales Manager', 'HR Executive', 'Marketing Lead', 'Operations Manager'][i % 5],
  status: i % 7 === 0 ? 'Inactive' : 'Active',
  joinDate: `2023-0${(i % 12) + 1}-15T00:00:00Z`,
  location: ['New York', 'London', 'Remote', 'Singapore', 'Berlin'][i % 5],
  managerId: undefined,
  avatar: '',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}));

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    await new Promise((res) => setTimeout(res, DELAY));
    return MOCK_EMPLOYEES;
  },
  getById: async (id: string): Promise<Employee | null> => {
    await new Promise((res) => setTimeout(res, DELAY));
    return MOCK_EMPLOYEES.find((e) => e.id === id) ?? null;
  },
  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    await new Promise((res) => setTimeout(res, DELAY));
    const created: Employee = {
      status: 'Active',
      ...data,
      id: crypto.randomUUID(),
      employeeId: `E${10000 + MOCK_EMPLOYEES.length}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Employee;
    MOCK_EMPLOYEES.unshift(created);
    return created;
  },
  update: async (id: string, data: UpdateEmployeeDto): Promise<Employee> => {
    await new Promise((res) => setTimeout(res, DELAY));
    const idx = MOCK_EMPLOYEES.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Not found');
    MOCK_EMPLOYEES[idx] = { ...MOCK_EMPLOYEES[idx], ...data, updatedAt: new Date().toISOString() } as Employee;
    return MOCK_EMPLOYEES[idx];
  },
  delete: async (id: string): Promise<void> => {
    await new Promise((res) => setTimeout(res, DELAY));
    const idx = MOCK_EMPLOYEES.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Not found');
    MOCK_EMPLOYEES.splice(idx, 1);
  },
};
