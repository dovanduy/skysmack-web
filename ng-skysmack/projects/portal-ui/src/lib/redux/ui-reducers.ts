import { Menu } from '@skysmack/ng-ui';
import { UIActions } from './ui-actions';

export interface UIState {
    menu: Menu;
}

export const UI_INITIAL_STATE: UIState = {
    menu: {
        drawer: false,
        login: false,
        notifications: false,
        account: false,
        chat: false,
        search: false,
        editors: false,
        offline: false,
        language: false
    }
};

export function uiReducer(state: UIState = UI_INITIAL_STATE, action: any) {
    let newState: UIState = UI_INITIAL_STATE;
    switch (action.type) {

        case UIActions.TOGGLE_MENU_FOR:
            const toggleAction = action;
            return newState = {
                ...state,
                menu: toggleMenuForImmutable(state, toggleAction.payload)
            };

        case UIActions.SET_PACKAGE_DRAWER_STATUS:
            const packageStatusAction = action;
            return newState = {
                ...state,
                menu: {
                    ...state.menu,
                    drawer: packageStatusAction.payload
                }
            };

        default:
            return state;
    }
}

//#region ui-helpers
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
//#endregion
