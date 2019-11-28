import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { EventManager } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { StrIndex } from '@skysmack/framework';

// File contents taken from
// https://netbasal.com/diy-keyboard-shortcuts-in-your-angular-application-4704734547a2

interface Options {
    /**
     * Any DOM element needed in callback.
     * Default is document.
     */
    element: any;

    /**
     * Keyboard keys activating the callback.
     * Example: 'shift.c' equals shift + c.
     */
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class HotkeysService {

    private hotkeyRegistry: StrIndex<SubscriptionLike> = {};

    private defaults: Partial<Options> = {
        element: this.document
    };

    constructor(
        private eventManager: EventManager,
        @Inject(DOCUMENT) private document: Document
    ) { }

    public add(options: Partial<Options>, action: () => void): void {
        const merged = { ...this.defaults, ...options };
        const event = `keydown.${merged.keys}`;

        if (this.hotkeyRegistry[options.keys]) {
            this.hotkeyRegistry[options.keys].unsubscribe();
        }

        const hotKeySubscription = new Observable(observer => {
            const handler = (e) => {
                e.preventDefault();
                observer.next(e);
            };

            const dispose = this.eventManager.addEventListener(
                merged.element, event, handler
            );

            return () => {
                dispose();
            };
        }).pipe(tap(() => action()), tap(() => console.log(`${options.keys} called`))).subscribe();

        this.hotkeyRegistry[options.keys] = hotKeySubscription;
    }

    public remove(keys: string): void {
        const hotkey = this.hotkeyRegistry[keys];
        if (hotkey) {
            hotkey.unsubscribe();
        }
    }
}