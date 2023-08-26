import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatTabsModule],
})
export class HeaderContentComponent {
  @Input() label!: string;
}
