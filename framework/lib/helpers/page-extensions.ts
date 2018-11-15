import { LocalPage, LocalPageTypes, PageResponse, StrIndex, LocalPages } from "../models";

export class PageExtensions {
    public static mergeOrAddPage<TKey>(existingPages: StrIndex<LocalPageTypes<TKey>>, newPage: PageResponse<TKey>): StrIndex<LocalPageTypes<TKey>> {
        console.log(existingPages, newPage);
        let currentPageType = existingPages[newPage.query];
        if (!currentPageType || currentPageType === null) {
            currentPageType = new LocalPageTypes({
                totalCount: newPage.totalCount,
                query: newPage.query
            });
            existingPages[newPage.query] = currentPageType;
        } else {
            currentPageType.totalCount = newPage.totalCount;
            currentPageType.query = newPage.query;
        }

        let currentPages = currentPageType.pages[newPage.pageSize + ':' + newPage.sort];
        if (!currentPages && currentPages === null) {
            currentPages = new LocalPages({
                pageSize: newPage.pageSize,
                sort: newPage.sort
            })
            currentPageType.pages[newPage.pageSize + ':' + newPage.sort] = currentPages;
        } else {
            currentPages.pageSize = newPage.pageSize;
            currentPages.sort = newPage.sort;
        }

        let currentPage = currentPages.pages[newPage.pageNumber];
        if (!currentPage && currentPage === null) {
            currentPage = new LocalPage({
                ids: newPage.ids,
                links: newPage.links,
                pageNumber: newPage.pageNumber
            });
            currentPages.pages[newPage.pageNumber] = currentPage;
        } else {
            currentPage.ids = newPage.ids;
            currentPage.links = newPage.links;
            currentPage.pageNumber = newPage.pageNumber;
        }

        return existingPages;
    }
}