import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RemoveDialogData } from './remove-dialog-data';

@Component({
    selector: 'ss-commercial-ui-remove-dialog',
    templateUrl: 'remove-dialog.component.html',
  })
  export class RemoveDialog {
    constructor(        
        public dialogRef: MatDialogRef<RemoveDialog>,
        @Inject(MAT_DIALOG_DATA) public removeDialogData: RemoveDialogData) {}

    public delete(): void {
        this.removeDialogData.removeMethod();
        this.dialogRef.close();
    }
  }
