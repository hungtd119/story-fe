import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
