export interface Employee extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  location?: string;
  managerId?: string;
  avatar?: string;
  bankAccount?: string;
  bankIfsc?: string;
  salaryStructureId?: string;
}

interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  joinDate: string;
  location?: string;
  managerId?: string;
  bankAccount?: string;
  bankIfsc?: string;
  salaryStructureId?: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}
