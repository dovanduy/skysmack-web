import { DisplayValuePipe } from './display-value.pipe';
import { DisplayModifierPipe } from './display-modifier.pipe';
import { SortPipe } from './sort.pipe';
import { WeekNoPipe } from './week-no.pipe';
import { ShowMenuItemActionPipe } from './show-menu-item-action.pipe';
import { WeekdayPipe } from './weekday.pipe';
import { GetHotkeyOptionsPipe } from '../components/common/package-drawer/get-hotkey-options.pipe';

export const portailUiPipes = [
    DisplayValuePipe,
    DisplayModifierPipe,
    SortPipe,
    ShowMenuItemActionPipe,
    WeekNoPipe,
    WeekdayPipe,
    GetHotkeyOptionsPipe
];
