import { USERS } from "@/data/AUTH";
import type { User } from "@/interfaces/User";

const toUser = (raw: any): User => {
  const now = new Date().toISOString();
  return {
    id: raw.id,
    name: `${raw.first_name} ${raw.last_name}`.trim(),
    email: raw.email,
    phone: raw.tel,
    avatar: raw.avatar || `https://i.pravatar.cc/150?u=${raw.id}`,
    createdAt: raw.createdAt || now,
    updatedAt: raw.updatedAt || now,
  };
};

export const login = async (email: string, password: string) => {
  const user = USERS.find(
    (user) => user.email === email && user.password === password,
  );
  if (!user) {
    return {
      message: "Login failed",
      user: null,
    };
  }
  return {
    message: "Login successful",
    user: toUser(user),
    token: "token",
  };
};

export const register = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  tel: string,
) => {
  const user = USERS.find((user) => user.email === email);
  if (user) {
    return {
      message: "Email already exists",
      user: null,
    };
  }
  const now = new Date().toISOString();
  const newUser = {
    id: (USERS.length + 1).toString(),
    first_name,
    last_name,
    email,
    tel,
    password,
    createdAt: now,
    updatedAt: now,
  };
  USERS.push(newUser);
  return {
    message: "Register successful",
    user: toUser(newUser),
    token: "token",
  };
};
