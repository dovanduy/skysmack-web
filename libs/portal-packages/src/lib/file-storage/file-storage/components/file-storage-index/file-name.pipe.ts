import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileName' })
export class FileNamePipe implements PipeTransform {
    transform(name: string, prefix: string): string {
        return name.replace(prefix, '');
    }
}
