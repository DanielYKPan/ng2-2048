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
import { TileService, GameTileComponent, tiles, grid } from "./tile";
import { GameService } from "./game.service";

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameTileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles,
            grid
        }),
    ],
    providers: [
        GameService,
        TileService
    ]
})
export class GameModule {
    public static routes = routes;
}
