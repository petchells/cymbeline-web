import { Component, Input } from '@angular/core';
import {BoardService} from './board.service';
import {AppComponent} from './app.component';
import {MoveResponse} from './app.types';
import {GameState} from './game';

@Component({
	selector: 'app-sq',
	templateUrl: './square.component.html',
	styleUrls: ['./square.component.css']
})
export class SquareComponent {

	@Input('x') x: string;
	@Input('y') y: string;

	constructor(public parent: AppComponent) {
	}

	public clicked(): void {
		this.parent.playHumanMove(parseInt(this.x, 10), parseInt(this.y, 10));
	}
}
