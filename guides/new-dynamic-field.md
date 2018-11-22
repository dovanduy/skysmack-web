# Adding a new dynamic field

- Add constant in `src/framework/fields/field-type-constants.ts`
- Navigate to `src/ui/fields/components` in cmd line
- Generate the field component `ng g c new-field-name --skip-import`
- Register in UiModule
- Add selector to DynamicFormField
- Add logic and styles to the component
- Test it
