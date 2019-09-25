import { LanguageService } from './language.service';

export function configureLanguage(defaultLanguage: string) {
    return (languageService: LanguageService) => {
        return () => languageService.configure(defaultLanguage);
    }
}
