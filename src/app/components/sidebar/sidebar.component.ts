import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatItemCusComponent } from '../mat-item-cus/mat-item-cus.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    NgIf,
    MatButtonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatItemCusComponent,
  ],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  showFiller = true;

  ngAfterViewInit(): void {
    this.helperService.setDrawer(this.drawer);
  }
  constructor(private helperService: HelperService) {}
}
