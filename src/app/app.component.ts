/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.scss'
    ],
    template: `
<div class="site-wrap">
    <header class="site-header">
        <div class="bg"></div>
        <h1>2048</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
</div>
  `
})
export class AppComponent implements OnInit {

    constructor( public appState: AppState ) {
    }

    public ngOnInit() {
    }

}
