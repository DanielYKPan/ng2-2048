/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { GridService, Tile, traversalDirections, checkSameCoordination } from "./";

export interface IGameStatus {
    scores: number;
    gameOver: boolean;
    gameWon: boolean;
    tileWidth: number;
    fontSize: number;
}

@Injectable()
export class GameService {

    private gameStatus: IGameStatus = {
        scores: 0,
        gameOver: false,
        gameWon: false,
        tileWidth: 142,
        fontSize: 57
    };

    get GameStatus(): IGameStatus {
        return this.gameStatus
    }

    constructor( private gridService: GridService ) {
    }

    newGame() {
        this.resetGameStatus();
        this.gridService.buildGrid();
        this.gridService.buildStartingPosition();
    }

    move( direction: string ) {

        // If the game is over,
        // we are not allowed to continue to make any move
        if (this.gameStatus.gameOver) {
            return;
        }

        let hasMoved = false; // set a flag to see if any tiles moved
        let scores = 0; // a variable to hold the scores of this move
        this.gridService.prepareMove();

        // We get the grid checking order based on the move direction
        let positions = traversalDirections(direction);

        positions.x.forEach(( x ) => {
            positions.y.forEach(( y ) => {
                let originalPosition = {x: x, y: y},
                    tile = this.gridService.getTileAt(originalPosition);

                if (tile) {
                    let cell = this.gridService.calculateNextPosition(originalPosition, direction);
                    let next: Tile = cell.next;

                    // If a tile's next tile exists and the next tile has not been merged yet and it has the same value
                    // that means we could merge these two tiles
                    if (next && next.value === tile.value && !next.merged) {
                        next.value = tile.value * 2; // double the next tile's value

                        tile.shouldDump = true; // set the tile shouldDump status to true
                                                // so that we could clean this tile before next move

                        next.merged = true; // set the next tile's merged status to true
                                            // so that we know it could not merge any more in the next check

                        // Move the tile to the new coordination, so that we could see the moving animations
                        this.gridService.moveTile(next.coordination, tile, next);

                        scores += next.value; // Add the new value to scoring table

                        hasMoved = true;
                    } else {
                        // It a tile's next tile not exists,
                        // that means the new coordination is empty and we could move the tile to the new place
                        this.gridService.moveTile(cell.newPosition, tile);
                        this.gridService.saveTileIdIntoGrid(tile, cell.newPosition);
                    }

                    if (!hasMoved && !checkSameCoordination(originalPosition, cell.newPosition)) {
                        hasMoved = true;
                    }
                }
            })
        });


        // Update the game score after grid checking
        if (scores > 0) {
            this.updateScores(scores);
        }

        //this.gameStatus.scores += scores;

        // If any tile's move to a new place,
        // that means we at least make a proper move and we randomly add a new tile into the grid
        if (hasMoved) {
            this.gridService.randomlyInsertTile();

            // After we insert a new tile,
            // we need to check if there is any empty cell or any merge-able tiles.
            // If there is none of those, that means the game is over
            if (!this.moveAvailable()) {
                this.gameStatus.gameOver = true;
            }
        }

        return;
    }

    setTileStyle( width: number ): void {
        this.gameStatus.tileWidth = width > this.gameStatus.tileWidth ? this.gameStatus.tileWidth : width;
        this.gameStatus.fontSize = width * 0.4 > this.gameStatus.fontSize ? this.gameStatus.fontSize : width * 0.4;
    }

    private moveAvailable(): boolean {
        return this.gridService.anyCellInGridAvailable() || this.gridService.tileMatchesAvailable();
    }

    private resetGameStatus(): void {
        this.gameStatus.scores = 0;
        this.gameStatus.gameWon = false;
        this.gameStatus.gameOver = false;
    }

    private updateScores( scores: number ): void {
        if (scores > 0)
            this.gameStatus.scores += scores;
        return;
    }
}
