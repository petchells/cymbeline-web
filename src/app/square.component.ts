import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sq',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent {
    squareClass = '';
    @Input('x') x: string;
    @Input('y') y: string;

    constructor() {
        console.log('binding to', this.x, this.y);
    }

    clicked(arg): void {
        this.squareClass = 'bk';
        console.log('clicked a square', this.x, this.y);
    }
}
