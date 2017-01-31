/**
 * game-state.reducer
 */

import { ActionReducer } from "@ngrx/store";
import { SET_GAME_STATE } from "./actions.const";

export interface IGameState {
    gameOver: boolean;
    gameWon: boolean;
    tileSize: number;
    scores: number;
    fontSize: number;
    gameGold: number;
}

const defaultGameState = {
    scores: 0,
    gameOver: false,
    gameWon: false,
    tileSize: 142,
    fontSize: 57,
    gameGold: 2048
};

export const gameStateReducer: ActionReducer<any> = ( state: IGameState = defaultGameState, action: any ) => {
    switch (action.type) {
        case SET_GAME_STATE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
