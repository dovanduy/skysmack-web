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

    transform(loadedPackage: LoadedPackage, index: number | string): Partial<HotKeyOptions> {
        const hotKeyOptions: Partial<HotKeyOptions> = {
            altKey: true,
            action: () => {
                this.uiStore.setPackageDrawerStatus(false);
                this.router.navigate([`/${loadedPackage._package.path}`])
            }
        };

        if (typeof index === 'string') {
            hotKeyOptions.keyCode = index.charCodeAt(0);
            return hotKeyOptions;
        }

        if (typeof index === 'number' && (index >= 1 && index <= 9)) {
            hotKeyOptions.keyCode = index.toString().charCodeAt(0)
            return hotKeyOptions;
        }

        return null;
    }
}
