import { Component, OnInit, Inject } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { Router } from '@angular/router';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain, SubscriptionHandler } from '@skysmack/framework';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FileStorageFolderCreateComponent } from '../../components/file-storage-folder-create/file-storage-folder-create.component';

@Component({
  selector: 'ss-folder-create-field',
  templateUrl: './folder-create-field.component.html',
  styleUrls: ['./folder-create-field.component.scss']
})
export class FolderCreateFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public folderName = new FormControl();
  protected subscriptionHandler = new SubscriptionHandler();


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private dialogRef: MatDialogRef<FileStorageFolderCreateComponent>,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public create() {
    const formData = new FormData();
    const folderName = this.folderName.value;
    const prefix = this.router.url.split('/').slice(2).join('/');
    const folderNamePrefixed = prefix.length !== 0 ? `${prefix}/${folderName}/` : `${folderName}/`;
    formData.append('folders', folderNamePrefixed);
    const packagePath = this.router.url.split('/')[1];
    this.subscriptionHandler.register(this.httpClient.post<any>(`${this.apiDomain.domain}/${packagePath}`, formData).pipe(take(1)).subscribe());
    this.dialogRef.close();
  }
}
