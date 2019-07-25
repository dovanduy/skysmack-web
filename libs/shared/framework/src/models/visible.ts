import { BehaviorSubject } from 'rxjs';

export interface Visible {
    show(): BehaviorSubject<boolean>;
    render(): BehaviorSubject<boolean>;
}
