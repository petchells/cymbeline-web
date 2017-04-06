import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {MoveResponse} from './app.types';
import {PlayerRequest} from './app.types';
import 'rxjs/add/operator/toPromise';

export const BOARD: string[][] = [
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', 'b', 'w', '', '', ''],
	['', '', '', 'w', 'b', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
];

@Injectable()
export class BoardService {

	static handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	static coordToString(x: number, y: number): string {
		return String.fromCharCode(x + 65) + String.fromCharCode(y + 31);
	}

	public playMove(x: number, y: number, colour: string): Promise<MoveResponse> {
		const b = [];
		const w = [];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (BOARD[i][j] === 'b') {
					b.push(BoardService.coordToString(i, j));
				} else if (BOARD[i][j] === 'w') {
					w.push(BoardService.coordToString(i, j));
				}
			}
		}
		const move: PlayerRequest = {
			black: b,
			white: w,
			colour,
			position: BoardService.coordToString(x, y),
		};
		return this.http.get('http://localhost:8080')
			.toPromise()
			.then(response => response.json().data as MoveResponse)
			.catch(BoardService.handleError);
	}

	constructor(private http: Http) {
	}

}
