import { Component, Input } from '@angular/core';
import { BoardService } from './board.service';
import { MoveResponse } from './app.types';
import { GameState } from './game';
import { MdButtonModule, MdCheckboxModule, MdRadioModule } from '@angular/material';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@Input() humanColour: string;

	public title = 'Cymbeline';
	public waiting = false;
	public msg = 'start';
	public gameInProgress = false;
	public computerToPlay = false;
	public computerColour: string;
	public humanWins = false;
	public draw = false;
	public nrBlack = 2;
	public nrWhite = 2;

	public game = new GameState();
	public board = GameState.BOARD;

	private nextValid = '';

	constructor(private boardService: BoardService) {
		this.humanColour = 'b';
	}

	public startGame() {
		this.game = new GameState();
		this.computerColour = this.humanColour !== 'b' ? 'b' : 'w';
		this.draw = this.humanWins = false;
		this.gameInProgress = true;
		console.log('game starting computer: ', this.computerColour);
		if (this.humanColour !== 'b') {
			this.msg = 'computerTurn';
			this.playComputerMove();
		} else {
			this.msg = 'humanTurn';
		}
	}

	public stopGame() {
		this.gameInProgress = false;
		this.msg = 'start';
	}

	public toggleHuman() {
		this.humanColour = 'b' === this.humanColour ? 'w' : 'b';
	}

	public playHumanMove(x: number, y: number) {
		if (!this.gameInProgress || this.waiting) {
			return;
		}
		if (GameState.BOARD[x][y]) {
			return;
		}
		this.waiting = true;
		GameState.BOARD[x][y] = this.humanColour + 'x';
		this.boardService.playMove(x, y, this.humanColour).then(
			(data: MoveResponse) => {
				if (data.turned) {
					this.msg = 'computerTurn';
					this.game.putMoveOnBoard(BoardService.coordToString(x, y), data.turned, this.humanColour);
					this.updateCounter();
					return setTimeout(() => {
						this.waiting = false;
						this.playComputerMove();
					}, 2000);
				} else {
					this.msg = 'humanTurn';
					GameState.BOARD[x][y] = '';
				}
				this.waiting = false;
			}
		);
	}

	private playComputerMove() {
		this.waiting = true;
		this.boardService.findBestMove(this.computerColour).then(
			(data: MoveResponse) => {
				this.waiting = false;
				if (data.turned) {
					this.game.putMoveOnBoard(data.played, data.turned, this.computerColour);
					this.updateCounter();
				} else if (!this.nextValid) {
					// End of game
					this.gameInProgress = false;
					this.showWinner();
					return;
				}
				this.msg = 'humanTurn';
				this.nextValid = data.nextValid;
				if (!data.nextValid) {
					this.playComputerMove();
				}
			});
	}

	private showWinner() {
		if (this.nrBlack === this.nrWhite) {
			this.draw = true;
			this.msg = 'draw';
			return;
		}
		const humanWins = (this.humanColour === 'b' && this.nrBlack > this.nrWhite) ||
			(this.humanColour === 'w' && this.nrBlack < this.nrWhite);
		this.msg = this.humanWins ? 'humanWins' : 'computerWins';
		this.toggleHuman();
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
