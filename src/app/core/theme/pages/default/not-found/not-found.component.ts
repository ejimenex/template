import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../../../../helpers';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
@Component({
  selector: '.m-wrapper',
  templateUrl: './not-found.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent implements OnInit {

  constructor() {

  }
  ngOnInit() {

  }
}