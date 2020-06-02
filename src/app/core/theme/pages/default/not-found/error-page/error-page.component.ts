import { Component, HostBinding, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../../../../../../helpers';

@Component({
	selector: 'm-error-page',
	templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit, AfterViewInit {

	@HostBinding('class') classes: string = 'm-grid m-grid--hor m-grid--root m-page';

	@Input() errorType: number = 4;

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.errorType = +this.route.snapshot.paramMap.get('type');
		if (!this.errorType) {
			this.errorType = 4;//Math.floor((Math.random() * 4) + 1);
		}
	}

	ngAfterViewInit() {

		Helpers.bodyClass('m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default');

	}

}
