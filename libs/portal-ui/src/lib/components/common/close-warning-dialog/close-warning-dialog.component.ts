import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ss-close-warning-dialog',
  templateUrl: './close-warning-dialog.component.html',
  styleUrls: ['./close-warning-dialog.component.scss']
})
export class CloseWarningDialogComponent {
  constructor(
    public dialog: MatDialogRef<CloseWarningDialogComponent>,
  ) { }

  public close(): void {
    this.dialog.close(true);
  }

  public stay(): void {
    this.dialog.close(false);
  }
}
