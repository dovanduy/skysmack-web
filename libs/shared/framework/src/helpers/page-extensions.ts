import { LoadingState } from './loading-state';
import { StrIndex } from '../models/indexes';
import { LocalPageTypes } from '../models/local-page-types';
import { PageResponse } from '../models/page-response';
import { LocalPage } from '../models/local-page';

export class PageExtensions {
    public static mergeOrAddPage<TKey>(existingPages: StrIndex<LocalPageTypes<TKey>> = {}, newPage: PageResponse<TKey>, loadingState: LoadingState = LoadingState.OK): StrIndex<LocalPageTypes<TKey>> {
        let currentPageType = existingPages[newPage.query];
        if (!currentPageType || currentPageType === null) {
            currentPageType = new LocalPageTypes();
            existingPages[newPage.query] = currentPageType;
        } 
        
        if (newPage.totalCount || newPage.totalCount === 0) {
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

    public static mergeOrAddPageStatus<TKey>(existingPages: StrIndex<LocalPageTypes<TKey>> = {}, newPage: PageResponse<TKey>, loadingState: LoadingState = LoadingState.OK): StrIndex<LocalPageTypes<TKey>> {
        let currentPageType = existingPages[newPage.query];
        if (!currentPageType || currentPageType === null) {
            currentPageType = new LocalPageTypes();
            existingPages[newPage.query] = currentPageType;
        }

        let currentPages = currentPageType.pages[newPage.pageSize + ':' + newPage.sort];
        if (!currentPages || currentPages === null) {
            currentPageType.pages[newPage.pageSize + ':' + newPage.sort] = [];
        }

        let currentPage = currentPageType.pages[newPage.pageSize + ':' + newPage.sort][newPage.pageNumber];
        if (!currentPage || currentPage === null) {
            currentPageType.pages[newPage.pageSize + ':' + newPage.sort][newPage.pageNumber] = new LocalPage({
                loadingState,
                ids: []
            });
        } else {
            currentPage.loadingState = loadingState;
        }

        return existingPages;
    }
}
