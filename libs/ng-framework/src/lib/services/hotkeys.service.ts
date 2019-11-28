import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { EventManager } from '@angular/platform-browser';

// File contents taken from
// https://netbasal.com/diy-keyboard-shortcuts-in-your-angular-application-4704734547a2

interface Options {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class HotkeysService {
    private defaults: Partial<Options> = {
        element: this.document
    };

    constructor(
        private eventManager: EventManager,
        @Inject(DOCUMENT) private document: Document
    ) { }

    public addShortcut(options: Partial<Options>) {
        const merged = { ...this.defaults, ...options };
        const event = `keydown.${merged.keys}`;

        return new Observable(observer => {
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
        })
    }
}