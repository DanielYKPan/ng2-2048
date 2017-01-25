/**
 * header.component
 */

import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-game-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameHeaderComponent implements OnInit {

    @Output() onNewGameBtnClick = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    newGame(): void {
        this.onNewGameBtnClick.emit(true);
    }
}
