export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  password: string;
  avatar?: string;
}
