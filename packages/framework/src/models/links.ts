export interface Links {
    first?: {
        pageNumber: number,
        pageSize: string,
        rel: string,
        url: string
    };

    last?: {
        pageNumber: number,
        pageSize: number,
        rel: string,
        url: string
    };

    next?: {
        pageNumber: number,
        pageSize: number,
        rel: string,
        url: string
    };

    prev?: {
        pageNumber: number,
        pageSize: number,
        rel: string,
        url: string
    };
}
