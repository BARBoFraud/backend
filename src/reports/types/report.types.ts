export interface ShortReport {
    id: number;
    description: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    phoneNumber?: string;
    createdAt?: Date;
    username?: string;
    email?: string;
    category: string;
    status: string;
}

export interface HistoryReport {
    id: number;
    category: string;
    status: string;
    createdAt?: Date;
    description?: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    image?: string;
}

export interface FeedReport {
    id: number;
    category: string;
    status: string;
    createdAt: Date;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
}
