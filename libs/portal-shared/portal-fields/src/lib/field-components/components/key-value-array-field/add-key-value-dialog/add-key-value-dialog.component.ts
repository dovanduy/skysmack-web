import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-add-key-value-dialog',
  templateUrl: './add-key-value-dialog.component.html',
  styleUrls: ['./add-key-value-dialog.component.scss']
})
export class AddValueArrayDialogComponent implements OnInit {
  public missingValues: boolean;

  @ViewChild('keyInput', { static: false }) public keyInput: ElementRef;
  @ViewChild('valueInput', { static: false }) public valueInput: ElementRef;

  public editKeyValues: boolean;
  public inputs: { id: string, key: string, value: string }[] = [];
  public editInputs: { id: string, key: string, value: string }[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddValueArrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public field: Field
  ) { }

  ngOnInit() { }

  public add() {
    const key = this.keyInput.nativeElement.value;
    const value = this.valueInput.nativeElement.value;

    if (!key || !value) {
      this.missingValues = true;
      return;
    }

    // Post value
    const input = {
      id: Guid.create().toString(),
      key,
      value
    };

    this.keyInput.nativeElement.value = '';
    this.valueInput.nativeElement.value = '';

    this.dialogRef.close(input);
  }
}
