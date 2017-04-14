import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule, MdIconModule, MdRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SquareComponent } from './square.component';
import { BoardService } from './board.service';
import { IconRegistryComponent } from './icon.component';

@NgModule({
	declarations: [
		AppComponent,
		IconRegistryComponent,
		SquareComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		MdIconModule,
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
