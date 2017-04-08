import { Component, Input } from '@angular/core';
import {BoardService} from './board.service';
import {MoveResponse} from './app.types';
import {GameState} from './game';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@Input('human') humanColour: string;

	public title = 'Cymbeline';
	public gameInProgress = false;
	public computerToPlay = false;
	public computerColour: string;

	public game = new GameState();
	public board = GameState.BOARD;

	constructor(private boardService: BoardService) {
		this.humanColour = 'b';
	}

	public startGame() {
		this.game = new GameState();
		this.computerToPlay = this.humanColour !== 'b';
		this.computerColour = this.computerToPlay ? 'b' : 'w';
		this.gameInProgress = true;
		if (this.computerToPlay) {
			this.playComputerMove();
		}
	}

	public stopGame() {
		console.log('stopAndResetClicked');
		this.gameInProgress = false;
	}

	public playHumanMove(x: number, y: number) {
		if (!this.gameInProgress || this.computerToPlay) {
			return;
		}
		this.computerToPlay = true;
		if (!GameState.BOARD[x][y]) {
			GameState.BOARD[x][y] = this.humanColour + 'x';
		}
		this.boardService.playMove(x, y, this.humanColour).then(
		(data: MoveResponse) => {
				this.game.putMovesOnBoard(BoardService.coordToString(x, y), data.turned, this.humanColour);
				if (data.nextValid) {
					return this.playComputerMove();
				} else {
					this.computerToPlay = false;
				}
			}
		);
	}

	private playComputerMove() {
		this.boardService.findBestMove(this.computerColour).then(
			(data: MoveResponse) => {
			if (data.turned) {
				this.game.putMovesOnBoard(data.played, data.turned, this.computerColour);
				this.computerToPlay = false;
			}
		});
	}
}
