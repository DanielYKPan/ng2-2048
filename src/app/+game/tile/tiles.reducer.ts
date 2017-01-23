/**
 * tiles.reducer
 */
import { ActionReducer } from "@ngrx/store";
import { Tile } from "./tile";
import { ADD_TILE, RESET_TILES } from "../actions.const";

export const tiles: ActionReducer<Tile[]> = ( state: Tile[] = [], action: any ) => {
    switch (action.type) {

        case RESET_TILES:
            return [];

        case ADD_TILE:
            return [
                ...state,
                Object.assign(new Tile(), action.payload)
            ];

        default:
            return state;
    }
};