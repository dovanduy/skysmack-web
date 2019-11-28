import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy, Input, Inject, ElementRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SubscriptionHandler } from '@skysmack/framework';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[hotkeyUrl]' })
export class HotkeyUrlDirective implements OnInit, OnDestroy {

    private subscriptionHandler = new SubscriptionHandler();

    @Input('hotkeyUrl') options: { url: string, keys: string, log: string };

    constructor(
        private elementRef: ElementRef,
        private eventManager: EventManager,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        if (this.options.keys && this.options.url) {
            const event = `keydown.${this.options.keys}`;
            this.subscriptionHandler.register(new Observable(observer => {
                const handler = (e) => {
                    e.preventDefault();
                    console.log(this.options.log, e, observer);
                    observer.next(e);
                };

                // const targetDomElement = this.viewContainer.element.nativeElement;
                const targetDomElement = this.document as any; //this.templateRef.elementRef.nativeElement;
                const dispose = this.eventManager.addEventListener(targetDomElement, event, handler);

                return () => {
                    dispose();
                };
            }).pipe(
                tap(() => this.router.navigate([this.options.url])),
            ).subscribe());
        }
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }
}
