import { USERS } from "@/data/AUTH";

export const login = async (email: string, password: string) => {
    const user = USERS.find((user) => user.email === email && user.password === password);
    if (!user) {
        return {
            message: "Login failed",
            user: null
            
        };  
    }
    return {
        message: "Login successful",
        user,
        token:'token'
    };
}

export const register = async (email: string, password: string, first_name: string, last_name: string, tel: string) => {
    const user = USERS.find((user) => user.email === email);
    if (user) {
        return {
            message: "Email already exists",
            user: null,
        };
    }
    const newUser = {
        id: (USERS.length + 1).toString(),
        first_name,
        last_name,
        email,
        tel,
        password,
    };
    USERS.push(newUser);
    return {
        message: "Register successful",
        user: newUser,
        token:'token'
    };
}