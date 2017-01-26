/**
 * game-grid-cell.component
 */

import { Component, OnInit, ElementRef, Renderer, ChangeDetectionStrategy } from "@angular/core";
import { GameService } from "../service";

@Component({
    selector: 'app-game-cell',
    templateUrl: './game-grid-cell.component.html',
    styleUrls: ['./game-grid-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameGridCellComponent implements OnInit {

    constructor( private element: ElementRef,
                 private renderer: Renderer,
                 private gameService: GameService ) {
    }

    ngOnInit(): void {
        this.renderer.setElementStyle(this.element.nativeElement, 'padding', (this.gameService.GameStatus.tileWidth * 0.04) + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', this.gameService.GameStatus.tileWidth + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', this.gameService.GameStatus.tileWidth + 'px');
    }
}
