import { HttpHeaders } from "@angular/common/http";
import { PageResponse } from "skysmack-framework";
// import * as  parseLinkHeader from "parse-link-header";

export class PageResponseExtensions {
    public static getPageResponse<TKey>(headers: HttpHeaders, ids: TKey[]): PageResponse<TKey> {
        let pageResponse = new PageResponse<TKey>({
            ids: ids
        });

        const link = headers.get('link');
        if (link) {
            // try {
            //     const links = parseLinkHeader(link);
            //     if (links) {
            //         pageResponse.links = links;
            //     }
            // } catch { }
        }

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
}