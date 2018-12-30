import { LocalPage, LocalPageTypes, PageResponse, StrIndex } from "../models";

export class PageExtensions {
    public static mergeOrAddPage<TKey>(existingPages: StrIndex<LocalPageTypes<TKey>> = {}, newPage: PageResponse<TKey>, loadingState: 'OK' | 'loading' = 'OK'): StrIndex<LocalPageTypes<TKey>> {
        let currentPageType = existingPages[newPage.query];
        if (!currentPageType || currentPageType === null) {
            currentPageType = new LocalPageTypes({
                totalCount: newPage.totalCount
            });
            existingPages[newPage.query] = currentPageType;
        } else {
            currentPageType.totalCount = newPage.totalCount;
        }

        let currentPages = currentPageType.pages[newPage.pageSize + ':' + newPage.sort];
        if (!currentPages || currentPages === null) {
            currentPageType.pages[newPage.pageSize + ':' + newPage.sort] = [];
        }

        let currentPage = currentPageType.pages[newPage.pageSize + ':' + newPage.sort][newPage.pageNumber];
        if (!currentPage || currentPage === null) {
            currentPageType.pages[newPage.pageSize + ':' + newPage.sort][newPage.pageNumber] = new LocalPage({
                ids: newPage.ids,
                links: newPage.links,
                loadingState
            });
        } else {
            currentPage.ids = newPage.ids;
            currentPage.links = newPage.links;
            currentPage.loadingState = loadingState;
        }

        return existingPages;
    }
}