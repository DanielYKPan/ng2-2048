/**
 * game-tile.component
 */

import {
    Component, OnInit, trigger, animate, transition, keyframes, style, Input,
    ChangeDetectionStrategy
} from "@angular/core";
import { Tile } from "./tile";

@Component({
    selector: 'app-game-tile',
    styleUrls: ['game-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
<div class="tile position-{{tile.coordination.x}}-{{tile.coordination.y}} tile-{{tile.value}}"  
    [class.is-merged]="tile.merged">
    <div class="tile-inner" 
        [@mergedState]="tile.merged ? 'merged' : 'unmerged'">
        {{tile.value}}
    </div>
</div>
`,
    animations: [
        trigger('mergedState', [
            transition('unmerged => merged', [
                animate('200ms', keyframes([
                    style({transform: 'scale(1)', offset: 0}),
                    style({transform: 'scale(1.4)', offset: 0.5}),
                    style({transform: 'scale(1)', offset: 1.0})
                ]))
            ]),
            transition('void => unmerged', [
                style({opacity: 0, transform: 'scale(0)'}),
                animate(300, style({opacity: 1, transform: 'scale(1)'}))
            ]),
        ])
    ]
})

export class GameTileComponent implements OnInit {

    @Input() tile: Tile;

    constructor() {
    }

    ngOnInit(): void {
    }
}
