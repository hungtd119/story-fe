import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Interaction } from 'src/app/models/interaction.model';

@Component({
  selector: 'app-page-interaction-col',
  templateUrl: './page-interaction-col.component.html',
  styleUrls: ['./page-interaction-col.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatPaginatorModule],
})
export class PageInteractionColComponent {
  @Input() interactions!: Interaction[];
  public interactionSlice!: Interaction[];
  ngOnInit(): void {
    this.interactionSlice = this.interactions.slice(0, 3);
  }
  constructor() {}
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.interactions.length) {
      endIndex = this.interactions.length;
    }
    this.interactionSlice = this.interactions.slice(startIndex, endIndex);
  }
}
