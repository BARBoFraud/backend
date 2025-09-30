export type CreateUserData = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    passwordHash: string;
    salt: string;
};

export type UserData = {
    id: number;
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
};

export type UserDb = {
    id: number;
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    password: string;
    salt: string;
    active: Boolean;
};

export type UpdateUserData = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
};
