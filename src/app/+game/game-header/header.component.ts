/**
 * header.component
 */

import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-game-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameHeaderComponent implements OnInit {

    @Output() onNewGameBtnClick = new EventEmitter<boolean>();

    constructor( private router: Router ) {
    }

    ngOnInit(): void {
    }

    newGame(): void {
        this.router.navigate(['']);
        this.onNewGameBtnClick.emit(true);
    }

    checkAbout() {
        this.router.navigate(['/game/about']);
    }
}
