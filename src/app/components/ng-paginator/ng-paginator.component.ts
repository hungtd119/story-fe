import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Text } from 'src/app/models/text.model';
@Component({
  selector: 'app-ng-paginator',
  templateUrl: './ng-paginator.component.html',
  styleUrls: ['./ng-paginator.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
})
export class NgPaginatorComponent {
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Input() currentPage!: number;
  @Input() pageId!: number;
  @Output() onChangePage: EventEmitter<any> = new EventEmitter<any>();
  pageSizeOptions: number[] = [1, 2, 4, 6];
  pageEvent(event: PageEvent) {
    this.onChangePage.emit({ event, pageId: this.pageId });
  }
}
