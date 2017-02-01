/**
 * game-score.component
 */

import {
    Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, trigger,
    transition, style, animate, AnimationTransitionEvent
} from "@angular/core";

@Component({
    selector: 'app-game-score',
    templateUrl: './game-score.component.html',
    styleUrls: ['./game-score.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('panelState', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateY(100%)'}),
                animate('600ms ease-out')
            ])
        ]),
        trigger('scoreIncreasedState', [
            transition('void => active', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('800ms ease-in', style({
                        opacity: 0,
                        transform: 'translateY(-80px)'
                    })
                )])
        ])
    ]
})

export class GameScoreComponent implements OnInit, OnChanges {

    @Input() scores: number;
    @Input() best: number;
    increasedScores: Array<{value: number, state: string}> = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges( changes: SimpleChanges ): void {
        let pre_scores = changes['scores'].previousValue;
        let cur_scores = changes['scores'].currentValue;
        let inc_scores = 0;
        if (cur_scores >= 0 && pre_scores >= 0) {
            inc_scores = cur_scores - pre_scores;
        }
        if (inc_scores > 0) {
            this.increasedScores.push({value: inc_scores, state: 'active'});
        }
    }

    animationDone( event: AnimationTransitionEvent ): void {
        if(event.toState === 'active') {
            this.increasedScores.shift();
        }
    }
}
