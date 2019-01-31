import { NumIndex } from '@skysmack/framework';

export interface Notifications {
    showSnackbarMessage(message: string, action: string, duration: number);
    showTranslatedSnackbarMessage(translationString: string, translationParams: NumIndex<string>, action: string, duration: number);
}
