/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';
import { GameComponent } from "./game.component";
import { StoreModule } from "@ngrx/store";
import { GridService, tilesReducer, gridReducer } from "./tile";
import { GameService } from "./game.service";
import { KeyboardService } from "./keyboard.service";
import { GameOverBoardComponent } from "./game-over-board";
import { GameGridCellComponent } from "./game-grid-cell";
import { GameTileCellComponent } from "./game-tile-cell";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameGridCellComponent,
        GameTileCellComponent,
        GameOverBoardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles : tilesReducer,
            grid: gridReducer
        }),
    ],
    providers: [
        GameService,
        GridService,
        KeyboardService,
    ]
})
export class GameModule {
    public static routes = routes;
}
