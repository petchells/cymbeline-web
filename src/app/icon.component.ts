import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
	selector: 'app-icons',
	template: '<span></span>',
})

export class IconRegistryComponent {
	constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
		iconRegistry.addSvgIcon(
			'black-piece',
			sanitizer.bypassSecurityTrustResourceUrl('assets/Reversi-Piece-Black.svg'));
		iconRegistry.addSvgIcon(
			'white-piece',
			sanitizer.bypassSecurityTrustResourceUrl('assets/Reversi-Piece-White.svg'));
	}
}
