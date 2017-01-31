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
import { GameService, GridService, KeyboardService, tilesReducer, gridReducer, gameStateReducer } from "./service";
import { GameOverBoardComponent } from "./game-over-board";
import { GameGridCellComponent } from "./game-grid-cell";
import { GameTileCellComponent } from "./game-tile-cell";
import { GameHeaderComponent } from "./game-header";
import { GameScoreComponent } from "./game-score";
import { GamePanelComponent } from "./game-panel";
import { GameAboutComponent, SocialBtnComponent } from "./game-about";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHeaderComponent,
        GameScoreComponent,
        GamePanelComponent,
        GameAboutComponent,
        SocialBtnComponent,
        GameGridCellComponent,
        GameTileCellComponent,
        GameOverBoardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
            grid: gridReducer,
            gameState: gameStateReducer
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
