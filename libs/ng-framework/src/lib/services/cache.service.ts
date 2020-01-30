import { Injectable } from '@angular/core';
import { StrIndex } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

/**
 * Helps caching RxJS streams.
 */
@Injectable({ providedIn: 'root' })
export class CacheService {
    private caches: StrIndex<{
        stream$: Observable<any>,
        timeout: number,
        timedout: boolean
    }> = {};

    public cache<T>(id: string, stream$: Observable<unknown>, cacheTimeOut: number = 3000): Observable<T> {
        // Set cache
        let cache = this.caches[id];
        if (!cache) {
            cache = {
                stream$,
                timeout: cacheTimeOut,
                timedout: true
            };

            this.caches[id] = cache;
        }

        // Cache logic
        if (cache.timedout) {
            // Cache timed out. Return new cache.
            cache.stream$ = stream$.pipe(
                shareReplay(1)
            );
            cache.timedout = false;
            setTimeout(() => {
                cache.timedout = true;
            }, cache.timeout);

            return cache.stream$;
        } else {
            // Cache not timed out. Return old cache.
            return cache.stream$;
        }
    }
}