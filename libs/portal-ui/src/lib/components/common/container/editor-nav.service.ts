import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditorNavService {
  public isVisible = new BehaviorSubject<boolean>(false);

  public redirectPath: string;

  showEditorNav() {
    this.isVisible.next(true);
  }

  hideEditorNav() {
    this.isVisible.next(false);
  }
}