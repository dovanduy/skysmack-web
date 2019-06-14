import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'ss-email-template-field',
  templateUrl: './email-template-field.component.html'
})
export class EmailTemplateFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Template content',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
    // customClasses: [ // optional
    //   {
    //     name: "quote",
    //     class: "quote",
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText'
    //   },
    //   {
    //     name: "titleText",
    //     class: "titleText",
    //     tag: "h1",
    //   },
    // ]
  };

  ngOnInit() {
    super.ngOnInit();
  }
}
