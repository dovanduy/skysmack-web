import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

interface Point { latitude: number; longtitude: number; }

@Component({
  selector: 'ss-geography-field',
  templateUrl: './geography-field.component.html'
})
export class GeographyFieldComponent extends FieldBaseComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('latitude') public latitude: ElementRef;
  @ViewChild('longtitude') public longtitude: ElementRef;

  constructor(
    private component: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.initValues();
    this.changeDetector.detectChanges();
    this.addEvent(this.component, `input[name='longtitude']`, 'input', this.setPoint);
    this.addEvent(this.component, `input[name='latitude']`, 'input', this.setPoint);
  }

  private initValues() {
    const point: Point = this.field.value ? this.field.value : { latitude: 0, longtitude: 0 };
    this.latitude.nativeElement.value = point.latitude;
    this.longtitude.nativeElement.value = point.longtitude;
  }

  private setPoint() {
    const latitude = Number(this.latitude.nativeElement.value);
    const longtitude = Number(this.longtitude.nativeElement.value);

    const point: Point = {
      latitude,
      longtitude
    };

    this.setFieldValue(point);
  }
}
