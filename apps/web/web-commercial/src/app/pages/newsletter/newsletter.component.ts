import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '@skysmack/ng-dynamic-forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsLetterComponent {
  public submitted: boolean;
  public newsLetterForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      CustomValidators.validEmail()
    ]),
  });

  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
  ) { }

  public submit(): void {
    const formValues = this.newsLetterForm.value;

    if (this.newsLetterForm.valid) {
      this.submitted = true;
      this.httpClient.post<any>(`${this.apiDomain.domain}/subscribe`, formValues, { observe: 'response' }).pipe(
        catchError(error => of(error))
      ).subscribe();
    } else {
      Object.keys(this.newsLetterForm.controls).forEach(key => {
        this.newsLetterForm.controls[key].markAllAsTouched();
      })
    }
  }

  public close(): void {
    this.dialog.closeAll();
  }
}
