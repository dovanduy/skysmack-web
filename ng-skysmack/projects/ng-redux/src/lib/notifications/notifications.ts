import { NumIndex } from '@skysmack/framework';

export const NOTIFICATIONS_INJECTOR_TOKEN = 'Notifications';

export interface Notifications {
    showSnackbarMessage(message: string, action: string, duration: number);
    showTranslatedSnackbarMessage(translationString: string, translationParams: NumIndex<string>, action: string, duration: number);
}
