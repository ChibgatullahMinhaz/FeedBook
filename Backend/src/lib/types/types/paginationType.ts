export type PaniationaOptionType = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export type paginationsOptionsResult = {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
}