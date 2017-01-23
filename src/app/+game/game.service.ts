/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { TileService } from "./tile";

@Injectable()
export class GameService {

    constructor( private tileService: TileService ) {
    }

    newGame() {
        this.tileService.buildGrid();
        this.tileService.buildStartingPosition();
    }
}
