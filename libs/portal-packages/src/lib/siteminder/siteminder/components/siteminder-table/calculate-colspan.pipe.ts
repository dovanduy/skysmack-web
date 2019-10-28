import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({ name: 'calculateColspan' })
export class CalculateColspanPipe implements PipeTransform {
    transform(logic: (...args: number[]) => Observable<number>, ...args: number[]) {
        return logic(...args);
    }
}
