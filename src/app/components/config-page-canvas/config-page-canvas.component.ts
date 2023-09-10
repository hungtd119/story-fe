import { Observable } from 'rxjs';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPageToConfig } from 'src/app/store/page/page.actions';
import { Page } from 'src/app/models/page.model';
import { selectPage } from 'src/app/store/page/page.selector';

@Component({
  selector: 'app-config-page-canvas',
  templateUrl: './config-page-canvas.component.html',
  styleUrls: ['./config-page-canvas.component.scss'],
})
export class ConfigPageCanvasComponent implements OnInit, AfterViewInit {
  page$: Observable<Page> = this.store.select(selectPage);
  constructor(private store: Store) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
