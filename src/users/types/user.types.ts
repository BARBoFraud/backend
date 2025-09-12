export type CreateUserData = {
    name: string;
    last_name1: string;
    last_name2: string;
    email: string;
    password: string;
    salt: string;
};

export type UserDb = {
    id: number;
    name: string;
    last_name1: string;
    last_name2: string;
    email: string;
    password: string;
    salt: string;
};
