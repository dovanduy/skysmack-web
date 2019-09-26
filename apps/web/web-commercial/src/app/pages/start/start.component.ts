import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsLetterComponent } from '../newsletter/newsletter.component';


@Component({
  selector: 'ss-commercial-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  constructor(
    public dialog: MatDialog
  ) { }

  public showNewsletterForm(): void {
    this.dialog.open(NewsLetterComponent);
  }
}
