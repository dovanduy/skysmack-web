import { Directive, OnInit, OnDestroy, Input, Inject, ElementRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HotKeyOptions } from '@skysmack/framework';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[hotkey]' })
export class HotkeyDirective implements OnInit, OnDestroy {
    private dispose: Function;
    @Input('hotkey') options: HotKeyOptions;

    constructor(
        private elementRef: ElementRef,
        private eventManager: EventManager,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        if (this.options) {
            if (!this.options.eventName) {
                this.options.eventName = 'keydown';
            }
            if (!this.options.shiftKey) {
                this.options.shiftKey = false;
            }
            if (!this.options.ctrlKey) {
                this.options.ctrlKey = false;
            }
            if (!this.options.altKey) {
                this.options.altKey = false;
            }
            if (this.options.keyCode >= 0 && this.options.action) {
                const handler = (e) => {
                    if (!e.hotKeyExecuted) {
                        if (e.keyCode === this.options.keyCode && e.altKey === this.options.altKey && e.ctrlKey === this.options.ctrlKey && e.shiftKey === this.options.shiftKey) {
                            e.preventDefault();
                            e.hotKeyExecuted = true;
                            if (typeof this.options.action === 'string') {
                                this.router.navigate([this.options.action]);
                            } else {
                                this.options.action();
                            }
                        }
                    }
                };

                const targetDomElement = this.document as any;
                this.dispose = this.eventManager.addEventListener(targetDomElement, this.options.eventName, handler);
            }
        }
    }

    ngOnDestroy() {
        if (this.dispose) {
            this.dispose();
        }
    }
}
