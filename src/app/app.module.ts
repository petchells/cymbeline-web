import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule, MdRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SquareComponent } from './square.component';
import { BoardService } from './board.service';

@NgModule({
	declarations: [
		AppComponent,
		SquareComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		MdRadioModule,
		MdButtonModule,
		MdCheckboxModule,
		ReactiveFormsModule,
	],
	providers: [BoardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
