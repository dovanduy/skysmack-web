# Adding a new dynamic field

- Add constant in `field-type.ts`
- Navigate to `ng-skysmack -> portal-ui/components/fields/components` in cmd line
- Generate the field component `ng g c new-field-name --skip-import`
    > Remove "portal-ui-" from component selector.
    > Change css to scss in component style path.
    > Change style.css to style.scss.
- Register in PortalUiModule
- Add selector to DynamicFormField html
- Add logic and styles to the component
- Test it
