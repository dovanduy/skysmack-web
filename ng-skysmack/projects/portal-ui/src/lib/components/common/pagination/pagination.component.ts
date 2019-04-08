import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'ss-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  @Output() public intersection = new EventEmitter<any>();
  @Input() public loadingState;
  public totalCount: number;

  constructor() { }

  ngOnInit() {
  }

  public emitOnIntersection($event) {
    this.intersection.emit($event);
  }
}
