import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import SignaturePad from 'signature_pad';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignaturePadEditorDialogComponent } from '../signature-pad-editor-dialog/signature-pad-editor-dialog.component';

@Component({
  selector: 'ss-signature-pad-editor-field',
  templateUrl: './signature-pad-editor-field.component.html'
})
export class SignaturePadEditorFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public signed: boolean;

  private canvas: HTMLCanvasElement;
  private signaturePad: SignaturePad;

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public openSignaturePad(): void {
    this.dialog.open(SignaturePadEditorDialogComponent, {
      minWidth: '100vw',
      height: '100vh'
    } as MatDialogConfig)
  }
}
