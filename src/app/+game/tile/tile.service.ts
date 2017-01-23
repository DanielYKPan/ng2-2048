/**
 * tile.service
 */

import { Injectable } from '@angular/core';
import { Tile, Coordination } from "./tile";
import { ADD_TILE, BUILD_GRID, ADD_ID, RESET_TILES } from "../actions.const";
import { Store } from "@ngrx/store";

const Size: number = 4;
const StartingTiles: number = 2;

@Injectable()
export class TileService {

    private grid: string[];

    constructor( private store: Store<any> ) {
        this.store.select('grid').subscribe(
            ( data: string[] ) => {
                this.grid = data;
            }
        );
    }

    public buildGrid(): void {
        this.store.dispatch({type: BUILD_GRID, payload: Size});
    }

    /* Build Starting tiles position */
    public buildStartingPosition(): void {
        this.store.dispatch({type: RESET_TILES});
        for (let i = 0; i < StartingTiles; i++) {
            this.randomlyInsertTile();
        }
    }

    /* Insert tile into tiles array randomly */
    public randomlyInsertTile(): void {
        let cells = this.getAllAvailableCells();
        if (cells.length > 0) {
            let randomCell = cells[Math.floor(Math.random() * cells.length)];
            let coordination = indexToCoordination(randomCell);
            let newTile = new Tile(coordination);
            //this.grid[randomCell] = newTile.Id;
            this.store.dispatch({type: ADD_ID, payload: {index: randomCell, value: newTile.Id}});
            //this.tiles.push(newTile);
            this.store.dispatch({type: ADD_TILE, payload: newTile});
        }
    }

    /* Get all null cell index in tiles array */
    private getAllAvailableCells(): number[] {
        return this.grid.map(( cell: string, index: number ) => {
            if (cell == null) {
                return index;
            } else {
                return null;
            }
        }).filter(( index: number ) => index != null);
    }
}

/* Change index to coordination */
const indexToCoordination = ( index: number ): Coordination => {

    let coordination: Coordination = {
        x: null,
        y: null
    };

    coordination.x = index % Size;
    coordination.y = Math.floor(index / Size);
    return coordination;
};
