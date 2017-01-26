/**
 * game-panel.component
 */

import {
    Component, OnInit, OnDestroy, AfterContentInit, ViewChild, ElementRef, Renderer
} from '@angular/core';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { KeyboardService, Tile, IGameStatus, GameService } from "../service";

@Component({
    selector: 'app-game-panel',
    styleUrls: ['game-panel.component.scss'],
    templateUrl: 'game-panel.component.html'
})
export class GamePanelComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('board') board: ElementRef;

    tiles: Tile[];
    grid: string[];
    gameStatus: IGameStatus;

    private selectTilesSub: Subscription;
    private selectIDGridSub: Subscription;
    private arrowsSub: Subscription;

    constructor( private store: Store<any>,
                 private renderer: Renderer,
                 private keyboardService: KeyboardService,
                 private gameService: GameService ) {
    }

    ngOnInit() {
        this.selectTilesSub = this.store.select('tiles').subscribe(
            ( data: Tile[] ) => {
                this.tiles = data;
            }
        );

        this.selectIDGridSub = this.store.select('grid').subscribe(
            ( data: string[] ) => {
                this.grid = data;
            }
        );

        this.arrowsSub = this.keyboardService.arrows.subscribe(
            data => this.gameService.move(data)
        );

        this.newGame();
    }

    ngAfterContentInit(): void {
        let boardSize;
        if (window.innerWidth > window.innerHeight) {
            /** Size for large screens */
            if (window.innerWidth < 600) {
                console.log('screen < 600');
                boardSize = Math.floor((window.innerHeight - 230));
            }
            else {
                console.log('screen >600');
                boardSize = Math.floor((window.innerHeight - 300));
            }
        }
        else {
            /** Size for mobile screens */
            if (window.innerHeight < 500) {
                console.log('mobile screen > ');
                boardSize = Math.floor((window.innerHeight - 90));
            }
            else {
                console.log('mobile screen > 500');
                boardSize = Math.floor((window.innerWidth - 70));
            }
        }

        this.renderer.setElementStyle(this.board.nativeElement, 'width', boardSize + 'px');
        this.renderer.setElementStyle(this.board.nativeElement, 'height', boardSize + 'px');
        let tileWidth = (boardSize - 32) / 4;
        this.gameService.setTileStyle(tileWidth);
        this.renderer.setElementStyle(this.board.nativeElement, 'font-size', this.gameService.GameStatus.fontSize + 'px');
    }

    ngOnDestroy(): void {
        if (this.selectTilesSub)
            this.selectTilesSub.unsubscribe();

        if (this.selectIDGridSub)
            this.selectIDGridSub.unsubscribe();

        if (this.arrowsSub)
            this.arrowsSub.unsubscribe();
    }

    newGame(): void {
        this.gameService.newGame();
        this.gameStatus = this.gameService.GameStatus;
    }

    clickKeyBoard( keyCode: number ): void {
        this.keyboardService.enter(keyCode);
    }

    trackByFn( index, item ) {
        return item.Id;
    }
}
