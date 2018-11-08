import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'framework';

@Component({
  selector: 'ss-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() { super.ngOnInit(); }
}
