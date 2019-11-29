import { Pipe, PipeTransform } from '@angular/core';
import { LoadedPackage } from '@skysmack/ng-framework';
import { HotKeyOptions } from '@skysmack/framework';
import { Router } from '@angular/router';
import { UIRedux } from '../../../redux/ui-redux';

@Pipe({ name: 'getHotkeyOptions' })
export class GetHotkeyOptionsPipe implements PipeTransform {

    constructor(
        private router: Router,
        private uiStore: UIRedux
    ) { }

    transform(loadedPackage: LoadedPackage, index: number): Partial<HotKeyOptions> {
        if (index < 0 || index > 9) {
            return null;
        }

        const hotKeyOptions: Partial<HotKeyOptions> = {
            shiftKey: true,
            action: () => {
                this.uiStore.setPackageDrawerStatus(false);
                this.router.navigate([`/${loadedPackage._package.path}`])
            }
        };

        switch (index) {
            case 0: hotKeyOptions.keyCode = 49; break; // 1
            case 1: hotKeyOptions.keyCode = 50; break; // 2
            case 2: hotKeyOptions.keyCode = 51; break; // 3
            case 3: hotKeyOptions.keyCode = 52; break; // 4
            case 4: hotKeyOptions.keyCode = 53; break; // 5
            case 5: hotKeyOptions.keyCode = 54; break; // 6
            case 6: hotKeyOptions.keyCode = 55; break; // 7
            case 7: hotKeyOptions.keyCode = 56; break; // 8
            case 8: hotKeyOptions.keyCode = 57; break; // 9
            default: break;
        }

        return hotKeyOptions;
    }
}
