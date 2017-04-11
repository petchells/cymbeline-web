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
	@Input() humanColour: string;

	public title = 'Cymbeline';
	public gameInProgress = false;
	public computerToPlay = false;
	public computerColour: string;
	public computerWins = false;
	public humanWins = false;
	public draw = false;
	public nrBlack = 2;
	public nrWhite = 2;

	public game = new GameState();
	public board = GameState.BOARD;

	private couldntGo = true;
	private nextValid = '';

	constructor(private boardService: BoardService) {
		this.humanColour = 'b';
	}

	public startGame() {
		this.game = new GameState();
		this.computerToPlay = this.humanColour !== 'b';
		this.computerColour = this.computerToPlay ? 'b' : 'w';
		this.draw = this.computerWins = this.humanWins = false;
		this.gameInProgress = true;
		if (this.computerToPlay) {
			this.playComputerMove();
		}
	}

	public stopGame() {
		this.gameInProgress = false;
	}

	public playHumanMove(x: number, y: number) {
		if (!this.gameInProgress || this.computerToPlay) {
			return;
		}
		if (!GameState.BOARD[x][y]) {
			GameState.BOARD[x][y] = this.humanColour + 'x';
		}
		this.computerToPlay = true;
		this.boardService.playMove(x, y, this.humanColour).then(
			(data: MoveResponse) => {
				if (data.turned) {
					this.game.putMoveOnBoard(BoardService.coordToString(x, y), data.turned, this.humanColour);
					this.updateCounter();
					this.couldntGo = false;
					return setTimeout(() => {
						this.playComputerMove();
					}, 2000);
				} else {
					this.computerToPlay = false;
					GameState.BOARD[x][y] = '';
				}
			}
		);
	}

	private playComputerMove() {
		this.boardService.findBestMove(this.computerColour).then(
			(data: MoveResponse) => {
				if (data.turned) {
					this.game.putMoveOnBoard(data.played, data.turned, this.computerColour);
					this.updateCounter();
					this.computerToPlay = false;
				} else if (!this.nextValid) {
					// End of game
					this.gameInProgress = false;
					this.showWinner();
				} else {
					this.computerToPlay = false;
				}
				this.nextValid = data.nextValid;
				if (!data.nextValid) {
					this.playComputerMove();
				}
			});
	}

	private showWinner() {
		if (this.nrBlack === this.nrWhite) {
			this.draw = true;
			return;
		}
		this.humanWins = (this.humanColour === 'b' && this.nrBlack > this.nrWhite) ||
			(this.humanColour === 'w' && this.nrBlack < this.nrWhite);
		this.computerWins = !this.humanWins;
	}

	private updateCounter() {
		this.nrBlack = this.nrWhite = 0;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (GameState.BOARD[i][j] === 'b') {
					this.nrBlack += 1;
				} else if (GameState.BOARD[i][j] === 'w') {
					this.nrWhite += 1;
				}
			}
		}
	}
}
