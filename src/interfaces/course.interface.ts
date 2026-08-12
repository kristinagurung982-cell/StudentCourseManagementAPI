export interface ICourse {
  id: number;
  title: string;
  description: string;
  duration: string;
  isDeleted?: boolean;
}

export interface ICourseCreate {
  title: string;
  description: string;
  duration: string;
}

export interface ICourseUpdate {
  title?: string;
  description?: string;
  duration?: string;
}