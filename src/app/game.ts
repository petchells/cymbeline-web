import {BoardService} from './board.service';

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

	constructor() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				GameState.BOARD[i][j] = '';
			}
		}
		GameState.BOARD[3][3] = 'b';
		GameState.BOARD[4][4] = 'b';
		GameState.BOARD[3][4] = 'w';
		GameState.BOARD[4][3] = 'w';
	}

	public putMoveOnBoard(move: string, turned: string, colour: string) {
		let mv = BoardService.stringToCoords(move);
		if (turned.length) {
			GameState.BOARD[mv.x][mv.y] = colour;
		} else {
			GameState.BOARD[mv.x][mv.y] = '';
		}
		for (let i = 0; i < turned.length; i += 2) {
			const moveStr = turned.substr(i, 2);
			mv = BoardService.stringToCoords(moveStr);
			GameState.BOARD[mv.x][mv.y] = colour;
		}
	}
}
