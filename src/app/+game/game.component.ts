/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { GameService } from "./game.service";
@Component({
    selector: 'app-game',
    styleUrls: ['game.component.scss'],
    templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

    constructor( private gameService: GameService ) {
    }

    ngOnInit() {
    }

    newGame() {
        this.gameService.newGame();
    }
}
