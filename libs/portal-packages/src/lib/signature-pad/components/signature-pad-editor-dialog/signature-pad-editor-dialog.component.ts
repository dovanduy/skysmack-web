import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import SignaturePad from 'signature_pad';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ss-signature-pad-editor-dialog',
  templateUrl: './signature-pad-editor-dialog.component.html'
})
export class SignaturePadEditorDialogComponent implements OnInit, AfterViewInit {
  private canvas: HTMLCanvasElement;
  private signaturePad: SignaturePad;
  private innerWidth: number;
  private innerHeight: number;


  constructor(
    private dialog: MatDialogRef<SignaturePadEditorDialogComponent>
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  ngAfterViewInit() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 1200;
    this.canvas.height = 200;
    this.signaturePad = new SignaturePad(this.canvas);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  public closeSignaturePad(): void {
    this.dialog.close();
  }

  public clearPad(): void {
    this.signaturePad.clear();
  }

  public sign(): void {
    const result = this.signaturePad.toDataURL();
  }
}
