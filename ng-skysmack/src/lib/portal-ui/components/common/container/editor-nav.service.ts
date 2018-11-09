import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class EditorNavService {
  public isVisible = new BehaviorSubject<boolean>(false);

  showEditorNav() {
    this.isVisible.next(true);
  }

  hideEditorNav() {
    this.isVisible.next(false);
  }
}