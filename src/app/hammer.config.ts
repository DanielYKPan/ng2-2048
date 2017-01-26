/**
 * hammer.config
 */

import { HammerGestureConfig } from "@angular/platform-browser";


export class MyHammerConfig extends HammerGestureConfig  {
    // https://github.com/hammerjs/hammer.js/issues/1014
    buildHammer(element: HTMLElement) {
        let mc = new Hammer(element);

        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

        for (let eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }

        return mc;
    }
}
