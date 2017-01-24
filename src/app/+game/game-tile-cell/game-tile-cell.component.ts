/**
 * game-tile-cell.component
 */

import {
    Component, OnInit, ElementRef, Renderer, Input, SimpleChange, trigger, transition,
    animate, style, keyframes, ChangeDetectionStrategy
} from "@angular/core";
import { GameService } from "../game.service";
import { Tile } from "../tile";

@Component({
    selector: 'game-tile-cell',
    templateUrl: './game-tile-cell.component.html',
    styleUrls: ['./game-tile-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

export class GameTileCellComponent implements OnInit {

    @Input() tile: Tile;
    private tileWidth: number;

    constructor( private element: ElementRef,
                 private renderer: Renderer,
                 private gameService: GameService ) {
    }

    ngOnInit(): void {
        this.tileWidth = this.gameService.GameStatus.tileWidth;
        this.setElementSize();
        this.setElementTransform();
    }

    ngOnChanges( changes: SimpleChange ) {
        let pre_t = changes['tile'].previousValue;
        let cur_t = changes['tile'].currentValue;

        if (cur_t.coordination && pre_t.coordination && (cur_t.coordination.x != pre_t.coordination.x || cur_t.coordination.y != pre_t.coordination.y)) {
            this.setElementTransform();
        }
    }

    private setElementSize() {
        let padding = this.gameService.GameStatus.tileWidth * 0.04;
        this.renderer.setElementStyle(this.element.nativeElement, 'padding', padding + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', this.tileWidth + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', this.tileWidth + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'font-size', this.tileWidth * 0.4 + 'px');
    }

    private setElementTransform(): void {
        let t_x = this.tileWidth * this.tile.coordination.x;
        let t_y = this.tileWidth * this.tile.coordination.y;
        this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translate(' + t_x + 'px,' + t_y + 'px' + ')');
    }
}
