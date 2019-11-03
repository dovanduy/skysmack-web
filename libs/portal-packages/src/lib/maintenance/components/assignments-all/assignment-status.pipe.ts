import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentStatus } from '@skysmack/packages-maintenance';

@Pipe({ name: 'assignmentStatus' })
export class AssignmentStatusPipe implements PipeTransform {
    transform(status: number): string {
        switch (status) {
            case AssignmentStatus.Canceled: {
                return 'Canceled';
            }
            case AssignmentStatus.Created: {
                return 'Created';
            }
            case AssignmentStatus.Done: {
                return 'Done';
            }
            case AssignmentStatus.Faulted: {
                return 'Faulted';
            }
            case AssignmentStatus.Ongoing: {
                return 'Ongoing';
            }
            case AssignmentStatus.Pending: {
                return 'Pending';
            }
            default: {
                return '';
            }

        }
    }
}
