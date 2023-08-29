import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page.model';
import { Text } from 'src/app/models/text.model';

@Component({
  selector: 'app-page-text-col',
  templateUrl: './page-text-col.component.html',
  styleUrls: ['./page-text-col.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatPaginatorModule],
})
export class PageTextColComponent implements OnInit {
  @Input() texts!: Text[];
  public textSlice!: Text[];
  ngOnInit(): void {
    this.textSlice = this.texts.slice(0, 3);
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.texts.length) {
      endIndex = this.texts.length;
    }
    this.textSlice = this.texts.slice(startIndex, endIndex);
  }
}
