import { Component, OnInit, Input } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Summary } from '@skysmack/framework';
import { NgSummaryProviders } from '@skysmack/ng-framework';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() public fields$: Observable<Field[]>;
  @Input() public entityId: unknown;
  public summaries$: Observable<Summary<unknown>[]>;
  private packagePath: string;


  constructor(
    private router: Router,
    private summaryProviders: NgSummaryProviders
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    this.fields$ = this.fields$.pipe(map(fields => fields.filter(field => field.key !== 'id')));


    if (this.summaryProviders) {
      this.summaries$ = this.summaryProviders.providers$.pipe(
        switchMap(providers => combineLatest(
          providers.map(provider => provider.getSummaries(this.packagePath, this.entityId))
        )),
        map(summaries => summaries.reduce((a, b) => a.concat(b), []))
      );
    }
  }

  public trackByFieldKey(field: Field) {
    return field ? field.key : undefined;
  }

}
