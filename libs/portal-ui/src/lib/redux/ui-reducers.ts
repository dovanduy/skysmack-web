import { Menu } from '@skysmack/framework';
import { UIActions } from './ui-actions';
import { sharedReducer } from '@skysmack/redux';
import { UI_REDUCER_KEY } from '../constants';

export class UIState {
    public menu: Menu = {
        drawer: false,
        login: false,
        notifications: false,
        account: false,
        chat: false,
        search: false,
        editors: false,
        offline: false,
        language: false
    };
}

export function uiReducer(state = new UIState(), action: any) {
    state = sharedReducer(state, action, new UIState(), UI_REDUCER_KEY);
    const newState = Object.assign({}, state);

    switch (action.type) {

        case UIActions.TOGGLE_MENU_FOR: {
            const toggleAction = action;
            newState.menu = toggleMenuForImmutable(state, toggleAction.payload);
            return newState;
        }
        case UIActions.SET_PACKAGE_DRAWER_STATUS: {
            const packageStatusAction = action;
            newState.menu.drawer = packageStatusAction.payload;
            return newState;
        }
        default:
            return state;
    }
}

const toggleMenuForImmutable = (state: UIState, targetMenu: string): Menu => {
    const menu = { ...state.menu };
    // tslint:disable-next-line:prefer-const
    for (let menuProp in menu) {
        if (menu.hasOwnProperty(menuProp)) {
            if (menu[targetMenu] === undefined) {
                throwUndefinedMenuError(menu, targetMenu);
            }

            // Toggle the selected menu
            if (menuProp === targetMenu) {
                menu[targetMenu] = !menu[targetMenu];
            } else {
                // Close all other menus
                menu[menuProp] = false;
            }
        }
    }
    return menu;
};

const throwUndefinedMenuError = (menu: any, targetMenu: string): void => {
    let stringMenu = ``;
    // tslint:disable-next-line:prefer-const
    for (let menuProp in menu) {
        if (menu.hasOwnProperty(menuProp)) {
            stringMenu += menuProp + '\n';
        }
    }

    throw new Error(
        `\n"${targetMenu}" does not exist. Existing menus are:\n${stringMenu}`
    );
};
