import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'ss-commercial-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsLetterComponent {
  public submitted: boolean;

  constructor(
    public dialog: MatDialog
  ) { }

  public submit(): void {
    this.submitted = true;
  }

  public close(): void {
    this.dialog.closeAll();
  }
}
