import { Component, Input } from '@angular/core';
import {BOARD, BoardService} from './board.service';
import {AppComponent} from './app.component';

@Component({
	selector: 'app-sq',
	templateUrl: './square.component.html',
	styleUrls: ['./square.component.css']
})
export class SquareComponent {

	@Input('x') x: string;
	@Input('y') y: string;

	b = BOARD;

	constructor(private parent: AppComponent, private boardService: BoardService) {
	}

	public clicked(arg): void {
		if (!BOARD[this.x][this.y]) {
			console.log('clicked square');
			BOARD[this.x][this.y] = 'k';
		}
		this.boardService.playMove(parseInt(this.x, 10), parseInt(this.y, 10), this.parent.playerColour).then(
			(resp: MoveResponse) => {
				console.log(resp);
			}
		);
	}
}
