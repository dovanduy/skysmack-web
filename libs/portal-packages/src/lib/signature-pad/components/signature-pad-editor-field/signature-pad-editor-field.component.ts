import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'ss-signature-pad-editor-field',
  templateUrl: './signature-pad-editor-field.component.html'
})
export class SignaturePadEditorFieldComponent extends FieldBaseComponent<Field> implements OnInit, AfterViewInit {
  private canvas: HTMLCanvasElement;
  private signaturePad: SignaturePad;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 1200;
    this.canvas.height = 200;
    this.signaturePad = new SignaturePad(this.canvas);
  }
}
