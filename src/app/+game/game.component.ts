/**
 * game.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Tile } from "./tile/tile";
import { Subscription } from "rxjs";
import { GameService } from "./game.service";

@Component({
    selector: 'app-game',
    styleUrls: ['game.component.scss'],
    templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {

    tiles: Tile[];
    grid: string[];

    private selectTilesSub: Subscription;
    private selectIDGridSub: Subscription;

    constructor( private store: Store<any>,
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

        this.newGame();
    }

    ngOnDestroy(): void {
        if (this.selectTilesSub)
            this.selectTilesSub.unsubscribe();

        if (this.selectIDGridSub)
            this.selectIDGridSub.unsubscribe();
    }

    newGame(): void {
        this.gameService.newGame();
    }
}
