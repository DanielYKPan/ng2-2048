/**
 * tile
 */

import { uuid } from "./uuid";

export interface Coordination {
    x: number;
    y: number;
}

export class Tile {

    /* Property id */
    private id: string;

    get Id(): string {
        return this.id;
    }

    public coordination: Coordination;
    public value: number;
    public originalCoordi: Coordination;
    public merged: boolean;
    public shouldDump: boolean;


    constructor( coordination?: Coordination, value?: number ) {
        this.id = uuid();
        this.coordination = coordination || null;
        this.value = value || 2;
        this.merged = false;
        this.shouldDump = false;
    }

    // Backup the position so that we could do a undo
    backupPosition() {
        this.originalCoordi = this.coordination;
    }

    resetMergedStatus() {
        this.merged = false;
    }
}
