import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {MoveRequest, MoveResponse} from './app.types';
import 'rxjs/add/operator/toPromise';
import {GameState} from './game';

@Injectable()
export class BoardService {

	static handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	static coordToString(x: number, y: number): string {
		return String.fromCharCode(x + 65) + String.fromCharCode(y + 49);
	}

	static stringToCoords(str: string): {x: number, y: number} {
		const x: number = str.charCodeAt(0) - 65;
		const y: number = str.charCodeAt(1) - 49;
		return {x, y};
	}

	static boardToStrings(): {black: string, white: string} {
		let black = '';
		let white = '';
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (GameState.BOARD[i][j] === 'b') {
					black += BoardService.coordToString(i, j);
				} else if (GameState.BOARD[i][j] === 'w') {
					white += BoardService.coordToString(i, j);
				}
			}
		}
		return {black, white};
	}

	static stringsToBoard(board: {black: string, white: string}) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				GameState.BOARD[i][j] = '';
			}
		}
		for (let i = 0; i < board.black.length; i += 2) {
			const pos = BoardService.stringToCoords(board.black.substr(i));
			GameState[pos.x][pos.y] = 'b';
		}
		for (let i = 0; i < board.white.length; i += 2) {
			const pos = BoardService.stringToCoords(board.white.substr(i));
			GameState[pos.x][pos.y] = 'w';
		}
	}

	constructor(private http: Http) {
	}

	public playMove(x: number, y: number, colour: string): Promise<MoveResponse> {
		const board = BoardService.boardToStrings();
		const move: MoveRequest = {
			black: board.black,
			white: board.white,
			colour,
			position: BoardService.coordToString(x, y),
		};
		const qs = ['b=' + move.black, 'w=' + move.white, 'c=' + move.colour, 'p=' + move.position].join('&');
		return this.http.get('http://localhost:8080/rpc/playMove?' + qs)
			.toPromise()
			.then(response => response.json() as MoveResponse)
			.catch(BoardService.handleError);
	}

	public findBestMove(colour: string): Promise<MoveResponse> {
		const board = BoardService.boardToStrings();
		const qs = ['b=' + board.black, 'w=' + board.white, 'c=' + colour].join('&');
		return this.http.get('http://localhost:8080/rpc/findBestMove?' + qs)
			.toPromise()
			.then(response => response.json() as MoveResponse)
			.catch(BoardService.handleError);
	}

}
