export interface CreateReportData {
    description: string;
    categoryId: number;
    applicationId: number;
    title: string;
    statusId: number;
    anonymous: boolean;
    url?: string;
    website?: string;
    socialMedia?: string;
    phoneNumber?: string;
    createdAt?: Date;
    username?: string;
    email?: string;
    imageId?: string;
}

export interface UpdateReportData {
    userId: number;
    reportId: number;
    description: string;
    categoryId: number;
    statusId: number;
    anonymous: boolean;
    url?: string;
    website?: string;
    socialMedia?: string;
    phoneNumber?: string;
    createdAt?: Date;
    username?: string;
    email?: string;
    imageId?: string;
}

export interface ShortHistoryReport {
    id: number;
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
    createdAt: Date;
    description: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    image?: string;
}

export interface FeedReport {
    name: string;
    lastName: string;
    id: number;
    category: string;
    createdAt: Date;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    likesCount: number;
    commentsCount: number;
    userLiked: boolean;
}

export interface ShortDashboardReport {
    name?: string;
    lastName?: string;
    id: number;
    category: string;
    createdAt: Date;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
}

export interface DashboardReport {
    name?: string;
    lastName?: string;
    id: number;
    category: string;
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

export interface Comment {
    id: number;
    content: string;
    name: string;
    lastName: string;
    createdAt: Date;
}

export interface SearchQueryReport {
    id: number;
    category: string;
    website?: string;
    socialMedia?: string;
    email?: string;
    phoneNumber?: string;
}

export interface SearchReport {
    name?: string;
    lastName?: string;
    id: number;
    category: string;
    createdAt: Date;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    socialMedia?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    likesCount: number;
    commentsCount: number;
    userLiked: boolean;
}
