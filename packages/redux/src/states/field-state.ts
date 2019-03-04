import { FieldSchemaViewModel, FieldValueProviderViewModel, StrIndex, LocalObject, LocalPageTypes } from "@skysmack/framework";

export interface FieldState {
    localPageTypes: StrIndex<StrIndex<LocalPageTypes<string>>>;
    fields: StrIndex<StrIndex<LocalObject<FieldSchemaViewModel, string>>>;
    availableFields: StrIndex<StrIndex<LocalObject<FieldValueProviderViewModel, string>>>;
}