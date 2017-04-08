import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SquareComponent } from './square.component';
import { BoardService } from './board.service';

@NgModule({
	declarations: [
		AppComponent,
		SquareComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [BoardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
