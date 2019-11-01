import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-wysiwyg-editor-field',
  templateUrl: './wysiwyg-editor-field.component.html'
})
export class WYSIWYGEditorFieldComponent extends FieldBaseComponent<Field> implements OnInit {

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
