/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { TileService, Tile, traversalDirections, checkSameCoordination } from "./tile";

@Injectable()
export class GameService {

    constructor( private tileService: TileService ) {
    }

    newGame() {
        this.tileService.buildGrid();
        this.tileService.buildStartingPosition();
    }

    move( direction: string ) {
        let hasMoved = false;
        let scores = 0;
        this.tileService.prepareMove();

        // We get the checking order based on the move direction
        let positions = traversalDirections(direction);

        positions.x.forEach(( x ) => {
            positions.y.forEach(( y ) => {
                let originalPosition = {x: x, y: y},
                    tile = this.tileService.getTileAt(originalPosition);

                if (tile) {
                    let cell = this.tileService.calculateNextPosition(originalPosition, direction);
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
                        this.tileService.moveTile(next.coordination, tile, next);

                        scores += next.value; // Add the new value to scoring table

                        hasMoved = true;
                    } else {
                        // It a tile's next tile not exists,
                        // that means the new coordination is empty and we could move the tile to the new place
                        this.tileService.moveTile(cell.newPosition, tile);
                        this.tileService.saveTileIdIntoGrid(tile, cell.newPosition);
                    }

                    if (!hasMoved && !checkSameCoordination(originalPosition, cell.newPosition)) {
                        hasMoved = true;
                    }
                }
            })
        });


        //this.gameStatus.scores += scores;

        // If any tile's move to a new place,
        // that means we at least make a proper move and we randomly add a new tile into the grid
        if (hasMoved) {
            this.tileService.randomlyInsertTile();

            /*if (!this.moveAvailable()) {
                this.gameStatus.gameOver = true;
            }*/
        }

        return;
    }
}
