export interface User {
  id: number;
  firstname: string;
  lastname: string;
  grade: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  authenticated: boolean;
  admin: boolean;
}

export interface ScoreTally {
  username: string;
  firstname: string;
  lastname: string;
  total_points: number;
}
