import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StrIndex } from '@skysmack/framework';

@Component({
  selector: 'ss-range-validator',
  templateUrl: './range-validator.component.html',
  styleUrls: ['./range-validator.component.scss']
})
export class RangeValidatorComponent implements OnInit {
  private _min = 0;
  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    this.rangeParams.minimum = value;
    this._min = value;
    if (this.max < value) {
      this.max = value;
    }
    this.parameters.emit(this.rangeParams);
  }

  private _max = 0;
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    this.rangeParams.maximum = value;
    this._max = value;
    if (this.min > value) {
      this.min = value;
    }
    this.parameters.emit(this.rangeParams);
  }

  public rangeParams = { minimum: 0, maximum: 0 };
  @Output() public parameters = new EventEmitter<StrIndex<number>>();

  constructor() { }

  ngOnInit() {
    this.parameters.emit(this.rangeParams);
  }

}
