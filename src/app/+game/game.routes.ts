/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GamePanelComponent } from "./game-panel";

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GamePanelComponent},
        ]
    },
];