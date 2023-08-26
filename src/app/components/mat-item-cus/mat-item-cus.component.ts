import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mat-item-cus',
  templateUrl: './mat-item-cus.component.html',
  styleUrls: ['./mat-item-cus.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterModule],
})
export class MatItemCusComponent {
  @Input() label!: string;
  @Input() path!: string;
  @Input() icon!: string;
  constructor() {}
}
