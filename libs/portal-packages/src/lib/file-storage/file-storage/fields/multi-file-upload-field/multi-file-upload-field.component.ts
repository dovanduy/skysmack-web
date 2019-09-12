import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';

@Component({
  selector: 'ss-multi-file-upload-field',
  templateUrl: './multi-file-upload-field.component.html',
  styleUrls: ['./multi-file-upload-field.component.scss']
})
export class MultiFileUploadFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  constructor(
    private router: Router,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const packagePath = this.router.url.split('/')[1];
    this.uploader = new FileUploader({ url: `${this.apiDomain.domain}/${packagePath}` });

    this.uploader.onBuildItemForm = this.onBuildItemForm.bind(this);
  }

  public upload(fileItem: FileItem) {
    fileItem.alias = 'files';
    console.log(fileItem)
    fileItem.upload();
    // console.log(this.uploader.queue);
  }

  private onBuildItemForm(fileItem: FileItem, form: FormData): any {
    form.append('0.name', 'test/apple-01.png');
    return { fileItem, form };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
