import { Component, OnInit, Input } from '@angular/core';
import { Field } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() public fields$: Observable<Field[]>;

  constructor() { }

  ngOnInit() {
    this.fields$ = this.fields$.pipe(map(fields => fields.filter(field => field.key !== 'id')));
  }

  public trackByFieldKey(field: Field) {
    return field ? field.key : undefined;
  }

}
