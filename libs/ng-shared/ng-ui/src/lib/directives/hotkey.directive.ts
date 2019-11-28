import { Directive, OnInit, OnDestroy, Input, Inject, ElementRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[hotkey]' })
export class HotkeyDirective implements OnInit, OnDestroy {
    private dispose: Function;
    @Input('hotkey') options: { action: string | Function, keys: string, log: string };

    constructor(
        private elementRef: ElementRef,
        private eventManager: EventManager,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        if (this.options.keys && this.options.action) {
            const event = `keydown.${this.options.keys}`;
            const handler = (e) => {
                if (!e.hotKeyExecuted) {
                    e.preventDefault();
                    e.hotKeyExecuted = true;
                    if (typeof this.options.action === 'string') {
                        this.router.navigate([this.options.action]);
                    } else {
                        this.options.action();
                    }
                }
            };

            const targetDomElement = this.document as any;
            this.dispose = this.eventManager.addEventListener(targetDomElement, event, handler);
        }
    }

    ngOnDestroy() {
        if (this.dispose) {
            this.dispose();
        }
    }
}
