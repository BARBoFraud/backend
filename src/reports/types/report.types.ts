export interface CreateReportData {
    description: string;
    categoryId: number;
    title: string;
    statusId: number;
    anonymous: boolean;
    application?: string;
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
    title: string;
    description: string;
    categoryId: number;
    statusId: number;
    anonymous: boolean | null;
    url: string | null;
    application: string | null;
    website: string | null;
    phoneNumber: string | null;
    username: string | null;
    email: string | null;
    imageId: string | null;
}

export interface ShortHistoryReport {
    id: number;
    title: string;
    createdAt: Date;
    category: string;
    status: string;
}

export interface HistoryReport {
    id: number;
    category: string;
    status: string;
    createdAt: Date;
    title: string;
    description: string;
    url?: string;
    website?: string;
    application?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    image?: string;
}

export interface FeedReport {
    name: string;
    lastName: string;
    id: number;
    riskLevel: string;
    category: string;
    createdAt: Date;
    title: string;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    application?: string;
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
    title: string;
}

export interface DashboardReport {
    name?: string;
    lastName?: string;
    id: number;
    category: string;
    createdAt: Date;
    riskLevel: string;
    title: string;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    application?: string;
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
    createdAt: Date;
    title: string;
    riskLevel: string;
    category: string;
}

export interface SearchReport {
    name?: string;
    lastName?: string;
    id: number;
    category: string;
    riskLevel: string;
    createdAt: Date;
    title: string;
    description: string;
    image?: string;
    url?: string;
    website?: string;
    application?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    likesCount: number;
    commentsCount: number;
    userLiked: boolean;
}

export interface ReportDateInfo {
    date: string;
    num: number;
}
