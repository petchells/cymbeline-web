import {BoardService} from './board.service';

export class Move {
	constructor(public x: number, public y: number, public colour: string, public board: {black: string, white: string}) {
	}

	public toString(): string {
		return BoardService.coordToString(this.x, this.y);
	}
}
export class GameState {
	public static BOARD: string[][] = [
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', 'b', 'w', '', '', ''],
		['', '', '', 'w', 'b', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '']];

	public movelist: Move[] = [];

	static shuffle(array: any[]) {
		let currentIndex = array.length;
		let temporaryValue;
		let randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
	}

	constructor(public humanColour: string) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				GameState.BOARD[i][j] = '';
			}
		}
		const startPos = [
			{x: 3, y: 3},
			{x: 3, y: 4},
			{x: 4, y: 3},
			{x: 4, y: 4},
		];
		GameState.shuffle(startPos);
		GameState.BOARD[startPos[0].x][startPos[0].y] = 'b';
		GameState.BOARD[startPos[1].x][startPos[1].y] = 'b';
		GameState.BOARD[startPos[2].x][startPos[2].y] = 'w';
		GameState.BOARD[startPos[3].x][startPos[3].y] = 'w';
	}

	public putMoveOnBoard(move: string, turned: string, colour: string) {
		const mv = BoardService.stringToCoords(move);
		if (!turned.length) {
			GameState.BOARD[mv.x][mv.y] = '';
			return;
		}
		GameState.BOARD[mv.x][mv.y] = colour;
		for (let i = 0; i < turned.length; i += 2) {
			const moveStr = turned.substr(i, 2);
			const tmv = BoardService.stringToCoords(moveStr);
			GameState.BOARD[tmv.x][tmv.y] = colour;
		}
		this.movelist.push(new Move(mv.x, mv.y, colour, BoardService.boardToStrings()));
	}

	public restorePosition(move: Move) {
		BoardService.stringsToBoard(move.board);
		for (let i = 0; i < this.movelist.length; i++) {
			const mv = this.movelist[i];
			if (mv.x === move.x && mv.y === move.y) {
				this.movelist.splice(i + 1);
				break;
			}
		}
	}
}
