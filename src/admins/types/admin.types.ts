export type AdminDb = {
    id: number;
    username: string;
    password: string;
    salt: string;
};

export type CreateAdminData = {
    username: string;
    password: string;
    salt: string;
};
