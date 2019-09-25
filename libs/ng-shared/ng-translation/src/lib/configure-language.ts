import { LanguageService } from './language.service';

export function configureLanguage(languageService: LanguageService) {
    return () => languageService.configure();
}
