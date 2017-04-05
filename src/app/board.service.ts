import { Injectable } from '@angular/core';

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

    constructor(private http: Http) { }

    playMove(): Promise<string[]> {
        return this.http.get("http://localhost:8080")
    }
}
