import { Component, Input } from '@angular/core';
import {BOARD} from './board.service';

@Component({
    selector: 'app-sq',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent {

    @Input('x') x: string;
    @Input('y') y: string;

    constructor() {
    }

    clicked(arg): void {
        if (!this.map[this.x][this.y]) {
            console.log('clicked square');
            BOARD[this.x][this.y] = 'b';
        }
    }
}
