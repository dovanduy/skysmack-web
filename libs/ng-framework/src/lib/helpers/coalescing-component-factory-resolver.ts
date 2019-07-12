/**
 * Taken from: https://github.com/jonrimmer/angular-coalescing-component-factory-resolver/blob/master/src/app/coalescing-component-factory-resolver.service.ts
 * Also, see this thread (jonrimmer commented on Apr 11): https://github.com/angular/angular/issues/14324
 * 
 * Helps fix the issue where lazy loaded component's components are needed in other modules entry components.
 */

import {
  Injectable,
  ComponentFactoryResolver,
  Type,
  ComponentFactory
} from '@angular/core';

@Injectable()
export class CoalescingComponentFactoryResolver extends ComponentFactoryResolver {
  private rootResolve: (component: Type<any>) => ComponentFactory<any>;

  private inCall = false;

  private readonly resolvers = new Map<
    ComponentFactoryResolver,
    (component: Type<any>) => ComponentFactory<any>
  >();

  constructor(private readonly rootResolver: ComponentFactoryResolver) {
    super();
  }

  init() {
    this.rootResolve = this.rootResolver.resolveComponentFactory;
    this.rootResolver.resolveComponentFactory = this.resolveComponentFactory;
  }

  public registerResolver(resolver: ComponentFactoryResolver) {
    const original = resolver.resolveComponentFactory;
    this.resolvers.set(resolver, original);
  }

  public resolveComponentFactory = <T>(
    component: Type<T>
  ): ComponentFactory<T> => {
    // Prevents cyclic calls.
    if (this.inCall) {
      return null;
    }

    this.inCall = true;
    try {
      const result = this.resolveInternal(component);
      return result;
    } finally {
      this.inCall = false;
    }
  };

  private resolveInternal = <T>(component: Type<T>): ComponentFactory<T> => {
    for (const [resolver, fn] of Array.from(this.resolvers.entries())) {
      try {
        const factory = fn.call(resolver, component);
        if (factory) {
          return factory;
        }
      } catch { }
    }

    return this.rootResolve.call(this.rootResolver, component);
  };
}