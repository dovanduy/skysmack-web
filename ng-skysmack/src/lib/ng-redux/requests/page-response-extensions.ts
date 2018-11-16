import { HttpHeaders } from '@angular/common/http';
import { PageResponse } from '@skysmack/framework';
import * as  parseLinkHeader from 'parse-link-header';

export class PageResponseExtensions {
    public static getPageResponse<TKey>(headers: HttpHeaders, ids: TKey[], query: string, sort: string): PageResponse<TKey> {
        const pageResponse = new PageResponse<TKey>({
            ids,
            links: PageResponseExtensions.extractLinks(headers),
            query,
            sort
        });

        if (headers.has('x-page-number')) {
            pageResponse.pageNumber = Number(headers.get('x-page-number'));
        }
        if (headers.has('x-page-size')) {
            pageResponse.pageSize = Number(headers.get('x-page-size'));
        }
        if (headers.has('x-total-count')) {
            pageResponse.totalCount = Number(headers.get('x-total-count'));
        }

        return pageResponse;
    }

    public static extractLinks(headers: HttpHeaders) {
        const link = headers.get('link');
        if (link) {
            try {
                const links = parseLinkHeader(link);
                if (links) {
                    return links;
                } else {
                    return null;
                }
            } catch { }
        }
        return null;
    }
}