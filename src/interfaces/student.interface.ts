export interface IStudent {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  isDeleted?: boolean;
}

export interface IStudentCreate {
  name: string;
  email: string;
  phone: string;
  age: number;
}

export interface IStudentUpdate {
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
}