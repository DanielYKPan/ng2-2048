/**
 * game-score.component
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'app-game-score',
    templateUrl: './game-score.component.html',
    styleUrls: ['./game-score.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameScoreComponent implements OnInit {

    @Input() scores: number;

    constructor() {
    }

    ngOnInit(): void {
    }
}
